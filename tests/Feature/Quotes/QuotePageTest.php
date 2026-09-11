<?php

use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('the feed provides only the authors movies for quote creation', function () {
	Storage::fake('public');

	$author = User::factory()->create();
	$otherMember = User::factory()->create();
	$olderMovie = Movie::factory()->for($author)->create([
		'name_en'    => 'Older Movie',
		'name_ka'    => 'ძველი ფილმი',
		'created_at' => now()->subDay(),
	]);
	$newerMovie = Movie::factory()->for($author)->create([
		'name_en'      => 'Newest Movie',
		'name_ka'      => 'უახლესი ფილმი',
		'release_year' => 2024,
		'created_at'   => now(),
	]);
	Movie::factory()->for($otherMember)->create(['name_en' => 'Private Movie']);
	$newerMovie->addMedia(UploadedFile::fake()->image('newest-poster.jpg'))
		->toMediaCollection(Movie::POSTER_COLLECTION);

	$this->actingAs($author)
		->get(route('dashboard'))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page
				->component('feed/Feed')
				->has('movies', 2)
				->where('movies.0.id', $newerMovie->id)
				->where('movies.0.name.en', 'Newest Movie')
				->where('movies.0.name.ka', 'უახლესი ფილმი')
				->where('movies.0.releaseYear', 2024)
				->where('movies.0.posterUrl', fn (string $url): bool => str_ends_with($url, '/newest-poster.jpg'))
				->where('movies.1.id', $olderMovie->id)
		);
});

test('movie details provide newest quotes with their images', function () {
	Storage::fake('public');

	$author = User::factory()->create();
	$movie = Movie::factory()->for($author)->create();
	$olderQuote = Quote::factory()->for($author)->for($movie)->create([
		'text_en'    => 'An older quote.',
		'text_ka'    => 'ძველი ქართული ციტატა',
		'created_at' => now()->subDay(),
	]);
	$newerQuote = Quote::factory()->for($author)->for($movie)->create([
		'text_en'    => 'The newest quote.',
		'text_ka'    => 'უახლესი ქართული ციტატა',
		'created_at' => now(),
	]);
	$newerQuote->addMedia(UploadedFile::fake()->image('quote.jpg'))
		->toMediaCollection(Quote::IMAGE_COLLECTION);

	$this->actingAs($author)
		->get(route('movies.show', $movie))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page
				->component('movies/MovieDetails')
				->where('movie.quoteCount', 2)
				->has('movie.quotes', 2)
				->where('movie.quotes.0.id', $newerQuote->id)
				->where('movie.quotes.0.text.en', 'The newest quote.')
				->where('movie.quotes.0.text.ka', 'უახლესი ქართული ციტატა')
				->where('movie.quotes.0.imageUrl', fn (string $url): bool => str_ends_with($url, '/quote.jpg'))
				->where('movie.quotes.0.commentCount', 0)
				->where('movie.quotes.0.likeCount', 0)
				->where('movie.quotes.1.id', $olderQuote->id)
		);
});

test('the movie list shows each movies real quote count', function () {
	$author = User::factory()->create();
	$movie = Movie::factory()->for($author)->create();
	Quote::factory()->count(2)->for($author)->for($movie)->create();

	$this->actingAs($author)
		->get(route('movies.index'))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page
				->component('movies/MovieList')
				->where('movies.0.id', $movie->id)
				->where('movies.0.quoteCount', 2)
		);
});

test('a verified member can view a quote created by another member', function () {
	Storage::fake('public');

	$author = User::factory()->create(['username' => 'quoteauthor']);
	$viewer = User::factory()->create();
	$movie = Movie::factory()->for($author)->create([
		'name_en'      => 'Interstellar',
		'name_ka'      => 'ინტერსტელარი',
		'release_year' => 2014,
	]);
	$quote = Quote::factory()->for($author)->for($movie)->create([
		'text_en' => 'Love is the one thing.',
		'text_ka' => 'სიყვარული ერთადერთი რამ არის',
	]);
	$quote->addMedia(UploadedFile::fake()->image('interstellar-quote.webp'))
		->toMediaCollection(Quote::IMAGE_COLLECTION);

	$this->actingAs($viewer)
		->get(route('quotes.show', $quote))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page
				->component('quotes/QuoteDetails')
				->where('quote.id', $quote->id)
				->where('quote.text.en', 'Love is the one thing.')
				->where('quote.text.ka', 'სიყვარული ერთადერთი რამ არის')
				->where('quote.imageUrl', fn (string $url): bool => str_ends_with($url, '/interstellar-quote.webp'))
				->where('quote.author.id', $author->id)
				->where('quote.author.username', 'quoteauthor')
				->where('quote.movie.id', $movie->id)
				->where('quote.movie.name.en', 'Interstellar')
				->where('quote.movie.name.ka', 'ინტერსტელარი')
				->where('quote.movie.releaseYear', 2014)
				->where('quote.commentCount', 0)
				->where('quote.likeCount', 0)
				->where('quote.canManage', false)
		);
});

test('only the quote creator receives management controls', function () {
	$author = User::factory()->create();
	$movie = Movie::factory()->for($author)->create();
	$quote = Quote::factory()->for($author)->for($movie)->create();

	$this->actingAs($author)
		->get(route('quotes.show', $quote))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page
				->component('quotes/QuoteDetails')
				->where('quote.canManage', true)
		);
});

test('an unverified member cannot view a quote', function () {
	$author = User::factory()->create();
	$unverifiedMember = User::factory()->unverified()->create();
	$quote = Quote::factory()->for($author)->create();

	$this->actingAs($unverifiedMember)
		->get(route('quotes.show', $quote))
		->assertForbidden();
});
