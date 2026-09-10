<?php

namespace App\Policies;

use App\Models\Movie;
use App\Models\User;

class MoviePolicy
{
	public function viewAny(User $user): bool
	{
		return true;
	}

	public function view(User $user, Movie $movie): bool
	{
		return $this->owns($user, $movie);
	}

	public function create(User $user): bool
	{
		return true;
	}

	public function update(User $user, Movie $movie): bool
	{
		return $this->owns($user, $movie);
	}

	public function delete(User $user, Movie $movie): bool
	{
		return $this->owns($user, $movie);
	}

	private function owns(User $user, Movie $movie): bool
	{
		return $user->id === $movie->user_id;
	}
}
