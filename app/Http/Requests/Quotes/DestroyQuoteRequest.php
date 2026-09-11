<?php

namespace App\Http\Requests\Quotes;

use App\Models\Quote;
use Illuminate\Foundation\Http\FormRequest;

class DestroyQuoteRequest extends FormRequest
{
	public function authorize(): bool
	{
		$quote = $this->route('quote');

		return $quote instanceof Quote && $this->user()?->can('delete', $quote) === true;
	}

	/** @return array<string, never> */
	public function rules(): array
	{
		return [];
	}
}
