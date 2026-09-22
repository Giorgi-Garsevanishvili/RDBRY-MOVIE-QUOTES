<?php

namespace App\Events;

use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class QuoteInteractionsUpdated implements ShouldBroadcast
{
	use Dispatchable;

	public const BROADCAST_NAME = 'quote.interactions.updated';

	/**
	 * @param array{id: int, body: string, author: array{id: int, username: string, avatar: string|null}}|null $comment
	 */
	public function __construct(
		public readonly int $quoteId,
		public readonly int $actorId,
		public readonly int $commentCount,
		public readonly int $likeCount,
		public readonly ?array $comment = null,
		public readonly ?bool $likedByActor = null,
	) {
	}

	/** @return list<PrivateChannel> */
	public function broadcastOn(): array
	{
		return [new PrivateChannel('quotes.interactions')];
	}

	public function broadcastAs(): string
	{
		return self::BROADCAST_NAME;
	}

	/**
	 * @return array{
	 *     quoteId: int,
	 *     actorId: int,
	 *     commentCount: int,
	 *     likeCount: int,
	 *     comment: array{id: int, body: string, author: array{id: int, username: string, avatar: string|null}}|null,
	 *     likedByActor: bool|null
	 * }
	 */
	public function broadcastWith(): array
	{
		return [
			'quoteId'        => $this->quoteId,
			'actorId'        => $this->actorId,
			'commentCount'   => $this->commentCount,
			'likeCount'      => $this->likeCount,
			'comment'        => $this->comment,
			'likedByActor'   => $this->likedByActor,
		];
	}
}
