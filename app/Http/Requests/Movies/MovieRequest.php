<?php

namespace App\Http\Requests\Movies;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

abstract class MovieRequest extends FormRequest
{
	private const ENGLISH_SCRIPT_PATTERN = '/\A(?=[\s\S]*\p{Latin})[\p{Latin}\p{N}\p{P}\p{S}\s]+\z/u';

	private const GEORGIAN_SCRIPT_PATTERN = '/\A(?=[\s\S]*\p{Georgian})[\p{Georgian}\p{N}\p{P}\p{S}\s]+\z/u';

	/**
	 * @return array<string, ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		return [
			'name_en' => [
				'required',
				'string',
				'max:255',
				'regex:' . self::ENGLISH_SCRIPT_PATTERN,
			],
			'name_ka' => [
				'required',
				'string',
				'max:255',
				'regex:' . self::GEORGIAN_SCRIPT_PATTERN,
			],
			'director_en' => [
				'required',
				'string',
				'max:255',
				'regex:' . self::ENGLISH_SCRIPT_PATTERN,
			],
			'director_ka' => [
				'required',
				'string',
				'max:255',
				'regex:' . self::GEORGIAN_SCRIPT_PATTERN,
			],
			'description_en' => [
				'required',
				'string',
				'max:2000',
				'regex:' . self::ENGLISH_SCRIPT_PATTERN,
			],
			'description_ka' => [
				'required',
				'string',
				'max:2000',
				'regex:' . self::GEORGIAN_SCRIPT_PATTERN,
			],
			'release_year' => [
				'required',
				'integer',
				'min:1888',
				'max:' . date('Y'),
			],
			'genres'   => ['required', 'array', 'min:1'],
			'genres.*' => ['required', 'integer', 'distinct', 'exists:genres,id'],
			'poster'   => $this->posterRules(),
		];
	}

	/**
	 * @return array{name_en: string, name_ka: string, director_en: string, director_ka: string, description_en: string, description_ka: string, release_year: int}
	 */
	public function movieAttributes(): array
	{
		return [
			'name_en'        => $this->string('name_en')->toString(),
			'name_ka'        => $this->string('name_ka')->toString(),
			'director_en'    => $this->string('director_en')->toString(),
			'director_ka'    => $this->string('director_ka')->toString(),
			'description_en' => $this->string('description_en')->toString(),
			'description_ka' => $this->string('description_ka')->toString(),
			'release_year'   => $this->integer('release_year'),
		];
	}

	/** @return list<int> */
	public function genreIds(): array
	{
		$genreIds = $this->validated('genres');

		if (!is_array($genreIds))
		{
			return [];
		}

		return array_values(array_map(
			static fn (mixed $genreId): int => (int) $genreId,
			$genreIds,
		));
	}

	/** @return array<string, string> */
	public function messages(): array
	{
		return [
			'name_en.required'        => __('movies.validation.required'),
			'name_en.string'          => __('movies.validation.string'),
			'name_en.max'             => __('movies.validation.max_string'),
			'name_en.regex'           => __('movies.validation.english_script'),
			'name_ka.required'        => __('movies.validation.required'),
			'name_ka.string'          => __('movies.validation.string'),
			'name_ka.max'             => __('movies.validation.max_string'),
			'name_ka.regex'           => __('movies.validation.georgian_script'),
			'director_en.required'    => __('movies.validation.required'),
			'director_en.string'      => __('movies.validation.string'),
			'director_en.max'         => __('movies.validation.max_string'),
			'director_en.regex'       => __('movies.validation.english_script'),
			'director_ka.required'    => __('movies.validation.required'),
			'director_ka.string'      => __('movies.validation.string'),
			'director_ka.max'         => __('movies.validation.max_string'),
			'director_ka.regex'       => __('movies.validation.georgian_script'),
			'description_en.required' => __('movies.validation.required'),
			'description_en.string'   => __('movies.validation.string'),
			'description_en.max'      => __('movies.validation.max_string'),
			'description_en.regex'    => __('movies.validation.english_script'),
			'description_ka.required' => __('movies.validation.required'),
			'description_ka.string'   => __('movies.validation.string'),
			'description_ka.max'      => __('movies.validation.max_string'),
			'description_ka.regex'    => __('movies.validation.georgian_script'),
			'release_year.required'   => __('movies.validation.required'),
			'release_year.integer'    => __('movies.validation.integer'),
			'release_year.min'        => __('movies.validation.year_range'),
			'release_year.max'        => __('movies.validation.year_range'),
			'genres.required'         => __('movies.validation.genres_required'),
			'genres.array'            => __('movies.validation.genres_array'),
			'genres.min'              => __('movies.validation.genres_required'),
			'genres.*.required'       => __('movies.validation.genre_invalid'),
			'genres.*.integer'        => __('movies.validation.genre_invalid'),
			'genres.*.distinct'       => __('movies.validation.genre_distinct'),
			'genres.*.exists'         => __('movies.validation.genre_invalid'),
			'poster.required'         => __('movies.validation.poster_required'),
			'poster.file'             => __('movies.validation.poster_type'),
			'poster.image'            => __('movies.validation.poster_type'),
			'poster.mimetypes'        => __('movies.validation.poster_type'),
			'poster.extensions'       => __('movies.validation.poster_type'),
			'poster.max'              => __('movies.validation.poster_size'),
		];
	}

	/** @return array<string, string> */
	public function attributes(): array
	{
		return [
			'name_en'        => __('movies.fields.name_en'),
			'name_ka'        => __('movies.fields.name_ka'),
			'director_en'    => __('movies.fields.director_en'),
			'director_ka'    => __('movies.fields.director_ka'),
			'description_en' => __('movies.fields.description_en'),
			'description_ka' => __('movies.fields.description_ka'),
			'release_year'   => __('movies.fields.release_year'),
			'genres'         => __('movies.fields.genres'),
			'genres.*'       => __('movies.fields.genre'),
			'poster'         => __('movies.fields.poster'),
		];
	}

	/** @return array<int, string> */
	abstract protected function posterRules(): array;
}
