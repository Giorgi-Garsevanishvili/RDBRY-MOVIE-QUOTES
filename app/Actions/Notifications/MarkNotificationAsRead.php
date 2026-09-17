<?php

namespace App\Actions\Notifications;

use App\Models\QuoteNotification;

class MarkNotificationAsRead
{
	public function handle(QuoteNotification $notification): int
	{
		$notification->markAsRead();

		return $notification->quote_id;
	}
}
