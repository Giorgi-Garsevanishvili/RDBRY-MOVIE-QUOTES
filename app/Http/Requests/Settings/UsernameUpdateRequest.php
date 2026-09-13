<?php

namespace App\Http\Requests\Settings;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UsernameUpdateRequest extends FormRequest
{
	use PasswordValidationRules, ProfileValidationRules;

	public function authorize(): bool
	{
		return $this->user() !== null;
	}

	/** @return array<string, ValidationRule|array<mixed>|string> */
	public function rules(): array
	{
		$rules = [
			'username' => $this->usernameRules($this->user()->id),
		];

		if ($this->user()->password !== null)
		{
			$rules['current_password'] = $this->currentPasswordRules();
		}

		return $rules;
	}

	/** @return array<string, string> */
	public function messages(): array
	{
		return [
			'username.required'                 => __('profile.validation.username_required'),
			'username.min'                      => __('profile.validation.username_min'),
			'username.max'                      => __('profile.validation.username_max'),
			'username.regex'                    => __('profile.validation.username_format'),
			'username.unique'                   => __('profile.validation.username_unique'),
			'current_password.required'         => __('profile.validation.current_password_required'),
			'current_password.current_password' => __('profile.validation.current_password'),
		];
	}
}
