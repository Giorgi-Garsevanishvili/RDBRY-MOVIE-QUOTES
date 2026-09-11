<?php

namespace App\Http\Requests\Quotes;

use App\Models\Quote;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
	public function authorize(): bool
	{
		$quote = $this->route('quote');

		return $quote instanceof Quote && $this->user()?->can('comment', $quote) === true;
	}

	/** @return array<string, ValidationRule|array<mixed>|string> */
	public function rules(): array
	{
		return [
			'body' => ['required', 'string'],
		];
	}

	public function body(): string
	{
		return $this->string('body')->toString();
	}

	/** @return array<string, string> */
	public function messages(): array
	{
		return [
			'body.required' => __('comments.validation.required'),
			'body.string'   => __('comments.validation.string'),
		];
	}

	/** @return array<string, string> */
	public function attributes(): array
	{
		return [
			'body' => __('comments.fields.body'),
		];
	}
}
