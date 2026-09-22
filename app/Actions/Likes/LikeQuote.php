<?php

namespace App\Actions\Likes;

use App\Events\QuoteInteractionsUpdated;
use App\Models\Like;
use App\Models\Quote;
use App\Models\User;
use App\Notifications\QuoteLiked;

class LikeQuote
{
	public function handle(User $user, Quote $quote): Like
	{
		$like = $user->likes()->createOrFirst([
			'quote_id' => $quote->id,
		]);

		if (!$like->wasRecentlyCreated)
		{
			return $like;
		}

		if ($user->id !== $quote->user_id)
		{
			$quote->user->notify(new QuoteLiked($user, $quote));
		}

		QuoteInteractionsUpdated::dispatch(
			quoteId: $quote->id,
			actorId: $user->id,
			commentCount: $quote->comments()->whereHas('user')->count(),
			likeCount: $quote->likes()->count(),
			likedByActor: true,
		);

		return $like;
	}
}
