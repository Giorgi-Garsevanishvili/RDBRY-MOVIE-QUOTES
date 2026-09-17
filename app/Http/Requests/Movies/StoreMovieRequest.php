<?php

namespace App\Http\Requests\Movies;

use App\Models\User;

class StoreMovieRequest extends MovieRequest
{
	public function authorize(): bool
	{
		return $this->user() instanceof User;
	}

	/** @return array<int, string> */
	protected function posterRules(): array
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
