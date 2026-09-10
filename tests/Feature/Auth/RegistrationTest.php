<?php

use App\Http\Controllers\Auth\VerificationPendingController;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

function validRegistrationPayload(array $overrides = []): array
{
	return array_replace([
		'username'              => 'moviefan7',
		'email'                 => 'viewer@example.com',
		'password'              => 'password1',
		'password_confirmation' => 'password1',
	], $overrides);
}

test('registration screen can be rendered', function () {
	$this->get(route('register'))
		->assertOk()
		->assertInertia(fn (Assert $page) => $page->component('auth/Register'));
});

test('a guest can create an unverified account without being authenticated', function () {
	Event::fake([Registered::class]);

	$response = $this->post(route('register.store'), validRegistrationPayload([
		'email' => ' Viewer@Example.COM ',
	]));

	$response
		->assertRedirect(route('activation.notice'))
		->assertSessionHas(VerificationPendingController::EMAIL_SESSION_KEY, 'viewer@example.com');
	$this->assertGuest();

	$user = User::query()->sole();

	expect($user->username)->toBe('moviefan7')
		->and($user->email)->toBe('viewer@example.com')
		->and($user->email_verified_at)->toBeNull()
		->and(Hash::check('password1', $user->password))->toBeTrue();

	Event::assertDispatched(Registered::class, fn (Registered $event) => $event->user->is($user));
});

test('username follows the required format', function (?string $username) {
	$this->post(route('register.store'), validRegistrationPayload([
		'username' => $username,
	]))->assertSessionHasErrors('username');
})->with([
	'missing'          => null,
	'too short'        => 'ab',
	'too long'         => 'abcdefghijklmnop',
	'uppercase Latin'  => 'Moviefan',
	'punctuation'      => 'movie_fan',
	'non-Latin script' => 'ფილმი',
]);

test('username must be unique', function () {
	User::factory()->create(['username' => 'moviefan7']);

	$this->post(route('register.store'), validRegistrationPayload())
		->assertSessionHasErrors('username');
});

test('email is required or valid', function (?string $email) {
	$this->post(route('register.store'), validRegistrationPayload([
		'email' => $email,
	]))->assertSessionHasErrors('email');
})->with([
	'required' => null,
	'format'   => 'not-an-email',
]);

test('email must be unique', function () {
	User::factory()->create(['email' => 'viewer@example.com']);

	$this->post(route('register.store'), validRegistrationPayload())
		->assertSessionHasErrors('email');
});

test('password follows the required format and confirmation rules', function (array $overrides, string $field) {
	$this->post(route('register.store'), validRegistrationPayload($overrides))
		->assertSessionHasErrors($field);
})->with([
	'required'             => [['password' => null], 'password'],
	'too short'            => [['password' => 'pass1', 'password_confirmation' => 'pass1'], 'password'],
	'too long'             => [['password' => 'password12345678', 'password_confirmation' => 'password12345678'], 'password'],
	'uppercase Latin'      => [['password' => 'Password1', 'password_confirmation' => 'Password1'], 'password'],
	'punctuation'          => [['password' => 'password_1', 'password_confirmation' => 'password_1'], 'password'],
	'missing confirmation' => [['password_confirmation' => null], 'password_confirmation'],
	'mismatch'             => [['password_confirmation' => 'password2'], 'password'],
]);

test('registration validation is localized in Georgian', function () {
	app()->setLocale('ka');

	$this->post(route('register.store'), validRegistrationPayload(['username' => null]))
		->assertSessionHasErrors([
			'username' => 'მომხმარებლის სახელის ველი სავალდებულოა.',
		]);
});
