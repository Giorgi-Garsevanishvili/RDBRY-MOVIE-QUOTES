<?php

namespace App\Queries\Movies;

use App\Models\Genre;

class MovieFormOptionsQuery
{
	/**
	 * @return array{genres: list<array{id: int, name: array{en: string, ka: string}}>}
	 */
	public function pageProps(): array
	{
		$genres = Genre::query()
			->orderBy('name_en')
			->get(['id', 'name_en', 'name_ka']);

		return [
			'genres' => array_values($genres
				->map(static fn (Genre $genre): array => [
					'id'   => $genre->id,
					'name' => [
						'en' => $genre->name_en,
						'ka' => $genre->name_ka,
					],
				])
				->all()),
		];
	}
}
