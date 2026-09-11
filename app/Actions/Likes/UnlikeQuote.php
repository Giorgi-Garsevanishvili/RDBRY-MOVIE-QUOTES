<?php

namespace App\Actions\Likes;

use App\Models\Quote;
use App\Models\User;

class UnlikeQuote
{
	public function handle(User $user, Quote $quote): void
	{
		$user->likes()
			->where('quote_id', $quote->id)
			->delete();
	}
}
