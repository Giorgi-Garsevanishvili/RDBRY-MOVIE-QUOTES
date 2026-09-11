<?php

namespace App\Http\Requests\Quotes;

use App\Models\Quote;

class UpdateQuoteRequest extends QuoteRequest
{
	public function authorize(): bool
	{
		$quote = $this->route('quote');

		return $quote instanceof Quote && $this->user()?->can('update', $quote) === true;
	}

	/** @return array<int, string> */
	protected function imageRules(): array
	{
		return [
			'sometimes',
			'nullable',
			'file',
			'image',
			'mimetypes:image/jpeg,image/png,image/webp',
			'extensions:jpg,jpeg,png,webp',
			'max:10240',
		];
	}
}
