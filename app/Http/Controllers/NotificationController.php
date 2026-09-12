<?php

namespace App\Http\Controllers;

use App\Actions\Notifications\MarkAllNotificationsAsRead;
use App\Actions\Notifications\MarkNotificationAsRead;
use App\Http\Requests\Notifications\ReadAllNotificationsRequest;
use App\Http\Requests\Notifications\ReadNotificationRequest;
use App\Models\QuoteNotification;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class NotificationController extends Controller
{
	public function read(
		ReadNotificationRequest $request,
		QuoteNotification $notification,
		MarkNotificationAsRead $markNotificationAsRead,
	): RedirectResponse {
		$quoteId = $markNotificationAsRead->handle($notification);

		return to_route('quotes.show', ['quote' => $quoteId]);
	}

	public function readAll(
		ReadAllNotificationsRequest $request,
		MarkAllNotificationsAsRead $markAllNotificationsAsRead,
	): RedirectResponse {
		$user = $request->user();
		abort_unless($user instanceof User, 401);

		$markAllNotificationsAsRead->handle($user);

		return back();
	}
}
