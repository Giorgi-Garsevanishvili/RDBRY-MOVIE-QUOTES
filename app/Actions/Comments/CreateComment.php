<?php

namespace App\Actions\Comments;

use App\Models\Comment;
use App\Models\Quote;
use App\Models\User;

class CreateComment
{
	public function handle(User $author, Quote $quote, string $body): Comment
	{
		return $author->comments()->create([
			'quote_id' => $quote->id,
			'body'     => $body,
		]);
	}
}
