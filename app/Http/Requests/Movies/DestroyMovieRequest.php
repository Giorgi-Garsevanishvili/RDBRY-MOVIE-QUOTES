<?php

namespace App\Http\Requests\Movies;

use App\Models\Movie;
use Illuminate\Foundation\Http\FormRequest;

class DestroyMovieRequest extends FormRequest
{
	public function authorize(): bool
	{
		$movie = $this->route('movie');

		return $movie instanceof Movie && $this->user()?->can('delete', $movie) === true;
	}

	/** @return array<string, never> */
	public function rules(): array
	{
		return [];
	}
}
