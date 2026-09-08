<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateLocaleRequest extends FormRequest
{
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * @return array<string, array<int, mixed>>
	 */
	public function rules(): array
	{
		return [
			'locale' => [
				'required',
				'string',
				Rule::in(config('app.supported_locales')),
			],
		];
	}

	protected function prepareForValidation(): void
	{
		$this->merge([
			'locale' => $this->route('locale'),
		]);
	}
}
