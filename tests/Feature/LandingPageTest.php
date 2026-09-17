<?php

use Inertia\Testing\AssertableInertia as Assert;

test('landing page renders in the default locale', function () {
	$this->get(route('home'))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page
			->component('Landing/Landing')
			->where('locale', 'en'),
		);
});

test('a guest can change and persist the interface locale', function () {
	$this->post(route('locale.update', ['locale' => 'ka']))
		->assertRedirect()
		->assertPlainCookie('locale', 'ka')
		->assertSessionHas('locale', 'ka');

	$this->get(route('home'))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page
			->component('Landing/Landing')
			->where('locale', 'ka'),
		);
});

test('unsupported locales are rejected', function () {
	$this->post(route('locale.update', ['locale' => 'fr']))
		->assertRedirect()
		->assertSessionHasErrors('locale')
		->assertSessionMissing('locale');
});
