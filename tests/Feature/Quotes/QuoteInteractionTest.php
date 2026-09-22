<?php

use App\Events\QuoteInteractionsUpdated;
use App\Http\Requests\Quotes\StoreCommentRequest;
use App\Http\Resources\QuoteFeedResource;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
	Event::fake([QuoteInteractionsUpdated::class]);
});

test('a verified member can create a comment on any quote', function (string $body) {
	$quoteAuthor = User::factory()->create();
	$commentAuthor = User::factory()->create();
	$quote = Quote::factory()->for($quoteAuthor)->create();

	$this->actingAs($commentAuthor)
		->from(route('quotes.show', $quote))
		->post(route('quotes.comments.store', $quote), ['body' => $body])
		->assertRedirect(route('quotes.show', $quote))
		->assertSessionHasNoErrors();

	$comment = Comment::query()->sole();

	expect($comment->user_id)->toBe($commentAuthor->id)
		->and($comment->quote_id)->toBe($quote->id)
		->and($comment->body)->toBe($body);
})->with([
	'English text'   => 'A thoughtful comment.',
	'Georgian text'  => 'საინტერესო კომენტარია.',
	'maximum length' => str_repeat('a', StoreCommentRequest::MAX_BODY_LENGTH),
]);

test('a new comment broadcasts its post data to verified members', function () {
	Storage::fake('public');

	$quoteAuthor = User::factory()->create();
	$commentAuthor = User::factory()->create();
	$commentAuthor->addMedia(UploadedFile::fake()->image('comment-author.jpg'))
		->toMediaCollection(User::AVATAR_COLLECTION);
	$quote = Quote::factory()->for($quoteAuthor)->create();
	Like::factory()->for($quoteAuthor)->for($quote)->create();

	$this->actingAs($commentAuthor)
		->post(route('quotes.comments.store', $quote), ['body' => 'Visible without refresh'])
		->assertRedirect();

	$comment = Comment::query()->sole();

	Event::assertDispatched(
		QuoteInteractionsUpdated::class,
		function (QuoteInteractionsUpdated $event) use ($comment, $commentAuthor, $quote): bool {
			$channels = $event->broadcastOn();
			$payload = $event->broadcastWith();

			return count($channels) === 1
				&& $channels[0] instanceof PrivateChannel
				&& $channels[0]->name === 'private-quotes.interactions'
				&& $event->broadcastAs() === QuoteInteractionsUpdated::BROADCAST_NAME
				&& $payload['quoteId'] === $quote->id
				&& $payload['actorId'] === $commentAuthor->id
				&& $payload['commentCount'] === 1
				&& $payload['likeCount'] === 1
				&& $payload['likedByActor'] === null
				&& $payload['comment']['id'] === $comment->id
				&& $payload['comment']['body'] === 'Visible without refresh'
				&& $payload['comment']['author']['username'] === $commentAuthor->username
				&& str_ends_with((string) $payload['comment']['author']['avatar'], '/comment-author.jpg');
		},
	);
});

test('comment validation is localized', function (string $locale, mixed $body, string $message) {
	app()->setLocale($locale);

	$member = User::factory()->create();
	$quote = Quote::factory()->for($member)->create();

	$this->actingAs($member)
		->post(route('quotes.comments.store', $quote), ['body' => $body])
		->assertSessionHasErrors(['body' => $message]);

	expect(Comment::query()->count())->toBe(0);
})->with([
	'English required' => ['en', null, 'The comment field is required.'],
	'Georgian string'  => ['ka', ['invalid'], 'კომენტარი ტექსტი უნდა იყოს.'],
	'English maximum'  => [
		'en',
		str_repeat('a', StoreCommentRequest::MAX_BODY_LENGTH + 1),
		'The comment may not be greater than 1000 characters.',
	],
	'Georgian maximum' => [
		'ka',
		str_repeat('ა', StoreCommentRequest::MAX_BODY_LENGTH + 1),
		'კომენტარი არ უნდა აღემატებოდეს 1000 სიმბოლოს.',
	],
]);

test('liking and unliking a quote are idempotent', function () {
	$quoteAuthor = User::factory()->create();
	$member = User::factory()->create();
	$quote = Quote::factory()->for($quoteAuthor)->create();

	$this->actingAs($member)
		->from(route('quotes.show', $quote))
		->put(route('quotes.likes.store', $quote))
		->assertRedirect(route('quotes.show', $quote));

	$this->actingAs($member)->put(route('quotes.likes.store', $quote))->assertRedirect();

	expect(Like::query()->count())->toBe(1);
	Event::assertDispatchedTimes(QuoteInteractionsUpdated::class, 1);
	Event::assertDispatched(
		QuoteInteractionsUpdated::class,
		fn (QuoteInteractionsUpdated $event): bool => $event->actorId === $member->id
			&& $event->likeCount === 1
			&& $event->likedByActor === true,
	);

	$this->actingAs($member)->delete(route('quotes.likes.destroy', $quote))->assertRedirect();
	$this->actingAs($member)->delete(route('quotes.likes.destroy', $quote))->assertRedirect();

	expect(Like::query()->count())->toBe(0);
	Event::assertDispatchedTimes(QuoteInteractionsUpdated::class, 2);
	Event::assertDispatched(
		QuoteInteractionsUpdated::class,
		fn (QuoteInteractionsUpdated $event): bool => $event->actorId === $member->id
			&& $event->likeCount === 0
			&& $event->likedByActor === false,
	);
});

test('only verified members can authorize the post interaction channel', function () {
	config()->set([
		'broadcasting.default'                   => 'pusher',
		'broadcasting.connections.pusher.key'    => 'test-key',
		'broadcasting.connections.pusher.secret' => 'test-secret',
		'broadcasting.connections.pusher.app_id' => 'test-app',
	]);
	require base_path('routes/channels.php');

	$verified = User::factory()->create();
	$unverified = User::factory()->unverified()->create();
	$payload = [
		'channel_name' => 'private-quotes.interactions',
		'socket_id'    => '1234.5678',
	];

	$this->actingAs($verified)
		->postJson('/broadcasting/auth', $payload)
		->assertOk();

	$this->actingAs($unverified)
		->postJson('/broadcasting/auth', $payload)
		->assertForbidden();

	$this->post(route('logout'));
	$this->postJson('/broadcasting/auth', $payload)->assertForbidden();
});

test('the database prevents duplicate likes during competing writes', function () {
	$user = User::factory()->create();
	$quote = Quote::factory()->create();

	Like::factory()->for($user)->for($quote)->create();
	Like::factory()->for($user)->for($quote)->create();
})->throws(UniqueConstraintViolationException::class);

test('different members can like the same quote', function () {
	$quote = Quote::factory()->create();
	$firstMember = User::factory()->create();
	$secondMember = User::factory()->create();

	$this->actingAs($firstMember)->put(route('quotes.likes.store', $quote));
	$this->actingAs($secondMember)->put(route('quotes.likes.store', $quote));

	expect(Like::query()->where('quote_id', $quote->id)->count())->toBe(2);
});

test('guest and unverified members cannot interact with quotes', function () {
	$quote = Quote::factory()->create();

	$this->post(route('quotes.comments.store', $quote), ['body' => 'Guest comment'])->assertForbidden();
	$this->put(route('quotes.likes.store', $quote))->assertForbidden();

	$unverifiedMember = User::factory()->unverified()->create();

	$this->actingAs($unverifiedMember)
		->post(route('quotes.comments.store', $quote), ['body' => 'Unverified comment'])
		->assertForbidden();
	$this->actingAs($unverifiedMember)
		->put(route('quotes.likes.store', $quote))
		->assertForbidden();

	expect(Comment::query()->count())->toBe(0)
		->and(Like::query()->count())->toBe(0);
});

test('quote interactions cascade when their quote is deleted', function () {
	$quoteAuthor = User::factory()->create();
	$member = User::factory()->create();
	$movie = Movie::factory()->for($quoteAuthor)->create();
	$quote = Quote::factory()->for($quoteAuthor)->for($movie)->create();
	$comment = Comment::factory()->for($member)->for($quote)->create();
	$like = Like::factory()->for($member)->for($quote)->create();

	$this->actingAs($quoteAuthor)->delete(route('quotes.destroy', $quote));

	$this->assertDatabaseMissing('comments', ['id' => $comment->id]);
	$this->assertDatabaseMissing('likes', ['id' => $like->id]);
});

test('movie deletion cascades its quote interactions', function () {
	$movieOwner = User::factory()->create();
	$member = User::factory()->create();
	$movie = Movie::factory()->for($movieOwner)->create();
	$quote = Quote::factory()->for($movieOwner)->for($movie)->create();
	$comment = Comment::factory()->for($member)->for($quote)->create();
	$like = Like::factory()->for($member)->for($quote)->create();

	$this->actingAs($movieOwner)->delete(route('movies.destroy', $movie));

	$this->assertDatabaseMissing('comments', ['id' => $comment->id]);
	$this->assertDatabaseMissing('likes', ['id' => $like->id]);
});

test('feed quote and movie pages expose real interaction counts', function () {
	$quoteAuthor = User::factory()->create();
	$firstMember = User::factory()->create();
	$secondMember = User::factory()->create();
	$movie = Movie::factory()->for($quoteAuthor)->create();
	$quote = Quote::factory()->for($quoteAuthor)->for($movie)->create();

	Comment::factory()->count(3)->for($firstMember)->for($quote)->create();
	Like::factory()->for($firstMember)->for($quote)->create();
	Like::factory()->for($secondMember)->for($quote)->create();

	$this->actingAs($quoteAuthor)
		->get(route('dashboard'))
		->assertInertia(
			fn (Assert $page) => $page
				->where('quotes.data.0.id', $quote->id)
				->has('quotes.data.0.comments', 3)
				->where('quotes.data.0.commentCount', 3)
				->where('quotes.data.0.likeCount', 2)
				->where('quotes.data.0.likedByViewer', false),
		);

	$this->actingAs($quoteAuthor)
		->get(route('quotes.show', $quote))
		->assertInertia(
			fn (Assert $page) => $page
				->has('quote.comments', 3)
				->where('quote.commentCount', 3)
				->where('quote.likeCount', 2)
				->where('quote.likedByViewer', false),
		);

	$this->actingAs($firstMember)
		->get(route('quotes.show', $quote))
		->assertInertia(fn (Assert $page) => $page->where('quote.likedByViewer', true));

	$this->actingAs($quoteAuthor)
		->get(route('movies.show', $movie))
		->assertInertia(
			fn (Assert $page) => $page
				->where('movie.quotes.0.commentCount', 3)
				->where('movie.quotes.0.likeCount', 2),
		);
});

test('feed resources omit legacy comments whose author is missing', function () {
	$quote = Quote::factory()->create();
	$comment = Comment::factory()->for($quote)->create();

	$quote->load(['user.media', 'movie', 'media']);
	$comment->setRelation('user', null);
	$quote->setRelation('comments', collect([$comment]));
	$quote->setAttribute('comments_count', 0);
	$quote->setAttribute('likes_count', 0);
	$quote->setAttribute('liked_by_viewer', false);

	$data = (new QuoteFeedResource($quote))->toArray(request());

	expect($data['comments']->resolve(request()))->toBe([])
		->and($data['commentCount'])->toBe(0);
});
