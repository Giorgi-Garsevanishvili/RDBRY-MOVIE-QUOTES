<?php

namespace App\Actions\Profile;

use App\Models\User;

class UpdateProfileUsername
{
	public function handle(User $user, string $username): void
	{
		$user->update(['username' => $username]);
	}
}
