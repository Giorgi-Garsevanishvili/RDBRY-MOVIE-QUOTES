<?php

namespace App\Http\Requests\Settings;

use App\Concerns\PasswordValidationRules;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class EmailChangeRequest extends FormRequest
{
	use PasswordValidationRules;

	public function authorize(): bool
	{
		return $this->user()?->password !== null;
	}

	/** @return array<string, ValidationRule|array<mixed>|string> */
	public function rules(): array
	{
		return [
			'email' => [
				'required',
				'string',
				'email',
				'max:255',
				Rule::notIn([$this->user()->email]),
				Rule::unique(User::class, 'email'),
				Rule::unique(User::class, 'pending_email')->ignore($this->user()->id),
			],
			'current_password' => $this->currentPasswordRules(),
		];
	}

	/** @return array<string, string> */
	public function messages(): array
	{
		return [
			'email.required'                     => __('profile.validation.email_required'),
			'email.email'                        => __('profile.validation.email_format'),
			'email.not_in'                       => __('profile.validation.email_different'),
			'email.unique'                       => __('profile.validation.email_unique'),
			'current_password.required'          => __('profile.validation.current_password_required'),
			'current_password.current_password'  => __('profile.validation.current_password'),
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
