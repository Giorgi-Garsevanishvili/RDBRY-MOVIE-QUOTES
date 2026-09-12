<?php

namespace App\Actions\Notifications;

use App\Models\User;

class MarkAllNotificationsAsRead
{
	public function handle(User $user): void
	{
		$user->unreadNotifications()->update(['read_at' => now()]);
	}
}
