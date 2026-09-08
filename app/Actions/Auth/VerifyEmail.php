<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Verified;

class VerifyEmail
{
	public function handle(User $user): void
	{
		if ($user->hasVerifiedEmail() || !$user->markEmailAsVerified())
		{
			return;
		}

		event(new Verified($user));
	}
}
