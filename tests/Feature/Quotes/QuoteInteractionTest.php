<?php

use App\Models\Comment;
use App\Models\Like;
use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Database\UniqueConstraintViolationException;
use Inertia\Testing\AssertableInertia as Assert;

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
	'English text'  => 'A thoughtful comment.',
	'Georgian text' => 'საინტერესო კომენტარია.',
]);

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

	$this->actingAs($member)->delete(route('quotes.likes.destroy', $quote))->assertRedirect();
	$this->actingAs($member)->delete(route('quotes.likes.destroy', $quote))->assertRedirect();

	expect(Like::query()->count())->toBe(0);
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
				->where('quotes.data.0.commentCount', 3)
				->where('quotes.data.0.likeCount', 2),
		);

	$this->actingAs($quoteAuthor)
		->get(route('quotes.show', $quote))
		->assertInertia(
			fn (Assert $page) => $page
				->where('quote.commentCount', 3)
				->where('quote.likeCount', 2),
		);

	$this->actingAs($quoteAuthor)
		->get(route('movies.show', $movie))
		->assertInertia(
			fn (Assert $page) => $page
				->where('movie.quotes.0.commentCount', 3)
				->where('movie.quotes.0.likeCount', 2),
		);
});
