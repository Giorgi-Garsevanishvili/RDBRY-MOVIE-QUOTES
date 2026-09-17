<?php

namespace App\Http\Requests\Auth;

use Laravel\Fortify\Http\Requests\LoginRequest as FortifyLoginRequest;

class LoginRequest extends FortifyLoginRequest
{
	/**
	 * @return array<string, array<int, string>>
	 */
	public function rules(): array
	{
		return [
			'login'    => ['required', 'string', 'min:3', 'max:255'],
			'password' => ['required', 'string'],
			'remember' => ['sometimes'],
		];
	}

	/**
	 * @return array<string, string>
	 */
	public function messages(): array
	{
		return [
			'login.required'    => __('auth.validation.login_required'),
			'login.min'         => __('auth.validation.login_min'),
			'password.required' => __('auth.validation.login_password_required'),
		];
	}
}
