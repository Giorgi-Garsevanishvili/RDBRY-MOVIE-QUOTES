<?php

use Inertia\Testing\AssertableInertia as Assert;

test('an unknown route renders the not found page', function () {
	$this->get('/this-page-does-not-exist')
		->assertNotFound()
		->assertInertia(fn (Assert $page) => $page
			->component('errors/ErrorPage')
			->where('locale', 'en')
			->where('status', 404));
});

test('error pages honor the selected locale', function () {
	$this->withUnencryptedCookie('locale', 'ka')
		->get('/this-localized-page-does-not-exist')
		->assertNotFound()
		->assertInertia(fn (Assert $page) => $page
			->component('errors/ErrorPage')
			->where('locale', 'ka')
			->where('status', 404));
});

test('json requests keep their normal authentication response', function () {
	$this->getJson(route('dashboard'))
		->assertUnauthorized();
});

test('json requests keep their normal not found response', function () {
	$this->getJson('/this-json-page-does-not-exist')
		->assertNotFound()
		->assertJsonStructure(['message']);
});
