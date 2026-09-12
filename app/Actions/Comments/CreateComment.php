<?php

namespace App\Actions\Comments;

use App\Models\Comment;
use App\Models\Quote;
use App\Models\User;
use App\Notifications\QuoteCommented;

class CreateComment
{
	public function handle(User $author, Quote $quote, string $body): Comment
	{
		$comment = $author->comments()->create([
			'quote_id' => $quote->id,
			'body'     => $body,
		]);

		if ($author->id !== $quote->user_id)
		{
			$quote->user->notify(new QuoteCommented($author, $quote));
		}

		return $comment;
	}
}
