<?php

use App\Models\Genre;
use App\Models\Movie;
use App\Models\User;
use App\Queries\Movies\MovieIndexQuery;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\Exceptions\InvalidFilterQuery;

test('the movie index query only returns the owners movies newest first', function () {
	$owner = User::factory()->create();
	$otherMember = User::factory()->create();
	$older = Movie::factory()->for($owner)->create(['created_at' => now()->subDay()]);
	$newer = Movie::factory()->for($owner)->create(['created_at' => now()]);
	Movie::factory()->for($otherMember)->create(['created_at' => now()->addDay()]);

	$movies = app(MovieIndexQuery::class)->build($owner, Request::create('/movies'))->get();

	expect($movies->modelKeys())->toBe([$newer->id, $older->id]);
});

test('the movie index query filters by bilingual name year and genre', function () {
	$owner = User::factory()->create();
	$drama = Genre::factory()->create();
	$comedy = Genre::factory()->create();
	$wanted = Movie::factory()->for($owner)->create([
		'name_en'      => 'Searchable Movie',
		'name_ka'      => 'საძიებო ფილმი',
		'release_year' => 2020,
	]);
	$wanted->genres()->attach($drama);
	$other = Movie::factory()->for($owner)->create([
		'name_en'      => 'Different Movie',
		'release_year' => 2020,
	]);
	$other->genres()->attach($comedy);

	$englishRequest = Request::create('/movies', 'GET', [
		'filter' => ['search' => 'Searchable'],
	]);
	$georgianRequest = Request::create('/movies', 'GET', [
		'filter' => ['search' => 'საძიებო'],
	]);
	$structuredRequest = Request::create('/movies', 'GET', [
		'filter' => [
			'release_year' => 2020,
			'genre'        => $drama->id,
		],
	]);

	expect(app(MovieIndexQuery::class)->build($owner, $englishRequest)->get()->modelKeys())->toBe([$wanted->id])
		->and(app(MovieIndexQuery::class)->build($owner, $georgianRequest)->get()->modelKeys())->toBe([$wanted->id])
		->and(app(MovieIndexQuery::class)->build($owner, $structuredRequest)->get()->modelKeys())->toBe([$wanted->id]);
});

test('the movie index query supports only explicit sorts fields and includes', function () {
	$owner = User::factory()->create();
	$genre = Genre::factory()->create();
	Movie::factory()->for($owner)->create(['name_en' => 'Zulu Movie']);
	$alpha = Movie::factory()->for($owner)->create(['name_en' => 'Alpha Movie']);
	$alpha->genres()->attach($genre);

	$request = Request::create('/movies', 'GET', [
		'sort'    => 'name_en',
		'include' => 'genres',
		'fields'  => [
			'movies' => 'id,user_id,name_en',
			'genres' => 'id,name_en',
		],
	]);

	$movies = app(MovieIndexQuery::class)->build($owner, $request)->get();

	expect($movies->first()?->id)->toBe($alpha->id)
		->and($movies->first()?->relationLoaded('genres'))->toBeTrue()
		->and($movies->first()?->getAttributes())->toHaveKeys(['id', 'user_id', 'name_en']);
});

test('the movie index query rejects filters that are not explicitly allowed', function () {
	$owner = User::factory()->create();
	$request = Request::create('/movies', 'GET', [
		'filter' => ['user_id' => $owner->id],
	]);

	app(MovieIndexQuery::class)->build($owner, $request)->get();
})->throws(InvalidFilterQuery::class);
