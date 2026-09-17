<?php

use App\Models\Genre;
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

test('the movie list provides bilingual genre options for the create form', function () {
	$owner = User::factory()->create();
	$drama = Genre::factory()->create([
		'name_en' => 'Drama',
		'name_ka' => 'დრამა',
	]);

	$this->actingAs($owner)
		->get(route('movies.index'))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page
				->component('movies/MovieList')
				->has('genres', 1)
				->where('genres.0.id', $drama->id)
				->where('genres.0.name.en', 'Drama')
				->where('genres.0.name.ka', 'დრამა')
		);
});

test('an owner can view complete bilingual movie details', function () {
	Storage::fake('public');

	$owner = User::factory()->create();
	$drama = Genre::factory()->create([
		'name_en' => 'Drama',
		'name_ka' => 'დრამა',
	]);
	$movie = Movie::factory()->for($owner)->create([
		'name_en'        => 'The Notebook',
		'name_ka'        => 'უბის წიგნაკი',
		'director_en'    => 'Nick Cassavetes',
		'director_ka'    => 'ნიკ კასავეტისი',
		'description_en' => 'A story about lasting love.',
		'description_ka' => 'ამბავი მარადიულ სიყვარულზე.',
		'release_year'   => 2004,
	]);
	$movie->genres()->attach($drama);
	$movie->addMedia(UploadedFile::fake()->image('notebook.jpg'))
		->toMediaCollection(Movie::POSTER_COLLECTION);

	$this->actingAs($owner)
		->get(route('movies.show', $movie))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page
				->component('movies/MovieDetails')
				->where('movie.id', $movie->id)
				->where('movie.name.en', 'The Notebook')
				->where('movie.name.ka', 'უბის წიგნაკი')
				->where('movie.director.en', 'Nick Cassavetes')
				->where('movie.director.ka', 'ნიკ კასავეტისი')
				->where('movie.description.en', 'A story about lasting love.')
				->where('movie.description.ka', 'ამბავი მარადიულ სიყვარულზე.')
				->where('movie.releaseYear', 2004)
				->where('movie.quoteCount', 0)
				->where('movie.posterUrl', fn (string $url): bool => str_ends_with($url, '/notebook.jpg'))
				->has('movie.genres', 1)
				->where('movie.genres.0.id', $drama->id)
				->where('genres.0.id', $drama->id)
		);
});

test('a member cannot view another members movie details', function () {
	$owner = User::factory()->create();
	$otherMember = User::factory()->create();
	$movie = Movie::factory()->for($owner)->create();

	$this->actingAs($otherMember)
		->get(route('movies.show', $movie))
		->assertForbidden();
});
