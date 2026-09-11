<?php

namespace App\Actions\Likes;

use App\Models\Like;
use App\Models\Quote;
use App\Models\User;

class LikeQuote
{
	public function handle(User $user, Quote $quote): Like
	{
		return $user->likes()->createOrFirst([
			'quote_id' => $quote->id,
		]);
	}
}
