<?php

use App\Models\Movie;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('the movie page lists only the signed in members movies', function () {
	Storage::fake('public');

	$owner = User::factory()->create();
	$otherMember = User::factory()->create();
	$olderMovie = Movie::factory()->for($owner)->create([
		'name_en'      => 'Older Movie',
		'name_ka'      => 'ძველი ფილმი',
		'release_year' => 1999,
		'created_at'   => now()->subDay(),
	]);
	$newerMovie = Movie::factory()->for($owner)->create([
		'name_en'      => 'Newest Movie',
		'name_ka'      => 'უახლესი ფილმი',
		'release_year' => 2024,
		'created_at'   => now(),
	]);
	Movie::factory()->for($otherMember)->create(['name_en' => 'Private Movie']);
	$newerMovie->addMedia(UploadedFile::fake()->image('newest-poster.jpg'))
		->toMediaCollection(Movie::POSTER_COLLECTION);

	$this->actingAs($owner)
		->get(route('movies.index'))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page
			->component('movies/MovieList')
			->where('filters.search', '')
			->has('movies', 2)
			->where('movies.0.id', $newerMovie->id)
			->where('movies.0.name.en', 'Newest Movie')
			->where('movies.0.name.ka', 'უახლესი ფილმი')
			->where('movies.0.releaseYear', 2024)
			->where('movies.0.quoteCount', 0)
			->where('movies.0.posterUrl', fn (string $url): bool => str_ends_with($url, '/newest-poster.jpg'))
			->where('movies.1.id', $olderMovie->id)
		);
});

test('the movie page applies and preserves a bilingual name search', function () {
	$owner = User::factory()->create();
	$wanted = Movie::factory()->for($owner)->create([
		'name_en' => 'Searchable Movie',
		'name_ka' => 'საძიებო ფილმი',
	]);
	Movie::factory()->for($owner)->create([
		'name_en' => 'Different Movie',
		'name_ka' => 'სხვა ფილმი',
	]);

	$this->actingAs($owner)
		->get(route('movies.index', ['filter' => ['search' => ' საძიებო ']]))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page
			->component('movies/MovieList')
			->where('filters.search', 'საძიებო')
			->has('movies', 1)
			->where('movies.0.id', $wanted->id)
		);
});
