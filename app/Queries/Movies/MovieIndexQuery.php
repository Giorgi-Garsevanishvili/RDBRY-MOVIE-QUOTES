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
}
