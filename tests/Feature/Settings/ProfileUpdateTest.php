<?php

use App\Models\User;
use App\Notifications\VerifyNewEmail;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Inertia\Testing\AssertableInertia as Assert;

test('a verified member sees the profile state', function () {
	$user = User::factory()->create(['pending_email' => 'pending@example.com']);

	$this->actingAs($user)
		->get(route('profile.edit'))
		->assertOk()
		->assertInertia(fn (Assert $page) => $page
			->component('settings/Profile')
			->where('profile.pendingEmail', 'pending@example.com')
			->where('profile.isPasswordless', false)
			->where('auth.user.avatar', null));
});

test('a verified member can upload and replace their avatar', function () {
	Storage::fake('public');
	$user = User::factory()->create();

	$this->actingAs($user)
		->post(route('profile.avatar.update'), [
			'avatar' => UploadedFile::fake()->image('avatar.jpg'),
		])
		->assertSessionHasNoErrors()
		->assertRedirect(route('profile.edit'));

	$oldAvatar = $user->getFirstMedia(User::AVATAR_COLLECTION);

	$this->actingAs($user)
		->post(route('profile.avatar.update'), [
			'avatar' => UploadedFile::fake()->image('replacement.png'),
		])
		->assertSessionHasNoErrors();

	$user->refresh();
	$newAvatar = $user->getFirstMedia(User::AVATAR_COLLECTION);

	expect($user->getMedia(User::AVATAR_COLLECTION))->toHaveCount(1)
		->and($newAvatar?->file_name)->toBe('replacement.png');

	Storage::disk('public')->assertMissing($oldAvatar->getPathRelativeToRoot());
	Storage::disk('public')->assertExists($newAvatar->getPathRelativeToRoot());
});

test('avatar upload accepts only the approved image boundary', function (UploadedFile|null $avatar) {
	Storage::fake('public');
	$user = User::factory()->create();

	$this->actingAs($user)
		->post(route('profile.avatar.update'), ['avatar' => $avatar])
		->assertSessionHasErrors('avatar');
})->with([
	'missing avatar'   => [null],
	'wrong type'       => [fn () => UploadedFile::fake()->create('avatar.pdf', 100, 'application/pdf')],
	'oversized avatar' => [fn () => UploadedFile::fake()->create('avatar.jpg', 10241, 'image/jpeg')],
]);

test('a password member can update their username with their current password', function () {
	$user = User::factory()->create(['username' => 'oldname']);

	$this->actingAs($user)
		->patch(route('profile.username.update'), [
			'username'         => 'newname',
			'current_password' => 'password',
		])
		->assertSessionHasNoErrors()
		->assertRedirect(route('profile.edit'));

	expect($user->refresh()->username)->toBe('newname');
});

test('a password member cannot update their username without the correct password', function (string|null $password) {
	$user = User::factory()->create(['username' => 'oldname']);

	$this->actingAs($user)
		->patch(route('profile.username.update'), [
			'username'         => 'newname',
			'current_password' => $password,
		])
		->assertSessionHasErrors('current_password');

	expect($user->refresh()->username)->toBe('oldname');
})->with(['missing' => null, 'incorrect' => 'wrongpassword']);

test('a passwordless Google member can update their username without a password', function () {
	$user = User::factory()->create([
		'username'  => 'googleuser',
		'google_id' => 'google-profile-id',
		'password'  => null,
	]);

	$this->actingAs($user)
		->patch(route('profile.username.update'), ['username' => 'googlename'])
		->assertSessionHasNoErrors();

	expect($user->refresh()->username)->toBe('googlename');
});

test('username updates keep the registration validation boundary', function (string|null $username) {
	$user = User::factory()->create();

	$this->actingAs($user)
		->patch(route('profile.username.update'), [
			'username'         => $username,
			'current_password' => 'password',
		])
		->assertSessionHasErrors('username');
})->with([
	'required'    => null,
	'too short'   => 'ab',
	'too long'    => 'abcdefghijklmnop',
	'uppercase'   => 'Uppercase',
	'punctuation' => 'user-name',
]);

test('a password member requests an email change without replacing the live email', function () {
	Notification::fake();
	$user = User::factory()->create([
		'email'             => 'current@example.com',
		'email_verified_at' => now(),
	]);

	$this->actingAs($user)
		->post(route('profile.email.request'), [
			'email'            => ' NewAddress@Example.COM ',
			'current_password' => 'password',
		])
		->assertSessionHasNoErrors()
		->assertRedirect(route('profile.edit'));

	$user->refresh();

	expect($user->email)->toBe('current@example.com')
		->and($user->pending_email)->toBe('newaddress@example.com')
		->and($user->email_verified_at)->not->toBeNull();

	Notification::assertSentOnDemand(
		VerifyNewEmail::class,
		fn (VerifyNewEmail $notification): bool => $notification->email === 'newaddress@example.com',
	);
});

test('email change requires a new unique email and the current password', function (array $payload, string $field) {
	Notification::fake();
	$user = User::factory()->create(['email' => 'current@example.com']);
	User::factory()->create(['email' => 'taken@example.com']);

	$this->actingAs($user)
		->post(route('profile.email.request'), array_replace([
			'email'            => 'new@example.com',
			'current_password' => 'password',
		], $payload))
		->assertSessionHasErrors($field);

	expect($user->refresh()->pending_email)->toBeNull();
	Notification::assertNothingSent();
})->with([
	'invalid email'    => [['email' => 'not-an-email'], 'email'],
	'current email'    => [['email' => 'current@example.com'], 'email'],
	'taken email'      => [['email' => 'taken@example.com'], 'email'],
	'missing password' => [['current_password' => null], 'current_password'],
	'wrong password'   => [['current_password' => 'wrongpassword'], 'current_password'],
]);

test('a valid signed link promotes the pending email without authentication', function () {
	$user = User::factory()->create([
		'email'             => 'current@example.com',
		'pending_email'     => 'new@example.com',
		'email_verified_at' => now(),
	]);
	$url = URL::temporarySignedRoute('profile.email.verify', now()->addHour(), [
		'user' => $user,
		'hash' => hash('sha256', 'new@example.com'),
	]);

	$this->get($url)
		->assertSessionHasNoErrors()
		->assertRedirect(route('home'));

	$user->refresh();

	expect($user->email)->toBe('new@example.com')
		->and($user->pending_email)->toBeNull()
		->and($user->email_verified_at)->not->toBeNull();
});

test('invalid or expired email-change links cannot change the email', function (bool $expired) {
	$user = User::factory()->create([
		'email'         => 'current@example.com',
		'pending_email' => 'new@example.com',
	]);
	$url = URL::temporarySignedRoute(
		'profile.email.verify',
		$expired ? now()->subMinute() : now()->addHour(),
		[
			'user' => $user,
			'hash' => hash('sha256', $expired ? 'new@example.com' : 'different@example.com'),
		],
	);

	$this->get($url)->assertForbidden();

	expect($user->refresh()->email)->toBe('current@example.com')
		->and($user->pending_email)->toBe('new@example.com');
})->with(['invalid hash' => false, 'expired signature' => true]);

test('passwordless Google members cannot request an email change', function () {
	Notification::fake();
	$user = User::factory()->create([
		'google_id' => 'google-email-id',
		'password'  => null,
	]);

	$this->actingAs($user)
		->post(route('profile.email.request'), ['email' => 'new@example.com'])
		->assertForbidden();

	expect($user->refresh()->pending_email)->toBeNull();
	Notification::assertNothingSent();
});

test('profile validation messages are localized in Georgian', function () {
	app()->setLocale('ka');
	$user = User::factory()->create();

	$this->actingAs($user)
		->patch(route('profile.username.update'), [
			'username'         => null,
			'current_password' => 'password',
		])
		->assertSessionHasErrors([
			'username' => 'მომხმარებლის სახელის ველი სავალდებულოა.',
		]);
});

test('guests and unverified members cannot access profile mutations', function () {
	$this->get(route('profile.edit'))->assertForbidden();
	$this->post(route('profile.avatar.update'))->assertForbidden();

	$user = User::factory()->unverified()->create();

	$this->actingAs($user)->get(route('profile.edit'))->assertForbidden();
	$this->actingAs($user)->patch(route('profile.username.update'))->assertForbidden();
});
