<?php

namespace App\Policies;

use App\Models\Quote;
use App\Models\User;

class QuotePolicy
{
	public function viewAny(User $user): bool
	{
		return true;
	}

	public function view(User $user, Quote $quote): bool
	{
		return true;
	}

	public function create(User $user): bool
	{
		return true;
	}

	public function comment(User $user, Quote $quote): bool
	{
		return true;
	}

	public function like(User $user, Quote $quote): bool
	{
		return true;
	}

	public function update(User $user, Quote $quote): bool
	{
		return $this->owns($user, $quote);
	}

	public function delete(User $user, Quote $quote): bool
	{
		return $this->owns($user, $quote);
	}

	private function owns(User $user, Quote $quote): bool
	{
		return $user->id === $quote->user_id;
	}
}
