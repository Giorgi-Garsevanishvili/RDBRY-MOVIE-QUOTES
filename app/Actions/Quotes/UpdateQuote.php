<?php

namespace App\Actions\Quotes;

use App\Models\Movie;
use App\Models\Quote;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class UpdateQuote
{
	/** @param array{text_en: string, text_ka: string} $attributes */
	public function handle(Quote $quote, int $movieId, array $attributes, ?UploadedFile $image): Quote
	{
		return DB::transaction(function () use ($quote, $movieId, $attributes, $image): Quote {
			$movie = Movie::query()
				->whereKey($movieId)
				->where('user_id', $quote->user_id)
				->firstOrFail();

			$quote->update([
				...$attributes,
				'movie_id' => $movie->id,
			]);

			if ($image instanceof UploadedFile)
			{
				$quote->addMedia($image)->toMediaCollection(Quote::IMAGE_COLLECTION);
			}

			return $quote->refresh()->load(['movie', 'media']);
		});
	}
}
