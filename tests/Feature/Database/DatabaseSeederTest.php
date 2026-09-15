<?php

use App\Models\Comment;
use App\Models\Genre;
use App\Models\Like;
use App\Models\Movie;
use App\Models\Quote;
use App\Models\QuoteNotification;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

test('the database seeder creates complete realistic demo content', function () {
	Storage::fake('public');

	$this->seed();

	$demoUser = User::query()->where('email', 'moviefan@example.com')->sole();
	$movies = Movie::query()->with(['genres', 'media'])->get();
	$quotes = Quote::query()->with(['movie', 'media'])->get();

	expect(User::query()->count())->toBe(8)
		->and(User::query()->whereNull('email_verified_at')->count())->toBe(0)
		->and(Hash::check('password', (string) $demoUser->password))->toBeTrue()
		->and(User::query()->withCount('movies')->pluck('movies_count')->min())->toBeGreaterThanOrEqual(2)
		->and(Genre::query()->count())->toBe(10)
		->and($movies)->toHaveCount(20)
		->and($movies->pluck('name_en')->all())->toEqualCanonicalizing([
			'Interstellar',
			'The Royal Tenenbaums',
			'The Lord of the Rings: The Return of the King',
			'Billy Elliot',
			'Casablanca',
			'Spider-Man: No Way Home',
			'The Dark Knight',
			'La La Land',
			'Cinema Paradiso',
			'The Grand Budapest Hotel',
			'Blade Runner 2049',
			'The Truman Show',
			'Back to the Future',
			'Roman Holiday',
			'Rear Window',
			'Toy Story',
			'The Matrix',
			'Whiplash',
			'The Secret Life of Walter Mitty',
			'Moonrise Kingdom',
		])
		->and($quotes)->toHaveCount(20)
		->and(Comment::query()->count())->toBe(40)
		->and(Like::query()->count())->toBe(40)
		->and(QuoteNotification::query()->count())->toBe(80)
		->and(QuoteNotification::query()->whereNull('read_at')->count())->toBe(40)
		->and(Media::query()->count())->toBe(40)
		->and(Media::query()->distinct()->count('file_name'))->toBe(20);

	foreach ($movies as $movie)
	{
		expect($movie->genres)->not->toBeEmpty()
			->and($movie->hasMedia(Movie::POSTER_COLLECTION))->toBeTrue();
		Storage::disk('public')->assertExists(
			$movie->getFirstMedia(Movie::POSTER_COLLECTION)?->getPathRelativeToRoot() ?? '',
		);
	}

	foreach ($quotes as $quote)
	{
		expect($quote->movie->user_id)->toBe($quote->user_id)
			->and($quote->hasMedia(Quote::IMAGE_COLLECTION))->toBeTrue();
		Storage::disk('public')->assertExists(
			$quote->getFirstMedia(Quote::IMAGE_COLLECTION)?->getPathRelativeToRoot() ?? '',
		);
	}

	foreach (Like::query()->with('quote')->get() as $like)
	{
		expect($like->user_id)->not->toBe($like->quote->user_id);
	}

	foreach (Comment::query()->with('quote')->get() as $comment)
	{
		expect($comment->user_id)->not->toBe($comment->quote->user_id);
	}
});

test('the database seeder is safe to run repeatedly', function () {
	Storage::fake('public');

	$this->seed();
	$this->seed();

	expect(User::query()->count())->toBe(8)
		->and(Genre::query()->count())->toBe(10)
		->and(Movie::query()->count())->toBe(20)
		->and(Quote::query()->count())->toBe(20)
		->and(Comment::query()->count())->toBe(40)
		->and(Like::query()->count())->toBe(40)
		->and(QuoteNotification::query()->count())->toBe(80)
		->and(Media::query()->count())->toBe(40);
});
