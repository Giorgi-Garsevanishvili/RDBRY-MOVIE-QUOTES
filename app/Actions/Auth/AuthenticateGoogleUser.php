<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Socialite\Contracts\User as GoogleUser;
use UnexpectedValueException;

class AuthenticateGoogleUser
{
	public function handle(GoogleUser $googleUser): User
	{
		$googleId = trim((string) $googleUser->getId());
		$email = Str::lower(trim((string) $googleUser->getEmail()));

		if ($googleId === '' || !filter_var($email, FILTER_VALIDATE_EMAIL))
		{
			throw new UnexpectedValueException('Google did not provide a valid identity.');
		}

		return DB::transaction(function () use ($googleUser, $googleId, $email): User {
			$user = User::query()->where('google_id', $googleId)->first();

			if ($user !== null)
			{
				if ($user->email_verified_at === null)
				{
					$user->forceFill(['email_verified_at' => now()])->save();
				}

				return $user;
			}

			$user = User::query()->where('email', $email)->first();

			if ($user !== null)
			{
				if ($user->google_id !== null && !hash_equals($user->google_id, $googleId))
				{
					throw new UnexpectedValueException('The email belongs to another Google identity.');
				}

				$user->forceFill([
					'google_id'         => $googleId,
					'email_verified_at' => $user->email_verified_at ?? now(),
				])->save();

				return $user;
			}

			return User::query()->create([
				'username'          => $this->uniqueUsername($googleUser, $googleId, $email),
				'email'             => $email,
				'google_id'         => $googleId,
				'email_verified_at' => now(),
				'password'          => null,
			]);
		});
	}

	private function uniqueUsername(GoogleUser $googleUser, string $googleId, string $email): string
	{
		$source = $googleUser->getNickname()
			?? $googleUser->getName()
			?? Str::before($email, '@');
		$base = Str::of($source)
			->ascii()
			->lower()
			->replaceMatches('/[^a-z0-9]/', '')
			->substr(0, 15)
			->toString();

		if (strlen($base) < 3)
		{
			$base = 'user' . substr(hash('sha256', $googleId), 0, 8);
		}

		$candidate = $base;
		$suffix = 1;

		while (User::query()->where('username', $candidate)->exists())
		{
			$suffixValue = (string) $suffix;
			$candidate = substr($base, 0, 15 - strlen($suffixValue)) . $suffixValue;
			$suffix++;
		}

		return $candidate;
	}
}
