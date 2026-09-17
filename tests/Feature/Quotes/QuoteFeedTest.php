<?php

use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;
use App\Queries\Quotes\QuoteFeedQuery;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\QueryBuilder\Exceptions\InvalidFilterQuery;

test('the feed presents every members quotes newest first', function () {
	Storage::fake('public');

	$viewer = User::factory()->create();
	$olderAuthor = User::factory()->create(['username' => 'olderauthor']);
	$newerAuthor = User::factory()->create(['username' => 'newerauthor']);
	$olderMovie = Movie::factory()->for($olderAuthor)->create();
	$newerMovie = Movie::factory()->for($newerAuthor)->create([
		'name_en'      => 'Interstellar',
		'name_ka'      => 'ინტერსტელარი',
		'release_year' => 2014,
	]);
	$olderQuote = Quote::factory()->for($olderAuthor)->for($olderMovie)->create([
		'created_at' => now()->subDay(),
	]);
	$newerQuote = Quote::factory()->for($newerAuthor)->for($newerMovie)->create([
		'text_en'    => 'Love is the one thing.',
		'text_ka'    => 'სიყვარული ერთადერთი რამ არის',
		'created_at' => now(),
	]);
	$newerQuote->addMedia(UploadedFile::fake()->image('interstellar.webp'))
		->toMediaCollection(Quote::IMAGE_COLLECTION);

	$this->actingAs($viewer)
		->get(route('dashboard'))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page
				->component('feed/Feed')
				->has('quotes.data', 2)
				->where('quotes.data.0.id', $newerQuote->id)
				->where('quotes.data.0.text.en', 'Love is the one thing.')
				->where('quotes.data.0.text.ka', 'სიყვარული ერთადერთი რამ არის')
				->where('quotes.data.0.imageUrl', fn (string $url): bool => str_ends_with($url, '/interstellar.webp'))
				->where('quotes.data.0.author.id', $newerAuthor->id)
				->where('quotes.data.0.author.username', 'newerauthor')
				->where('quotes.data.0.movie.id', $newerMovie->id)
				->where('quotes.data.0.movie.name.en', 'Interstellar')
				->where('quotes.data.0.movie.name.ka', 'ინტერსტელარი')
				->where('quotes.data.0.movie.releaseYear', 2014)
				->where('quotes.data.0.commentCount', 0)
				->where('quotes.data.0.likeCount', 0)
				->where('quotes.data.1.id', $olderQuote->id)
		);
});

test('cursor pages keep a stable order without duplicate quotes', function () {
	$author = User::factory()->create();
	$movie = Movie::factory()->for($author)->create();
	$timestamp = now()->startOfSecond();
	$quotes = Quote::factory()
		->count(QuoteFeedQuery::PER_PAGE + 2)
		->for($author)
		->for($movie)
		->create([
			'created_at' => $timestamp,
			'updated_at' => $timestamp,
		]);
	$expectedIds = $quotes->modelKeys();
	rsort($expectedIds);

	$firstPage = app(QuoteFeedQuery::class)->paginate(Request::create('/dashboard'));
	$nextCursor = $firstPage->nextCursor();

	expect($nextCursor)->not->toBeNull();

	$secondPage = app(QuoteFeedQuery::class)->paginate(Request::create('/dashboard', 'GET', [
		'cursor' => $nextCursor?->encode(),
	]));
	$firstIds = collect($firstPage->items())->pluck('id')->all();
	$secondIds = collect($secondPage->items())->pluck('id')->all();

	expect($firstIds)
		->toBe(array_slice($expectedIds, 0, QuoteFeedQuery::PER_PAGE))
		->and($secondIds)->toBe(array_slice($expectedIds, QuoteFeedQuery::PER_PAGE))
		->and(array_intersect($firstIds, $secondIds))->toBe([]);
});

test('a feed page eager loads its presentation data in four queries', function () {
	$author = User::factory()->create();
	$movie = Movie::factory()->for($author)->create();
	Quote::factory()->count(3)->for($author)->for($movie)->create();

	$this->expectsDatabaseQueryCount(4);

	$page = app(QuoteFeedQuery::class)->paginate(Request::create('/dashboard'));

	expect($page->items())->toHaveCount(3);
});

test('@ search matches movie names only in either language', function () {
	$author = User::factory()->create();
	$englishMovie = Movie::factory()->for($author)->create([
		'name_en' => 'The Matrix',
		'name_ka' => 'მატრიცა',
	]);
	$georgianMovie = Movie::factory()->for($author)->create([
		'name_en' => 'Interstellar',
		'name_ka' => 'ვარსკვლავთშორისი',
	]);
	$otherMovie = Movie::factory()->for($author)->create([
		'name_en' => 'Casablanca',
		'name_ka' => 'კასაბლანკა',
	]);
	$englishMatch = Quote::factory()->for($author)->for($englishMovie)->create();
	$georgianMatch = Quote::factory()->for($author)->for($georgianMovie)->create();
	Quote::factory()->for($author)->for($otherMovie)->create([
		'text_en' => 'The Matrix appears only in this quote.',
	]);

	$englishResults = app(QuoteFeedQuery::class)->paginate(Request::create('/dashboard', 'GET', [
		'filter' => ['search' => '@matrix'],
	]));
	$georgianResults = app(QuoteFeedQuery::class)->paginate(Request::create('/dashboard', 'GET', [
		'filter' => ['search' => '@ვარსკვლავთშორისი'],
	]));

	expect(collect($englishResults->items())->pluck('id')->all())->toBe([$englishMatch->id])
		->and(collect($georgianResults->items())->pluck('id')->all())->toBe([$georgianMatch->id]);
});

test('# search matches quote text only in either language', function () {
	$author = User::factory()->create();
	$movie = Movie::factory()->for($author)->create([
		'name_en' => 'Dream Search',
		'name_ka' => 'ოცნების ძებნა',
	]);
	$englishMatch = Quote::factory()->for($author)->for($movie)->create([
		'text_en' => 'Follow your dream.',
		'text_ka' => 'გაჰყევი შენს მიზანს',
	]);
	$georgianMatch = Quote::factory()->for($author)->for($movie)->create([
		'text_en' => 'Keep moving forward.',
		'text_ka' => 'არ შეწყვიტო ოცნება',
	]);

	$englishResults = app(QuoteFeedQuery::class)->paginate(Request::create('/dashboard', 'GET', [
		'filter' => ['search' => '#dream'],
	]));
	$georgianResults = app(QuoteFeedQuery::class)->paginate(Request::create('/dashboard', 'GET', [
		'filter' => ['search' => '#ოცნება'],
	]));

	expect(collect($englishResults->items())->pluck('id')->all())->toBe([$englishMatch->id])
		->and(collect($georgianResults->items())->pluck('id')->all())->toBe([$georgianMatch->id]);
});

test('plain search matches movie names and quote text in both languages', function () {
	$author = User::factory()->create();
	$englishMovie = Movie::factory()->for($author)->create([
		'name_en' => 'Arrival Story',
		'name_ka' => 'ჩამოსვლის ამბავი',
	]);
	$georgianMovie = Movie::factory()->for($author)->create([
		'name_en' => 'Moonlight',
		'name_ka' => 'მთვარის შუქი',
	]);
	$otherMovie = Movie::factory()->for($author)->create([
		'name_en' => 'Casablanca',
		'name_ka' => 'კასაბლანკა',
	]);
	$movieNameMatch = Quote::factory()->for($author)->for($englishMovie)->create();
	$quoteTextMatch = Quote::factory()->for($author)->for($otherMovie)->create([
		'text_en' => 'The arrival changed everything.',
	]);
	$georgianMovieMatch = Quote::factory()->for($author)->for($georgianMovie)->create();
	$georgianQuoteMatch = Quote::factory()->for($author)->for($otherMovie)->create([
		'text_ka' => 'მთვარის შუქზე ნათქვამი ციტატა',
	]);
	Quote::factory()->for($author)->for($otherMovie)->create();

	$englishResults = app(QuoteFeedQuery::class)->paginate(Request::create('/dashboard', 'GET', [
		'filter' => ['search' => 'arrival'],
	]));
	$georgianResults = app(QuoteFeedQuery::class)->paginate(Request::create('/dashboard', 'GET', [
		'filter' => ['search' => 'მთვარის'],
	]));

	expect(collect($englishResults->items())->pluck('id')->sort()->values()->all())
		->toBe(collect([$movieNameMatch->id, $quoteTextMatch->id])->sort()->values()->all())
		->and(collect($georgianResults->items())->pluck('id')->sort()->values()->all())
		->toBe(collect([$georgianMovieMatch->id, $georgianQuoteMatch->id])->sort()->values()->all());
});

test('the feed preserves the submitted search value', function () {
	$viewer = User::factory()->create();

	$this->actingAs($viewer)
		->get(route('dashboard', ['filter' => ['search' => '  dream  ']]))
		->assertOk()
		->assertInertia(
			fn (Assert $page) => $page
				->component('feed/Feed')
				->where('filters.search', 'dream')
		);
});

test('the feed rejects filters that are not explicitly allowed', function () {
	$request = Request::create('/dashboard', 'GET', [
		'filter' => ['user_id' => 1],
	]);

	app(QuoteFeedQuery::class)->paginate($request);
})->throws(InvalidFilterQuery::class);
