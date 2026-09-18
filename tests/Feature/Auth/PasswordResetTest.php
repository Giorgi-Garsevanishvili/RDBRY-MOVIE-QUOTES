<?php

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Inertia\Testing\AssertableInertia as Assert;

test('password recovery request screen can be rendered', function () {
	$this->get(route('password.request'))
		->assertOk()
		->assertInertia(fn (Assert $page) => $page->component('auth/ForgotPassword'));
});

test('password recovery requires a registered email address', function (?string $email) {
	User::factory()->create(['email' => 'member@example.com']);

	$this->post(route('password.email'), ['email' => $email])
		->assertSessionHasErrors('email');
})->with([
	'missing email'      => null,
	'invalid email'      => 'not-an-email',
	'unregistered email' => 'unknown@example.com',
]);

test('password recovery validation is localized in Georgian', function () {
	app()->setLocale('ka');

	$this->post(route('password.email'), ['email' => 'unknown@example.com'])
		->assertSessionHasErrors([
			'email' => 'ამ ელფოსტით ანგარიში ვერ მოიძებნა.',
		]);
});

test('a reset link is sent and the member is redirected to the check-email screen', function () {
	Notification::fake();
	$user = User::factory()->create(['email' => 'member@example.com']);

	$this->post(route('password.email'), ['email' => ' MEMBER@EXAMPLE.COM '])
		->assertSessionHasNoErrors()
		->assertRedirect(route('password.email.sent'));

	Notification::assertSentTo($user, ResetPassword::class, function (ResetPassword $notification) use ($user) {
		$mail = $notification->toMail($user);

		expect($mail->subject)->toBe('Reset your password')
			->and($mail->viewData['actionUrl'])->toContain('/reset-password/');

		return true;
	});
});

test('passwordless Google members cannot use password recovery', function () {
	Notification::fake();
	$user = User::factory()->create([
		'google_id' => 'google-password-reset-id',
		'password'  => null,
	]);

	$this->post(route('password.email'), ['email' => $user->email])
		->assertSessionHasErrors('email');

	Notification::assertNothingSent();

	$token = Password::broker()->createToken($user);

	$this->get(route('password.reset', ['token' => $token, 'email' => $user->email]))
		->assertOk()
		->assertInertia(fn (Assert $page) => $page->component('auth/PasswordResetExpired'));

	$this->post(route('password.update'), [
		'token'                 => $token,
		'email'                 => $user->email,
		'password'              => 'newpassword1',
		'password_confirmation' => 'newpassword1',
	])->assertSessionHasErrors('email');

	expect($user->fresh()->password)->toBeNull();
});

test('password recovery check-email screen can be rendered', function () {
	$this->get(route('password.email.sent'))
		->assertOk()
		->assertInertia(fn (Assert $page) => $page->component('auth/PasswordResetEmailSent'));
});

test('a valid reset link renders the new-password screen', function () {
	$user = User::factory()->create();
	$token = Password::broker()->createToken($user);

	$this->get(route('password.reset', ['token' => $token, 'email' => $user->email]))
		->assertOk()
		->assertInertia(fn (Assert $page) => $page
			->component('auth/ResetPassword')
			->where('email', $user->email)
			->where('token', $token));
});

test('an invalid reset link renders the expired-link screen', function () {
	$user = User::factory()->create();

	$this->get(route('password.reset', ['token' => 'invalid-token', 'email' => $user->email]))
		->assertOk()
		->assertInertia(fn (Assert $page) => $page->component('auth/PasswordResetExpired'));
});

test('an expired reset link renders the expired-link screen', function () {
	$user = User::factory()->create();
	$token = Password::broker()->createToken($user);

	$this->travel(61)->minutes();

	$this->get(route('password.reset', ['token' => $token, 'email' => $user->email]))
		->assertOk()
		->assertInertia(fn (Assert $page) => $page->component('auth/PasswordResetExpired'));
});

test('password can be reset with a valid token', function () {
	$user = User::factory()->create();
	$token = Password::broker()->createToken($user);

	$this->post(route('password.update'), [
		'token'                 => $token,
		'email'                 => $user->email,
		'password'              => 'newpassword1',
		'password_confirmation' => 'newpassword1',
	])
		->assertSessionHasNoErrors()
		->assertRedirect(route('password.reset.success'));

	expect(Hash::check('newpassword1', $user->fresh()->password))->toBeTrue();
});

test('new password follows the required format', function (array $passwords, string $field) {
	$user = User::factory()->create();
	$token = Password::broker()->createToken($user);

	$this->post(route('password.update'), [
		'token' => $token,
		'email' => $user->email,
		...$passwords,
	])->assertSessionHasErrors($field);
})->with([
	'missing password' => [[
		'password'              => null,
		'password_confirmation' => 'password1',
	], 'password'],
	'too short' => [[
		'password'              => 'pass123',
		'password_confirmation' => 'pass123',
	], 'password'],
	'too long' => [[
		'password'              => 'password12345678',
		'password_confirmation' => 'password12345678',
	], 'password'],
	'uppercase Latin' => [[
		'password'              => 'Password1',
		'password_confirmation' => 'Password1',
	], 'password'],
	'punctuation' => [[
		'password'              => 'password_1',
		'password_confirmation' => 'password_1',
	], 'password'],
	'non-Latin script' => [[
		'password'              => 'პაროლი123',
		'password_confirmation' => 'პაროლი123',
	], 'password'],
	'mismatched confirmation' => [[
		'password'              => 'password1',
		'password_confirmation' => 'password2',
	], 'password'],
	'missing confirmation' => [[
		'password'              => 'password1',
		'password_confirmation' => null,
	], 'password_confirmation'],
]);

test('an invalid token cannot reset the password', function () {
	$user = User::factory()->create();

	$this->post(route('password.update'), [
		'token'                 => 'invalid-token',
		'email'                 => $user->email,
		'password'              => 'newpassword1',
		'password_confirmation' => 'newpassword1',
	])->assertSessionHasErrors('email');
});

test('password reset success screen can be rendered', function () {
	$this->get(route('password.reset.success'))
		->assertOk()
		->assertInertia(fn (Assert $page) => $page->component('auth/PasswordResetSuccess'));
});
