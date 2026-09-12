<?php

namespace App\Notifications\Channels;

use App\Notifications\QuoteInteractionNotification;
use Illuminate\Notifications\Channels\DatabaseChannel;
use Illuminate\Notifications\Notification;
use LogicException;

class QuoteDatabaseChannel extends DatabaseChannel
{
	/** @return array<string, mixed> */
	protected function buildPayload(mixed $notifiable, Notification $notification): array
	{
		if (!$notification instanceof QuoteInteractionNotification)
		{
			throw new LogicException('The quote database channel only supports quote interaction notifications.');
		}

		return [
			...parent::buildPayload($notifiable, $notification),
			'actor_id' => $notification->actor->id,
			'quote_id' => $notification->quote->id,
		];
	}
}
