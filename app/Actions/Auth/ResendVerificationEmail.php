<?php

namespace App\Actions\Auth;

use App\Models\User;

class ResendVerificationEmail
{
	public function handle(string $email): void
	{
		$user = User::query()->where('email', $email)->first();

		if ($user === null || $user->hasVerifiedEmail())
		{
			return;
		}

		$user->sendEmailVerificationNotification();
	}
}
