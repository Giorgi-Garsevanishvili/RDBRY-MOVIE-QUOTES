<?php

namespace App\Notifications;

use App\Models\Quote;
use App\Models\User;
use App\Notifications\Channels\QuoteDatabaseChannel;
use Illuminate\Notifications\Notification;

abstract class QuoteInteractionNotification extends Notification
{
	public function __construct(
		public readonly User $actor,
		public readonly Quote $quote,
	) {
	}

	/** @return list<class-string|string> */
	public function via(object $notifiable): array
	{
		return [QuoteDatabaseChannel::class, 'broadcast'];
	}

	/** @return array{actor: array{id: int, username: string}, quoteId: int} */
	public function toArray(object $notifiable): array
	{
		return [
			'actor' => [
				'id'       => $this->actor->id,
				'username' => $this->actor->username,
			],
			'quoteId' => $this->quote->id,
		];
	}

	public function databaseType(object $notifiable): string
	{
		return $this->interactionType();
	}

	public function broadcastType(): string
	{
		return $this->interactionType();
	}

	abstract protected function interactionType(): string;
}
