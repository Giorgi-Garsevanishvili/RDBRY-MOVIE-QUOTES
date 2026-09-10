<?php

namespace App\Actions\Movies;

use App\Models\Movie;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class UpdateMovie
{
	/**
	 * @param array{name_en: string, name_ka: string, director_en: string, director_ka: string, description_en: string, description_ka: string, release_year: int} $attributes
	 * @param list<int>                                                                                                                                            $genreIds
	 */
	public function handle(Movie $movie, array $attributes, array $genreIds, ?UploadedFile $poster): Movie
	{
		return DB::transaction(function () use ($movie, $attributes, $genreIds, $poster): Movie {
			$movie->update($attributes);
			$movie->genres()->sync($genreIds);

			if ($poster instanceof UploadedFile)
			{
				$movie->addMedia($poster)->toMediaCollection(Movie::POSTER_COLLECTION);
			}

			return $movie->refresh()->load(['genres', 'media']);
		});
	}
}
