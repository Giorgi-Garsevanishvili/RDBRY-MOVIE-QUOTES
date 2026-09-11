<?php

namespace App\Actions\Movies;

use App\Models\Movie;
use App\Models\Quote;
use Illuminate\Support\Facades\DB;

class DeleteMovie
{
	public function handle(Movie $movie): void
	{
		DB::transaction(static function () use ($movie): void {
			$movie->quotes()->eachById(static function (Quote $quote): void {
				$quote->deleteOrFail();
			});

			$movie->deleteOrFail();
		});
	}
}
