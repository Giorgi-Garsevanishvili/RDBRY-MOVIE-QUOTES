<?php

namespace App\Actions\Profile;

use App\Models\User;
use Illuminate\Http\UploadedFile;

class UpdateProfileAvatar
{
	public function handle(User $user, UploadedFile $avatar): void
	{
		$user->addMedia($avatar)->toMediaCollection(User::AVATAR_COLLECTION);
	}
}
