<?php

namespace App\Queries\Movies;

use App\Models\Genre;
use App\Models\Movie;

class MovieShowQuery
{
	/**
	 * @return array{
	 *     movie: array{
	 *         id: int,
	 *         name: array{en: string, ka: string},
	 *         director: array{en: string, ka: string},
	 *         description: array{en: string, ka: string},
	 *         releaseYear: int,
	 *         genres: list<array{id: int, name: array{en: string, ka: string}}>,
	 *         posterUrl: string|null,
	 *         quoteCount: int
	 *     }
	 * }
	 */
	public function pageProps(Movie $movie): array
	{
		$movie->load(['genres', 'media']);

		return [
			'movie' => [
				'id'   => $movie->id,
				'name' => [
					'en' => $movie->name_en,
					'ka' => $movie->name_ka,
				],
				'director' => [
					'en' => $movie->director_en,
					'ka' => $movie->director_ka,
				],
				'description' => [
					'en' => $movie->description_en,
					'ka' => $movie->description_ka,
				],
				'releaseYear' => $movie->release_year,
				'genres'      => array_values($movie->genres
					->map(static fn (Genre $genre): array => [
						'id'   => $genre->id,
						'name' => [
							'en' => $genre->name_en,
							'ka' => $genre->name_ka,
						],
					])
					->all()),
				'posterUrl'  => $movie->getFirstMediaUrl(Movie::POSTER_COLLECTION) ?: null,
				'quoteCount' => 0,
			],
		];
	}
}
