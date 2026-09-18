<?php

use App\Models\Movie;
use App\Models\Quote;
use App\Models\QuoteNotification;
use App\Models\User;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Http\UploadedFile;
use Illuminate\Notifications\Events\BroadcastNotificationCreated;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('a like notifies the quote author in the database and broadcast channel', function () {
	Event::fake([BroadcastNotificationCreated::class]);

	$recipient = User::factory()->create();
	$actor = User::factory()->create();
	$quote = Quote::factory()->for($recipient)->create();

	$this->actingAs($actor)->put(route('quotes.likes.store', $quote))->assertRedirect();

	$notification = QuoteNotification::query()->sole();

	expect($notification->type)->toBe('quote_liked')
		->and($notification->notifiable_id)->toBe($recipient->id)
		->and($notification->actor_id)->toBe($actor->id)
		->and($notification->quote_id)->toBe($quote->id)
		->and($notification->data)->toBe([
			'actor' => [
				'id'       => $actor->id,
				'username' => $actor->username,
			],
			'quoteId' => $quote->id,
		])
		->and($notification->read_at)->toBeNull();

	Event::assertDispatched(
		BroadcastNotificationCreated::class,
		function (BroadcastNotificationCreated $event) use ($actor, $notification, $quote, $recipient): bool {
			$channels = $event->broadcastOn();
			$payload = $event->broadcastWith();

			return $event->notifiable instanceof User
				&& $event->notifiable->is($recipient)
				&& count($channels) === 1
				&& $channels[0] instanceof PrivateChannel
				&& $channels[0]->name === "private-App.Models.User.{$recipient->id}"
				&& $payload === [
					'actor' => [
						'id'       => $actor->id,
						'username' => $actor->username,
					],
					'quoteId' => $quote->id,
					'id'      => $notification->id,
					'type'    => 'quote_liked',
				];
		},
	);
});

test('a comment notifies the quote author', function () {
	Event::fake([BroadcastNotificationCreated::class]);

	$recipient = User::factory()->create();
	$actor = User::factory()->create();
	$quote = Quote::factory()->for($recipient)->create();

	$this->actingAs($actor)
		->post(route('quotes.comments.store', $quote), ['body' => 'A new comment'])
		->assertRedirect();

	$notification = QuoteNotification::query()->sole();

	expect($notification->type)->toBe('quote_commented')
		->and($notification->notifiable_id)->toBe($recipient->id)
		->and($notification->actor_id)->toBe($actor->id)
		->and($notification->quote_id)->toBe($quote->id);

	Event::assertDispatchedTimes(BroadcastNotificationCreated::class, 1);
});

test('self interactions and repeated likes do not create notifications', function () {
	Event::fake([BroadcastNotificationCreated::class]);

	$author = User::factory()->create();
	$visitor = User::factory()->create();
	$quote = Quote::factory()->for($author)->create();

	$this->actingAs($author)->put(route('quotes.likes.store', $quote));
	$this->actingAs($author)->post(route('quotes.comments.store', $quote), ['body' => 'My comment']);

	expect(QuoteNotification::query()->count())->toBe(0);
	Event::assertNotDispatched(BroadcastNotificationCreated::class);

	$this->actingAs($visitor)->put(route('quotes.likes.store', $quote));
	$this->actingAs($visitor)->put(route('quotes.likes.store', $quote));

	expect(QuoteNotification::query()->count())->toBe(1);
	Event::assertDispatchedTimes(BroadcastNotificationCreated::class, 1);
});

test('opening a notification reads only it and redirects to its quote', function () {
	$recipient = User::factory()->create();
	$actor = User::factory()->create();
	$firstQuote = Quote::factory()->for($recipient)->create();
	$secondQuote = Quote::factory()->for($recipient)->create();

	$this->actingAs($actor)->put(route('quotes.likes.store', $firstQuote));
	$this->actingAs($actor)->put(route('quotes.likes.store', $secondQuote));

	$selected = QuoteNotification::query()->where('quote_id', $firstQuote->id)->sole();
	$other = QuoteNotification::query()->where('quote_id', $secondQuote->id)->sole();

	$this->actingAs($recipient)
		->patch(route('notifications.read', $selected))
		->assertRedirect(route('quotes.show', $firstQuote));

	expect($selected->fresh()?->read_at)->not->toBeNull()
		->and($other->fresh()?->read_at)->toBeNull();
});

test('a member cannot read another members notification', function () {
	$recipient = User::factory()->create();
	$actor = User::factory()->create();
	$quote = Quote::factory()->for($recipient)->create();

	$this->actingAs($actor)->put(route('quotes.likes.store', $quote));
	$notification = QuoteNotification::query()->sole();

	$this->actingAs(User::factory()->create())
		->patch(route('notifications.read', $notification))
		->assertForbidden();

	expect($notification->fresh()?->read_at)->toBeNull();
});

test('only a verified member can authorize their private notification channel', function () {
	config()->set([
		'broadcasting.default'                   => 'pusher',
		'broadcasting.connections.pusher.key'    => 'test-key',
		'broadcasting.connections.pusher.secret' => 'test-secret',
		'broadcasting.connections.pusher.app_id' => 'test-app',
	]);
	require base_path('routes/channels.php');

	$recipient = User::factory()->create();
	$otherMember = User::factory()->create();
	$unverifiedMember = User::factory()->unverified()->create();
	$payload = [
		'channel_name' => "private-App.Models.User.{$recipient->id}",
		'socket_id'    => '1234.5678',
	];

	$this->actingAs($recipient)
		->postJson('/broadcasting/auth', $payload)
		->assertOk();

	$this->actingAs($otherMember)
		->postJson('/broadcasting/auth', $payload)
		->assertForbidden();

	$this->actingAs($unverifiedMember)
		->postJson('/broadcasting/auth', [
			...$payload,
			'channel_name' => "private-App.Models.User.{$unverifiedMember->id}",
		])
		->assertForbidden();
});

test('mark all stays on the current page and affects only the signed in member', function () {
	$recipient = User::factory()->create();
	$otherRecipient = User::factory()->create();
	$firstActor = User::factory()->create();
	$secondActor = User::factory()->create();
	$firstQuote = Quote::factory()->for($recipient)->create();
	$secondQuote = Quote::factory()->for($recipient)->create();
	$otherQuote = Quote::factory()->for($otherRecipient)->create();

	$this->actingAs($firstActor)->put(route('quotes.likes.store', $firstQuote));
	$this->actingAs($firstActor)->put(route('quotes.likes.store', $secondQuote));
	$this->actingAs($firstActor)->put(route('quotes.likes.store', $otherQuote));

	$this->actingAs($recipient)
		->from(route('dashboard'))
		->patch(route('notifications.read-all'))
		->assertRedirect(route('dashboard'));

	expect($recipient->unreadNotifications()->count())->toBe(0)
		->and($recipient->notifications()->count())->toBe(2)
		->and($otherRecipient->unreadNotifications()->count())->toBe(1);

	$this->actingAs($recipient)
		->from(route('dashboard'))
		->patch(route('notifications.read-all'))
		->assertRedirect(route('dashboard'));

	$this->actingAs($recipient)
		->get(route('dashboard'))
		->assertInertia(fn (Assert $page) => $page
			->where('notificationFeed.unreadCount', 0)
			->has('notificationFeed.items', 2));

	$thirdQuote = Quote::factory()->for($recipient)->create();
	$this->actingAs($secondActor)->put(route('quotes.likes.store', $thirdQuote));

	$this->actingAs($recipient)
		->get(route('dashboard'))
		->assertInertia(fn (Assert $page) => $page
			->where('notificationFeed.unreadCount', 1)
			->has('notificationFeed.items', 3));
});

test('notification list is newest first with read state and actor data', function () {
	Storage::fake('public');

	$recipient = User::factory()->create();
	$firstActor = User::factory()->create();
	$secondActor = User::factory()->create();
	$secondActor->addMedia(UploadedFile::fake()->image('notification-actor.jpg'))
		->toMediaCollection(User::AVATAR_COLLECTION);
	$firstQuote = Quote::factory()->for($recipient)->create();
	$secondQuote = Quote::factory()->for($recipient)->create();

	$this->actingAs($firstActor)->put(route('quotes.likes.store', $firstQuote));
	$older = QuoteNotification::query()->sole();
	$older->forceFill(['created_at' => now()->subMinute()])->save();

	$this->actingAs($secondActor)
		->post(route('quotes.comments.store', $secondQuote), ['body' => 'Latest activity']);
	$newer = QuoteNotification::query()->where('quote_id', $secondQuote->id)->sole();
	$newer->markAsRead();

	$this->actingAs($recipient)
		->get(route('notifications.index'))
		->assertInertia(fn (Assert $page) => $page
			->where('notificationFeed.unreadCount', 1)
			->where('notificationFeed.items.0.id', $newer->id)
			->where('notificationFeed.items.0.type', 'quote_commented')
			->where('notificationFeed.items.0.actor.username', $secondActor->username)
			->where('notificationFeed.items.0.actor.avatar', fn (string $url): bool => str_ends_with($url, '/notification-actor.jpg'))
			->where('notificationFeed.items.0.quoteId', $secondQuote->id)
			->where('notificationFeed.items.1.id', $older->id)
			->where('notificationFeed.items.1.readAt', null));
});

test('notification mutations reject guests and unverified members', function () {
	$recipient = User::factory()->create();
	$actor = User::factory()->create();
	$quote = Quote::factory()->for($recipient)->create();

	$this->actingAs($actor)->put(route('quotes.likes.store', $quote));
	$notification = QuoteNotification::query()->sole();
	$this->post(route('logout'));

	$this->patch(route('notifications.read', $notification))->assertForbidden();
	$this->patch(route('notifications.read-all'))->assertForbidden();

	$unverified = User::factory()->unverified()->create();
	$this->actingAs($unverified)->patch(route('notifications.read', $notification))->assertForbidden();
	$this->actingAs($unverified)->patch(route('notifications.read-all'))->assertForbidden();

	expect($notification->fresh()?->read_at)->toBeNull();
});

test('deleting a quote or movie removes its notifications', function () {
	$recipient = User::factory()->create();
	$actor = User::factory()->create();
	$movie = Movie::factory()->for($recipient)->create();
	$firstQuote = Quote::factory()->for($recipient)->for($movie)->create();
	$secondQuote = Quote::factory()->for($recipient)->for($movie)->create();

	$this->actingAs($actor)->put(route('quotes.likes.store', $firstQuote));
	$this->actingAs($actor)->put(route('quotes.likes.store', $secondQuote));

	$this->actingAs($recipient)->delete(route('quotes.destroy', $firstQuote));

	expect(QuoteNotification::query()->count())->toBe(1);

	$this->actingAs($recipient)->delete(route('movies.destroy', $movie));

	expect(QuoteNotification::query()->count())->toBe(0);
});
