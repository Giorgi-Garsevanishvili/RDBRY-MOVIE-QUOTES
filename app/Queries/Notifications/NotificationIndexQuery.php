<?php

namespace App\Queries\Notifications;

use App\Models\QuoteNotification;
use App\Models\User;

class NotificationIndexQuery
{
	/**
	 * @return array{
	 *     items: list<array{
	 *         id: string,
	 *         type: string,
	 *         actor: array{id: int, username: string},
	 *         quoteId: int,
	 *         readAt: string|null,
	 *         createdAt: string
	 *     }>,
	 *     unreadCount: int
	 * }
	 */
	public function pageProps(User $user): array
	{
		$notifications = $user->notifications()
			->with('actor:id,username')
			->get();

		return [
			'items' => array_values($notifications
				->map(static fn (QuoteNotification $notification): array => [
					'id'    => $notification->id,
					'type'  => $notification->type,
					'actor' => [
						'id'       => $notification->actor->id,
						'username' => $notification->actor->username,
					],
					'quoteId'   => $notification->quote_id,
					'readAt'    => $notification->read_at?->toIso8601String(),
					'createdAt' => $notification->created_at?->toIso8601String() ?? '',
				])
				->all()),
			'unreadCount' => $notifications->whereNull('read_at')->count(),
		];
	}
}
