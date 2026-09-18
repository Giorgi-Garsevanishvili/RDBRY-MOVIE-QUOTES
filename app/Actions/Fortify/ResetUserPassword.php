<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Contracts\ResetsUserPasswords;

class ResetUserPassword implements ResetsUserPasswords
{
	/**
	 * Validate and reset the user's forgotten password.
	 *
	 * @param array<string, string> $input
	 */
	public function reset(User $user, array $input): void
	{
		if ($user->password === null)
		{
			throw ValidationException::withMessages([
				'email' => __('auth.validation.email_registered'),
			]);
		}

		Validator::make($input, [
			'password' => [
				'required',
				'string',
				'min:8',
				'max:15',
				'regex:/\A[a-z0-9]+\z/',
				'confirmed',
			],
			'password_confirmation' => ['required', 'string'],
		], [
			'password.required'              => __('auth.validation.password_required'),
			'password.min'                   => __('auth.validation.password_min'),
			'password.max'                   => __('auth.validation.password_max'),
			'password.regex'                 => __('auth.validation.password_format'),
			'password.confirmed'             => __('auth.validation.password_confirmation'),
			'password_confirmation.required' => __('auth.validation.password_confirmation_required'),
		])->validate();

		$user->forceFill([
			'password' => $input['password'],
		])->save();
	}
}
