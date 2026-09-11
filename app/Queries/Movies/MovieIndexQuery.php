<?php

namespace App\Queries\Movies;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedInclude;
use Spatie\QueryBuilder\QueryBuilder;

class MovieIndexQuery
{
	/** @return QueryBuilder<Movie> */
	public function build(User $owner, ?Request $request = null): QueryBuilder
	{
		return QueryBuilder::for($owner->movies(), $request)
			->allowedFields(
				'movies.id',
				'movies.user_id',
				'movies.name_en',
				'movies.name_ka',
				'movies.director_en',
				'movies.director_ka',
				'movies.description_en',
				'movies.description_ka',
				'movies.release_year',
				'movies.created_at',
				'movies.updated_at',
				'genres.id',
				'genres.name_en',
				'genres.name_ka',
				'media.id',
				'media.model_type',
				'media.model_id',
				'media.collection_name',
				'media.file_name',
				'media.mime_type',
				'media.disk',
				'media.size',
			)
			->allowedFilters(
				AllowedFilter::custom('search', new FiltersMovieName()),
				AllowedFilter::exact('release_year'),
				AllowedFilter::exact('genre', 'genres.id'),
			)
			->allowedSorts('name_en', 'name_ka', 'release_year', 'created_at')
			->allowedIncludes(
				AllowedInclude::relationship('genres'),
				AllowedInclude::relationship('media'),
			)
			->defaultSort('-created_at');
	}

	/**
	 * @return array{
	 *     movies: list<array{id: int, name: array{en: string, ka: string}, releaseYear: int, posterUrl: string|null, quoteCount: int}>,
	 *     filters: array{search: string}
	 * }
	 */
	public function pageProps(User $owner, Request $request): array
	{
		$movies = $this->build($owner, $request)
			->with('media')
			->withCount('quotes')
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
					'quoteCount'  => $movie->quotes_count,
				])
				->all()),
			'filters' => [
				'search' => $this->searchValue($request),
			],
		];
	}

	private function searchValue(Request $request): string
	{
		$filters = $request->query('filter');

		if (!is_array($filters) || !is_string($filters['search'] ?? null))
		{
			return '';
		}

		return trim($filters['search']);
	}
}
