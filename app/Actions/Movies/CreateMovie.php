<?php

namespace App\Actions\Movies;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class CreateMovie
{
	/**
	 * @param array{name_en: string, name_ka: string, director_en: string, director_ka: string, description_en: string, description_ka: string, release_year: int} $attributes
	 * @param list<int>                                                                                                                                            $genreIds
	 */
	public function handle(User $owner, array $attributes, array $genreIds, UploadedFile $poster): Movie
	{
		return DB::transaction(function () use ($owner, $attributes, $genreIds, $poster): Movie {
			$movie = $owner->movies()->create($attributes);

			$movie->genres()->sync($genreIds);
			$movie->addMedia($poster)->toMediaCollection(Movie::POSTER_COLLECTION);

			return $movie->load(['genres', 'media']);
		});
	}
}
