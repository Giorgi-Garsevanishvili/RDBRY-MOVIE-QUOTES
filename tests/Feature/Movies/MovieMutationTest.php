<?php

use App\Models\Genre;
use App\Models\Movie;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

function validMoviePayload(Genre $genre, array $overrides = []): array
{
	return array_replace([
		'name_en'        => 'The Grand Budapest Hotel',
		'name_ka'        => 'სასტუმრო გრანდ ბუდაპეშტი',
		'director_en'    => 'Wes Anderson',
		'director_ka'    => 'უეს ანდერსონი',
		'description_en' => 'A writer remembers the owner of a famous hotel.',
		'description_ka' => 'მწერალი ცნობილი სასტუმროს მფლობელს იხსენებს.',
		'release_year'   => 2014,
		'genres'         => [$genre->id],
		'poster'         => UploadedFile::fake()->image('poster.jpg', 600, 900),
	], $overrides);
}

test('a verified member can create a movie with genres and a poster', function () {
	Storage::fake('public');

	$owner = User::factory()->create();
	$genres = Genre::factory()->count(2)->create();

	$this->actingAs($owner)
		->from('/dashboard')
		->post(route('movies.store'), validMoviePayload($genres[0], [
			'genres' => $genres->modelKeys(),
		]))
		->assertRedirect('/dashboard')
		->assertSessionHasNoErrors();

	$movie = Movie::query()->sole();
	$poster = $movie->getFirstMedia(Movie::POSTER_COLLECTION);

	expect($movie->user_id)->toBe($owner->id)
		->and($movie->name_en)->toBe('The Grand Budapest Hotel')
		->and($movie->genres()->pluck('genres.id')->all())->toEqualCanonicalizing($genres->modelKeys())
		->and($poster)->not->toBeNull();

	Storage::disk('public')->assertExists($poster->getPathRelativeToRoot());
});

test('movie posters accept each approved image format', function (string $extension) {
	Storage::fake('public');

	$owner = User::factory()->create();
	$genre = Genre::factory()->create();

	$this->actingAs($owner)
		->post(route('movies.store'), validMoviePayload($genre, [
			'poster' => UploadedFile::fake()->image('poster.' . $extension),
		]))
		->assertSessionHasNoErrors();

	expect(Movie::query()->sole()->getFirstMedia(Movie::POSTER_COLLECTION)?->mime_type)
		->toBe('image/' . ($extension === 'jpg' ? 'jpeg' : $extension));
})->with(['jpg', 'png', 'webp']);

test('an owner can update movie information without replacing its poster', function () {
	Storage::fake('public');

	$owner = User::factory()->create();
	$oldGenre = Genre::factory()->create();
	$newGenre = Genre::factory()->create();
	$movie = Movie::factory()->for($owner)->create();
	$movie->genres()->attach($oldGenre);
	$movie->addMedia(UploadedFile::fake()->image('original.jpg'))
		->toMediaCollection(Movie::POSTER_COLLECTION);
	$originalPosterId = $movie->getFirstMedia(Movie::POSTER_COLLECTION)?->id;

	$payload = validMoviePayload($newGenre, [
		'name_en' => 'Updated Movie',
	]);
	unset($payload['poster']);

	$this->actingAs($owner)
		->from('/dashboard')
		->patch(route('movies.update', $movie), $payload)
		->assertRedirect('/dashboard')
		->assertSessionHasNoErrors();

	$movie->refresh();

	expect($movie->name_en)->toBe('Updated Movie')
		->and($movie->genres()->pluck('genres.id')->all())->toBe([$newGenre->id])
		->and($movie->getFirstMedia(Movie::POSTER_COLLECTION)?->id)->toBe($originalPosterId);
});

test('an owner can replace a movie poster', function () {
	Storage::fake('public');

	$owner = User::factory()->create();
	$genre = Genre::factory()->create();
	$movie = Movie::factory()->for($owner)->create();
	$movie->genres()->attach($genre);
	$oldPoster = $movie->addMedia(UploadedFile::fake()->image('original.jpg'))
		->toMediaCollection(Movie::POSTER_COLLECTION);
	$oldPath = $oldPoster->getPathRelativeToRoot();

	$this->actingAs($owner)
		->patch(route('movies.update', $movie), validMoviePayload($genre, [
			'poster' => UploadedFile::fake()->image('replacement.png'),
		]))
		->assertSessionHasNoErrors();

	$movie->refresh();
	$newPoster = $movie->getFirstMedia(Movie::POSTER_COLLECTION);

	expect($movie->getMedia(Movie::POSTER_COLLECTION))->toHaveCount(1)
		->and($newPoster?->file_name)->toBe('replacement.png');

	Storage::disk('public')->assertMissing($oldPath);
	Storage::disk('public')->assertExists($newPoster->getPathRelativeToRoot());
});

test('only the owner can update or delete a movie', function () {
	Storage::fake('public');

	$owner = User::factory()->create();
	$otherMember = User::factory()->create();
	$genre = Genre::factory()->create();
	$movie = Movie::factory()->for($owner)->create(['name_en' => 'Original Movie']);
	$movie->genres()->attach($genre);

	$this->actingAs($otherMember)
		->patch(route('movies.update', $movie), validMoviePayload($genre))
		->assertForbidden();

	$this->actingAs($otherMember)
		->delete(route('movies.destroy', $movie))
		->assertForbidden();

	expect($movie->fresh()?->name_en)->toBe('Original Movie');
	$this->assertDatabaseHas('movies', ['id' => $movie->id]);
});

test('an owner hard-deletes a movie with its genre links and poster', function () {
	Storage::fake('public');

	$owner = User::factory()->create();
	$genre = Genre::factory()->create();
	$movie = Movie::factory()->for($owner)->create();
	$movie->genres()->attach($genre);
	$poster = $movie->addMedia(UploadedFile::fake()->image('poster.jpg'))
		->toMediaCollection(Movie::POSTER_COLLECTION);
	$posterPath = $poster->getPathRelativeToRoot();

	$this->actingAs($owner)
		->from('/dashboard')
		->delete(route('movies.destroy', $movie))
		->assertRedirect('/dashboard');

	$this->assertDatabaseMissing('movies', ['id' => $movie->id]);
	$this->assertDatabaseMissing('genre_movie', ['movie_id' => $movie->id]);
	$this->assertDatabaseMissing('media', [
		'model_type' => Movie::class,
		'model_id'   => $movie->id,
	]);
	Storage::disk('public')->assertMissing($posterPath);
});

test('movie fields enforce required lengths scripts year genres and poster rules', function (array $overrides, array|string $fields) {
	Storage::fake('public');

	$owner = User::factory()->create();
	$genre = Genre::factory()->create();
	if (($overrides['genres'] ?? null) === 'duplicate')
	{
		$overrides['genres'] = [$genre->id, $genre->id];
	}

	$this->actingAs($owner)
		->post(route('movies.store'), validMoviePayload($genre, $overrides))
		->assertSessionHasErrors($fields);
})->with([
	'required bilingual fields' => [[
		'name_en'        => null,
		'name_ka'        => null,
		'director_en'    => null,
		'director_ka'    => null,
		'description_en' => null,
		'description_ka' => null,
	], ['name_en', 'name_ka', 'director_en', 'director_ka', 'description_en', 'description_ka']],
	'English name script'         => [['name_en' => 'ქართული'], 'name_en'],
	'Georgian name script'        => [['name_ka' => 'English'], 'name_ka'],
	'English director script'     => [['director_en' => 'ქართული'], 'director_en'],
	'Georgian director script'    => [['director_ka' => 'English'], 'director_ka'],
	'English description script'  => [['description_en' => 'ქართული'], 'description_en'],
	'Georgian description script' => [['description_ka' => 'English'], 'description_ka'],
	'name length'                 => [['name_en' => str_repeat('a', 256)], 'name_en'],
	'director length'             => [['director_ka' => str_repeat('ა', 256)], 'director_ka'],
	'description length'          => [['description_en' => str_repeat('a', 2001)], 'description_en'],
	'earliest year'               => [['release_year' => 1887], 'release_year'],
	'future year'                 => [['release_year' => (int) date('Y') + 1], 'release_year'],
	'missing genre'               => [['genres' => []], 'genres'],
	'unknown genre'               => [['genres' => [999999]], 'genres.0'],
	'duplicate genre'             => [['genres' => 'duplicate'], 'genres.1'],
	'missing poster'              => [['poster' => null], 'poster'],
	'wrong poster type'           => [[
		'poster' => UploadedFile::fake()->create('poster.pdf', 100, 'application/pdf'),
	], 'poster'],
	'oversized poster' => [[
		'poster' => UploadedFile::fake()->create('poster.jpg', 10241, 'image/jpeg'),
	], 'poster'],
]);

test('movie validation messages are localized in Georgian', function () {
	Storage::fake('public');
	app()->setLocale('ka');

	$owner = User::factory()->create();
	$genre = Genre::factory()->create();

	$this->actingAs($owner)
		->post(route('movies.store'), validMoviePayload($genre, ['name_en' => null]))
		->assertSessionHasErrors([
			'name_en' => 'ინგლისური სახელი სავალდებულოა.',
		]);
});
