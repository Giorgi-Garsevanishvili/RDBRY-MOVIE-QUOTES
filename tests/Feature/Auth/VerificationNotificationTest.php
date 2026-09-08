<?php

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;

test('registration sends a signed activation link to the new account', function () {
	Notification::fake();

	$this->post(route('register.store'), [
		'username'              => 'moviefan7',
		'email'                 => 'viewer@example.com',
		'password'              => 'password1',
		'password_confirmation' => 'password1',
	]);

	$user = User::query()->sole();

	Notification::assertSentTo($user, VerifyEmail::class, function (VerifyEmail $notification) use ($user) {
		$mail = $notification->toMail($user);
		$actionUrl = (string) $mail->viewData['actionUrl'];

		expect($actionUrl)
			->not->toBeEmpty()
			->and(URL::hasValidSignature(Request::create($actionUrl)))->toBeTrue()
			->and(parse_url($actionUrl, PHP_URL_PATH))->toBe(
				route('activation.verify', ['user' => $user, 'hash' => sha1($user->email)], false),
			)
			->and($mail->subject)->toBe('Please verify your email address')
			->and($mail->view)->toBe([
				'html' => 'mail.auth.action',
				'text' => 'mail.auth.action-text',
			]);

		return true;
	});
});

test('the registered event sends no activation email to an already verified account', function () {
	Notification::fake();
	$user = User::factory()->create();

	event(new Registered($user));

	Notification::assertNothingSent();
});

test('activation and recovery emails are localized in Georgian', function () {
	app()->setLocale('ka');
	$user = User::factory()->unverified()->create(['username' => 'moviefan7']);

	$verificationMail = (new VerifyEmail)->toMail($user);
	$resetMail = (new ResetPassword('reset-token'))->toMail($user);

	expect($verificationMail->subject)->toBe('დაადასტურეთ თქვენი ელფოსტა')
		->and($verificationMail->viewData['greeting'])->toBe('გამარჯობა, moviefan7!')
		->and($resetMail->subject)->toBe('პაროლის აღდგენა')
		->and($resetMail->viewData['actionText'])->toBe('პაროლის აღდგენა');
});
