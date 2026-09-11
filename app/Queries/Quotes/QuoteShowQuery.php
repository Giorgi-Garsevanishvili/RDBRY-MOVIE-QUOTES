<?php

namespace App\Queries\Quotes;

use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;

class QuoteShowQuery
{
	/**
	 * @return array{
	 *     quote: array{
	 *         id: int,
	 *         text: array{en: string, ka: string},
	 *         imageUrl: string|null,
	 *         author: array{id: int, username: string},
	 *         movie: array{
	 *             id: int,
	 *             name: array{en: string, ka: string},
	 *             releaseYear: int,
	 *             posterUrl: string|null
	 *         },
	 *         commentCount: int,
	 *         likeCount: int,
	 *         canManage: bool
	 *     }
	 * }
	 */
	public function pageProps(Quote $quote, User $viewer): array
	{
		$quote->load(['media', 'movie.media', 'user']);
		$movie = $quote->movie;

		return [
			'quote' => [
				'id'   => $quote->id,
				'text' => [
					'en' => $quote->text_en,
					'ka' => $quote->text_ka,
				],
				'imageUrl' => $quote->getFirstMediaUrl(Quote::IMAGE_COLLECTION) ?: null,
				'author'   => [
					'id'       => $quote->user->id,
					'username' => $quote->user->username,
				],
				'movie'        => $this->movieData($movie),
				'commentCount' => 0,
				'likeCount'    => 0,
				'canManage'    => $viewer->can('update', $quote),
			],
		];
	}

	/**
	 * @return array{
	 *     id: int,
	 *     name: array{en: string, ka: string},
	 *     releaseYear: int,
	 *     posterUrl: string|null
	 * }
	 */
	private function movieData(Movie $movie): array
	{
		return [
			'id'   => $movie->id,
			'name' => [
				'en' => $movie->name_en,
				'ka' => $movie->name_ka,
			],
			'releaseYear' => $movie->release_year,
			'posterUrl'   => $movie->getFirstMediaUrl(Movie::POSTER_COLLECTION) ?: null,
		];
	}
}
