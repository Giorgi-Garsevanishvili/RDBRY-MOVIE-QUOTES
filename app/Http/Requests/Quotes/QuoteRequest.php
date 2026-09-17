<?php

namespace App\Http\Requests\Quotes;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

abstract class QuoteRequest extends FormRequest
{
	private const ENGLISH_SCRIPT_PATTERN = '/\A(?=[\s\S]*\p{Latin})[\p{Latin}\p{N}\p{P}\p{S}\s]+\z/u';

	private const GEORGIAN_SCRIPT_PATTERN = '/\A(?=[\s\S]*\p{Georgian})[\p{Georgian}\p{N}\p{P}\p{S}\s]+\z/u';

	/**
	 * @return array<string, ValidationRule|array<mixed>|string>
	 */
	public function rules(): array
	{
		$userId = (int) $this->user()?->getAuthIdentifier();

		return [
			'text_en' => [
				'required',
				'string',
				'regex:' . self::ENGLISH_SCRIPT_PATTERN,
			],
			'text_ka' => [
				'required',
				'string',
				'regex:' . self::GEORGIAN_SCRIPT_PATTERN,
			],
			'movie_id' => [
				'required',
				'integer',
				Rule::exists('movies', 'id')->where(
					static fn (Builder $query): Builder => $query->where('user_id', $userId),
				),
			],
			'image' => $this->imageRules(),
		];
	}

	/** @return array{text_en: string, text_ka: string} */
	public function quoteAttributes(): array
	{
		return [
			'text_en' => $this->string('text_en')->toString(),
			'text_ka' => $this->string('text_ka')->toString(),
		];
	}

	public function movieId(): int
	{
		return $this->integer('movie_id');
	}

	/** @return array<string, string> */
	public function messages(): array
	{
		return [
			'text_en.required'  => __('quotes.validation.required'),
			'text_en.string'    => __('quotes.validation.string'),
			'text_en.regex'     => __('quotes.validation.english_script'),
			'text_ka.required'  => __('quotes.validation.required'),
			'text_ka.string'    => __('quotes.validation.string'),
			'text_ka.regex'     => __('quotes.validation.georgian_script'),
			'movie_id.required' => __('quotes.validation.movie_required'),
			'movie_id.integer'  => __('quotes.validation.movie_invalid'),
			'movie_id.exists'   => __('quotes.validation.movie_invalid'),
			'image.required'    => __('quotes.validation.image_required'),
			'image.file'        => __('quotes.validation.image_type'),
			'image.image'       => __('quotes.validation.image_type'),
			'image.mimetypes'   => __('quotes.validation.image_type'),
			'image.extensions'  => __('quotes.validation.image_type'),
			'image.max'         => __('quotes.validation.image_size'),
		];
	}

	/** @return array<string, string> */
	public function attributes(): array
	{
		return [
			'text_en'  => __('quotes.fields.text_en'),
			'text_ka'  => __('quotes.fields.text_ka'),
			'movie_id' => __('quotes.fields.movie'),
			'image'    => __('quotes.fields.image'),
		];
	}

	/** @return array<int, string> */
	abstract protected function imageRules(): array;
}
