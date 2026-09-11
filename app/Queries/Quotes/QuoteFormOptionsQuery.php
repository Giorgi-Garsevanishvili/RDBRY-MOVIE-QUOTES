<?php

namespace App\Queries\Quotes;

use App\Models\Movie;
use App\Models\User;

class QuoteFormOptionsQuery
{
	/**
	 * @return array{
	 *     movies: list<array{
	 *         id: int,
	 *         name: array{en: string, ka: string},
	 *         releaseYear: int,
	 *         posterUrl: string|null
	 *     }>
	 * }
	 */
	public function pageProps(User $author): array
	{
		$movies = Movie::query()
			->whereBelongsTo($author)
			->with('media')
			->latest()
			->get();

		return [
			'movies' => array_values($movies
				->map(static fn (Movie $movie): array => [
					'id'   => $movie->id,
					'name' => [
						'en' => $movie->name_en,
						'ka' => $movie->name_ka,
					],
					'releaseYear' => $movie->release_year,
					'posterUrl'   => $movie->getFirstMediaUrl(Movie::POSTER_COLLECTION) ?: null,
				])
				->all()),
		];
	}
}
