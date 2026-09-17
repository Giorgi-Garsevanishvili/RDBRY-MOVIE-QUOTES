<?php

namespace App\Http\Requests\Quotes;

use App\Models\User;

class StoreQuoteRequest extends QuoteRequest
{
	public function authorize(): bool
	{
		return $this->user() instanceof User;
	}

	/** @return array<int, string> */
	protected function imageRules(): array
	{
		return [
			'required',
			'file',
			'image',
			'mimetypes:image/jpeg,image/png,image/webp',
			'extensions:jpg,jpeg,png,webp',
			'max:10240',
		];
	}
}
