<?php

namespace App\Actions\Comments;

use App\Events\QuoteInteractionsUpdated;
use App\Http\Resources\CommentResource;
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

		$comment->load('user.media');

		/** @var array{id: int, body: string, author: array{id: int, username: string, avatar: string|null}} $commentData */
		$commentData = (new CommentResource($comment))->resolve();

		QuoteInteractionsUpdated::dispatch(
			quoteId: $quote->id,
			actorId: $author->id,
			commentCount: $quote->comments()->whereHas('user')->count(),
			likeCount: $quote->likes()->count(),
			comment: $commentData,
		);

		return $comment;
	}
}
