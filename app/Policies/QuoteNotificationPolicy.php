<?php

namespace App\Policies;

use App\Models\QuoteNotification;
use App\Models\User;

class QuoteNotificationPolicy
{
	public function update(User $user, QuoteNotification $notification): bool
	{
		return $notification->notifiable_type === User::class
			&& $notification->notifiable_id === $user->id;
	}
}
