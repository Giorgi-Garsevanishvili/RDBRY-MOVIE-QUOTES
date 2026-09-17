<?php

namespace App\Http\Requests\Movies;

use App\Models\Movie;

class UpdateMovieRequest extends MovieRequest
{
	public function authorize(): bool
	{
		$movie = $this->route('movie');

		return $movie instanceof Movie && $this->user()?->can('update', $movie) === true;
	}

	/** @return array<int, string> */
	protected function posterRules(): array
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
