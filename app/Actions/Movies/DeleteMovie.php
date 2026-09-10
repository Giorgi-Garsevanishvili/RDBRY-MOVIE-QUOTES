<?php

namespace App\Actions\Movies;

use App\Models\Movie;
use Illuminate\Support\Facades\DB;

class DeleteMovie
{
	public function handle(Movie $movie): void
	{
		DB::transaction(static function () use ($movie): void {
			$movie->deleteOrFail();
		});
	}
}
