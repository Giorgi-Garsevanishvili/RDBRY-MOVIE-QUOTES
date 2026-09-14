<?php

namespace App\Support\Auth;

use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Socialite\Contracts\User as GoogleUser;

final class GoogleUsernameGenerator
{
	private const int MAX_LENGTH = 15;

	private const int MIN_LENGTH = 3;

	public function fromGoogle(GoogleUser $googleUser, string $googleId, string $email): string
	{
		$source = $googleUser->getNickname()
			?? $googleUser->getName()
			?? Str::before($email, '@');

		return $this->unique($this->normalize($source, $googleId));
	}

	private function normalize(string $source, string $fallbackSeed): string
	{
		$base = Str::of($source)
			->ascii()
			->lower()
			->replaceMatches('/[^a-z0-9]/', '')
			->substr(0, self::MAX_LENGTH)
			->toString();

		return strlen($base) >= self::MIN_LENGTH
			? $base
			: 'user' . substr(hash('sha256', $fallbackSeed), 0, 8);
	}

	private function unique(string $base): string
	{
		$candidate = $base;
		$suffix = 1;

		while (User::query()->where('username', $candidate)->exists())
		{
			$suffixValue = (string) $suffix++;
			$candidate = substr($base, 0, self::MAX_LENGTH - strlen($suffixValue)) . $suffixValue;
		}

		return $candidate;
	}
}
