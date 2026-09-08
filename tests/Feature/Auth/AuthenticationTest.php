<?php

use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;

test('login screen can be rendered', function () {
	$this->get(route('login'))->assertOk();
});

test('users can authenticate with their email', function () {
	$user = User::factory()->create();

	$response = $this->post(route('login.store'), [
		'email'    => $user->email,
		'password' => 'password',
	]);

	$this->assertAuthenticatedAs($user);
	$response->assertRedirect(route('dashboard', absolute: false));
});

test('users cannot authenticate with an invalid password', function () {
	$user = User::factory()->create();

	$this->post(route('login.store'), [
		'email'    => $user->email,
		'password' => 'wrong-password',
	]);

	$this->assertGuest();
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
		'email'    => $user->email,
		'password' => 'wrong-password',
	])->assertTooManyRequests();
});
