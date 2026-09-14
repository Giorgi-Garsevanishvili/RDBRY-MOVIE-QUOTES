<?php

namespace App\Actions\Auth;

use App\Models\User;
use App\Support\Auth\GoogleUsernameGenerator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Socialite\Contracts\User as GoogleUser;
use UnexpectedValueException;

final readonly class AuthenticateGoogleUser
{
	public function __construct(private GoogleUsernameGenerator $usernames)
	{
	}

	public function handle(GoogleUser $googleUser): User
	{
		$googleId = $this->googleId($googleUser);
		$email = $this->email($googleUser);

		return DB::transaction(
			fn (): User => $this->resolveUser($googleUser, $googleId, $email),
		);
	}

	private function googleId(GoogleUser $googleUser): string
	{
		$googleId = trim((string) $googleUser->getId());

		if ($googleId === '')
		{
			throw new UnexpectedValueException('Google did not provide a valid identity.');
		}

		return $googleId;
	}

	private function email(GoogleUser $googleUser): string
	{
		$email = Str::lower(trim((string) $googleUser->getEmail()));

		if (!filter_var($email, FILTER_VALIDATE_EMAIL))
		{
			throw new UnexpectedValueException('Google did not provide a valid identity.');
		}

		return $email;
	}

	private function resolveUser(GoogleUser $googleUser, string $googleId, string $email): User
	{
		$user = User::query()->where('google_id', $googleId)->first();

		if ($user !== null)
		{
			return $this->verify($user);
		}

		$user = User::query()->where('email', $email)->first();

		return $user === null
			? $this->createUser($googleUser, $googleId, $email)
			: $this->linkUser($user, $googleId);
	}

	private function verify(User $user): User
	{
		if ($user->email_verified_at === null)
		{
			$user->forceFill(['email_verified_at' => now()])->save();
		}

		return $user;
	}

	private function linkUser(User $user, string $googleId): User
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

	private function createUser(GoogleUser $googleUser, string $googleId, string $email): User
	{
		return User::query()->create([
			'username'          => $this->usernames->fromGoogle($googleUser, $googleId, $email),
			'email'             => $email,
			'google_id'         => $googleId,
			'email_verified_at' => now(),
			'password'          => null,
		]);
	}
}
