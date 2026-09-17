<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthenticateUser
{
	public function handle(string $identity, string $password): ?User
	{
		$column = filter_var($identity, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
		$user = User::query()
			->where($column, $identity)
			->whereNotNull('email_verified_at')
			->first();

		if (!$user || $user->password === null || !Hash::check($password, $user->password))
		{
			return null;
		}

		return $user;
	}
}
