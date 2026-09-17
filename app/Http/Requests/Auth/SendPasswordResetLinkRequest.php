<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Http\Requests\SendPasswordResetLinkRequest as FortifyRequest;

class SendPasswordResetLinkRequest extends FortifyRequest
{
	/**
	 * @return array<string, ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		return [
			'email' => [
				'required',
				'string',
				'email',
				Rule::exists(User::class, 'email')->whereNotNull('password'),
			],
		];
	}

	/**
	 * @return array<string, string>
	 */
	public function messages(): array
	{
		return [
			'email.required' => __('auth.validation.email_required'),
			'email.email'    => __('auth.validation.email_format'),
			'email.exists'   => __('auth.validation.email_registered'),
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
