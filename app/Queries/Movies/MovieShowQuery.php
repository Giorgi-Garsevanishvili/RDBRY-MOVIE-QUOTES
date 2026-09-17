<?php

namespace App\Queries\Movies;

use App\Models\Genre;
use App\Models\Movie;
use App\Models\Quote;

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
	 *         quoteCount: int,
	 *         quotes: list<array{
	 *             id: int,
	 *             text: array{en: string, ka: string},
	 *             imageUrl: string|null,
	 *             commentCount: int,
	 *             likeCount: int
	 *         }>
	 *     }
	 * }
	 */
	public function pageProps(Movie $movie): array
	{
		$movie->load([
			'genres',
			'media',
			'quotes' => static fn ($query) => $query
				->with('media')
				->withCount(['comments', 'likes'])
				->latest(),
		]);

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
				'quoteCount' => $movie->quotes->count(),
				'quotes'     => array_values($movie->quotes
					->map(static fn (Quote $quote): array => [
						'id'   => $quote->id,
						'text' => [
							'en' => $quote->text_en,
							'ka' => $quote->text_ka,
						],
						'imageUrl'     => $quote->getFirstMediaUrl(Quote::IMAGE_COLLECTION) ?: null,
						'commentCount' => (int) $quote->comments_count,
						'likeCount'    => (int) $quote->likes_count,
					])
					->all()),
			],
		];
	}
}
