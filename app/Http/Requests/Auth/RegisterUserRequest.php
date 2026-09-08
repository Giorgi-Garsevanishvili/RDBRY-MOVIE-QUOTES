<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class RegisterUserRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * @return array<string, ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		return [
			'username' => [
				'required',
				'string',
				'min:3',
				'max:15',
				'regex:/\A[a-z0-9]+\z/',
				Rule::unique(User::class, 'username'),
			],
			'email' => [
				'required',
				'string',
				'email',
				'max:255',
				Rule::unique(User::class, 'email'),
			],
			'password' => [
				'required',
				'string',
				'min:8',
				'max:15',
				'regex:/\A[a-z0-9]+\z/',
				'confirmed',
			],
			'password_confirmation' => ['required', 'string'],
		];
	}

	/**
	 * @return array<string, string>
	 */
	public function messages(): array
	{
		return [
			'username.required'              => __('auth.validation.username_required'),
			'username.min'                   => __('auth.validation.username_min'),
			'username.max'                   => __('auth.validation.username_max'),
			'username.regex'                 => __('auth.validation.username_format'),
			'username.unique'                => __('auth.validation.username_unique'),
			'email.required'                 => __('auth.validation.email_required'),
			'email.email'                    => __('auth.validation.email_format'),
			'email.unique'                   => __('auth.validation.email_unique'),
			'password.required'              => __('auth.validation.password_required'),
			'password.min'                   => __('auth.validation.password_min'),
			'password.max'                   => __('auth.validation.password_max'),
			'password.regex'                 => __('auth.validation.password_format'),
			'password.confirmed'             => __('auth.validation.password_confirmation'),
			'password_confirmation.required' => __('auth.validation.password_confirmation_required'),
		];
	}

	protected function prepareForValidation(): void
	{
		if ($this->has('email'))
		{
			$this->merge([
				'email' => Str::lower(trim((string) $this->input('email'))),
			]);
		}
	}
}
