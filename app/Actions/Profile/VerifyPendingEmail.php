<?php

namespace App\Actions\Profile;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class VerifyPendingEmail
{
	public function handle(User $user, string $hash): bool
	{
		return DB::transaction(function () use ($user, $hash): bool {
			$lockedUser = User::query()->lockForUpdate()->findOrFail($user->id);
			$pendingEmail = $lockedUser->pending_email;

			if ($pendingEmail === null || !hash_equals(hash('sha256', $pendingEmail), $hash))
			{
				return false;
			}

			$emailIsTaken = User::query()
				->where('id', '!=', $lockedUser->id)
				->where('email', $pendingEmail)
				->exists();

			if ($emailIsTaken)
			{
				return false;
			}

			$lockedUser->forceFill([
				'email'             => $pendingEmail,
				'pending_email'     => null,
				'email_verified_at' => now(),
			])->save();

			return true;
		});
	}
}
