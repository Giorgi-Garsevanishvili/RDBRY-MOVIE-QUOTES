<?php

namespace App\Actions\Profile;

use App\Models\User;
use App\Notifications\VerifyNewEmail;
use Illuminate\Support\Facades\Notification;

class RequestEmailChange
{
	public function handle(User $user, string $email): void
	{
		$user->update(['pending_email' => $email]);

		Notification::route('mail', $email)
			->notify((new VerifyNewEmail($user->id, $email))->locale(app()->getLocale()));
	}
}
