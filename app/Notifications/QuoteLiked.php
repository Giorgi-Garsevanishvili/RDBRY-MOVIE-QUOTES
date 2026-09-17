<?php

namespace App\Notifications;

class QuoteLiked extends QuoteInteractionNotification
{
	protected function interactionType(): string
	{
		return 'quote_liked';
	}
}
