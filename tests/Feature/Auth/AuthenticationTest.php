<?php

use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;

test('login screen can be rendered', function () {
	$this->get(route('login'))->assertOk();
});

test('users can authenticate with their email', function () {
	$user = User::factory()->create();

	$response = $this->post(route('login.store'), [
		'login'    => $user->email,
		'password' => 'password',
	]);

	$this->assertAuthenticatedAs($user);
	$response->assertRedirect(route('dashboard', absolute: false));
});

test('users can authenticate with their username', function () {
	$user = User::factory()->create();

	$response = $this->post(route('login.store'), [
		'login'    => $user->username,
		'password' => 'password',
	]);

	$this->assertAuthenticatedAs($user);
	$response->assertRedirect(route('dashboard', absolute: false));
});

test('unverified users cannot authenticate', function (string $identityField) {
	$user = User::factory()->unverified()->create();

	$this->post(route('login.store'), [
		'login'    => $user->{$identityField},
		'password' => 'password',
	])->assertSessionHasErrors([
		'login' => __('auth.failed'),
	]);

	$this->assertGuest();
})->with(['email', 'username']);

test('users cannot authenticate with an invalid password', function () {
	$user = User::factory()->create();

	$this->post(route('login.store'), [
		'login'    => $user->email,
		'password' => 'wrong-password',
	]);

	$this->assertGuest();
});

test('login identity and password are required', function () {
	$this->post(route('login.store'), [
		'login'    => 'ab',
		'password' => null,
	])->assertSessionHasErrors(['login', 'password']);

	$this->assertGuest();
});

test('login validation is localized in Georgian', function () {
	app()->setLocale('ka');

	$this->post(route('login.store'), [
		'login'    => null,
		'password' => 'password',
	])->assertSessionHasErrors([
		'login' => 'ელფოსტის ან მომხმარებლის სახელის ველი სავალდებულოა.',
	]);
});

test('users can log out', function () {
	$user = User::factory()->create();

	$this->actingAs($user)
		->post(route('logout'))
		->assertRedirect(route('home'));

	$this->assertGuest();
});

test('login attempts are rate limited', function () {
	$user = User::factory()->create();
	RateLimiter::increment(md5('login' . implode('|', [$user->email, '127.0.0.1'])), amount: 5);

	$this->post(route('login.store'), [
		'login'    => $user->email,
		'password' => 'wrong-password',
	])->assertTooManyRequests();
});
