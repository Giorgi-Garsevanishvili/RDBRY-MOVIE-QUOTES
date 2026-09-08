<?php

namespace App\Actions\Auth;

use App\Models\User;

class RegisterUser
{
	public function handle(string $username, string $email, string $password): User
	{
		return User::query()->create([
			'username' => $username,
			'email'    => $email,
			'password' => $password,
		]);
	}
}
