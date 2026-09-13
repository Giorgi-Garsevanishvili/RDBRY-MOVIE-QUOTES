<?php

namespace App\Http\Requests\Settings;

use App\Concerns\PasswordValidationRules;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PasswordUpdateRequest extends FormRequest
{
	use PasswordValidationRules;

	public function authorize(): bool
	{
		return $this->user()?->password !== null;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		return [
			'current_password' => $this->currentPasswordRules(),
			'password'         => [
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

	/** @return array<string, string> */
	public function messages(): array
	{
		return [
			'current_password.required'          => __('profile.validation.current_password_required'),
			'current_password.current_password'  => __('profile.validation.current_password'),
			'password.required'                  => __('profile.validation.password_required'),
			'password.min'                       => __('profile.validation.password_min'),
			'password.max'                       => __('profile.validation.password_max'),
			'password.regex'                     => __('profile.validation.password_format'),
			'password.confirmed'                 => __('profile.validation.password_confirmation'),
			'password_confirmation.required'     => __('profile.validation.password_confirmation_required'),
		];
	}
}
