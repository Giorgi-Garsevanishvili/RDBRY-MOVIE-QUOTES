<?php

use App\Http\Controllers\Auth\VerificationPendingController;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Inertia\Testing\AssertableInertia as Assert;

test('activation pending screen can be rendered by a guest', function () {
	$this->get(route('activation.notice'))
		->assertOk()
		->assertInertia(fn (Assert $page) => $page
			->component('auth/VerificationPending')
			->where('canResend', false)
			->where('status', null));
});

test('activation pending screen enables resend after registration', function () {
	$user = User::factory()->unverified()->create();

	$this->withSession([
		VerificationPendingController::EMAIL_SESSION_KEY => $user->email,
	])->get(route('activation.notice'))
		->assertOk()
		->assertInertia(fn (Assert $page) => $page
			->component('auth/VerificationPending')
			->where('canResend', true));
});

test('a valid signed activation link verifies the account without logging in', function () {
	$user = User::factory()->unverified()->create();
	Event::fake([Verified::class]);

	$response = $this->withSession([
		VerificationPendingController::EMAIL_SESSION_KEY => $user->email,
	])->get(URL::temporarySignedRoute(
		'activation.verify',
		now()->addMinutes(60),
		['user' => $user, 'hash' => sha1($user->email)],
	));

	$response->assertRedirect(route('activation.success'));
	$response->assertSessionMissing(VerificationPendingController::EMAIL_SESSION_KEY);
	$this->assertGuest();
	expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
	Event::assertDispatched(Verified::class, fn (Verified $event) => $event->user->is($user));
});

test('activation fails when the signed hash does not match the account', function () {
	$user = User::factory()->unverified()->create();
	Event::fake([Verified::class]);

	$this->get(URL::temporarySignedRoute(
		'activation.verify',
		now()->addMinutes(60),
		['user' => $user, 'hash' => sha1('wrong@example.com')],
	))->assertForbidden();

	expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
	Event::assertNotDispatched(Verified::class);
});

test('an expired activation link is rejected', function () {
	$user = User::factory()->unverified()->create();

	$this->get(URL::temporarySignedRoute(
		'activation.verify',
		now()->subMinute(),
		['user' => $user, 'hash' => sha1($user->email)],
	))->assertForbidden();

	expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
});

test('an already verified account is not verified twice', function () {
	$user = User::factory()->create();
	Event::fake([Verified::class]);

	$this->get(URL::temporarySignedRoute(
		'activation.verify',
		now()->addMinutes(60),
		['user' => $user, 'hash' => sha1($user->email)],
	))->assertRedirect(route('activation.success'));

	Event::assertNotDispatched(Verified::class);
});

test('activation success screen can be rendered by a guest', function () {
	$this->get(route('activation.success'))
		->assertOk()
		->assertInertia(fn (Assert $page) => $page->component('auth/VerificationSuccess'));
});
