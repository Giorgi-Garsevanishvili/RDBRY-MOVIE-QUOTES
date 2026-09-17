<?php

namespace App\Actions\Users;

use App\Actions\Movies\DeleteMovie;
use App\Actions\Quotes\DeleteQuote;
use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;

final readonly class DeleteUserContent
{
	public function __construct(
		private DeleteMovie $deleteMovie,
		private DeleteQuote $deleteQuote,
	) {
	}

	public function handle(User $user): void
	{
		$user->comments()->delete();
		$user->likes()->delete();

		$user->quotes()->eachById(
			function (Quote $quote): void {
				$this->deleteQuote->handle($quote);
			},
		);

		$user->movies()->eachById(
			function (Movie $movie): void {
				$this->deleteMovie->handle($movie);
			},
		);
	}
}
