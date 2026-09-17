<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel(
	'App.Models.User.{id}',
	static fn (User $user, int $id): bool => $user->id === $id && $user->hasVerifiedEmail(),
);
