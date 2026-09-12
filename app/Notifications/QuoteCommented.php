<?php

namespace App\Notifications;

class QuoteCommented extends QuoteInteractionNotification
{
	protected function interactionType(): string
	{
		return 'quote_commented';
	}
}
