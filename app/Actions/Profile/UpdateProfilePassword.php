<?php

namespace App\Actions\Profile;

use App\Models\User;

class UpdateProfilePassword
{
	public function handle(User $user, string $password): void
	{
		$user->update(['password' => $password]);
	}
}
