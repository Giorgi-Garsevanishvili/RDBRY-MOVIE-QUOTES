<?php

namespace App\Actions\Quotes;

use App\Models\Quote;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class CreateQuote
{
	/** @param array{text_en: string, text_ka: string} $attributes */
	public function handle(User $author, int $movieId, array $attributes, UploadedFile $image): Quote
	{
		return DB::transaction(function () use ($author, $movieId, $attributes, $image): Quote {
			$movie = $author->movies()->findOrFail($movieId);
			$quote = $author->quotes()->create([
				...$attributes,
				'movie_id' => $movie->id,
			]);

			$quote->addMedia($image)->toMediaCollection(Quote::IMAGE_COLLECTION);

			return $quote->load(['movie', 'media']);
		});
	}
}
