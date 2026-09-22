<?php

namespace App\Actions\Likes;

use App\Events\QuoteInteractionsUpdated;
use App\Models\Quote;
use App\Models\User;

class UnlikeQuote
{
	public function handle(User $user, Quote $quote): void
	{
		$deleted = $user->likes()
			->where('quote_id', $quote->id)
			->delete();

		if ($deleted === 0)
		{
			return;
		}

		QuoteInteractionsUpdated::dispatch(
			quoteId: $quote->id,
			actorId: $user->id,
			commentCount: $quote->comments()->whereHas('user')->count(),
			likeCount: $quote->likes()->count(),
			likedByActor: false,
		);
	}
}
