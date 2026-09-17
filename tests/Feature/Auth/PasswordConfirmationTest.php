<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('password confirmation screen can be rendered', function () {
	$user = User::factory()->create();

	$this->actingAs($user)
		->get(route('password.confirm'))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page->component('auth/confirm-password'),
		);
});

test('password confirmation requires authentication', function () {
	$this->get(route('password.confirm'))
		->assertForbidden()
		->assertInertia(fn (Assert $page) => $page
			->component('errors/ErrorPage')
			->where('locale', 'en')
			->where('status', 403));
});
