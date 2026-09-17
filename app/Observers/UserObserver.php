<?php

namespace App\Observers;

use App\Actions\Users\DeleteUserContent;
use App\Models\User;

final readonly class UserObserver
{
	public function __construct(private DeleteUserContent $deleteUserContent)
	{
	}

	public function deleting(User $user): void
	{
		$this->deleteUserContent->handle($user);
	}
}
