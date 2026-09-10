<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('protected application destinations reject guests', function (string $routeName) {
	$this->get(route($routeName))
		->assertForbidden()
		->assertInertia(fn (Assert $page) => $page
			->component('errors/ErrorPage')
			->where('locale', 'en')
			->where('status', 403));
})->with([
	'feed'          => 'dashboard',
	'movies'        => 'movies.index',
	'notifications' => 'notifications.index',
	'profile'       => 'profile.edit',
]);

test('verified members can visit protected application destinations', function (string $routeName, string $section) {
	$user = User::factory()->create();

	$this->actingAs($user)
		->get(route($routeName))
		->assertOk()
		->assertInertia(fn (Assert $page) => $page
			->component('protected/ProtectedPlaceholder')
			->where('section', $section)
			->where('auth.user.id', $user->id));
})->with([
	'feed'          => ['dashboard', 'feed'],
	'notifications' => ['notifications.index', 'notifications'],
]);

test('unverified members cannot enter the protected application', function () {
	$user = User::factory()->unverified()->create();

	$this->actingAs($user)
		->get(route('dashboard'))
		->assertForbidden()
		->assertInertia(fn (Assert $page) => $page
			->component('errors/ErrorPage')
			->where('status', 403));
});
