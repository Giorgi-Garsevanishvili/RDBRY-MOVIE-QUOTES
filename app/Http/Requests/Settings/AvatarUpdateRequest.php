<?php

namespace App\Http\Requests\Settings;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;

class AvatarUpdateRequest extends FormRequest
{
	public function authorize(): bool
	{
		return $this->user() !== null;
	}

	/** @return array<string, ValidationRule|array<mixed>|string> */
	public function rules(): array
	{
		return [
			'avatar' => [
				'required',
				'file',
				'image',
				'mimetypes:image/jpeg,image/png,image/webp',
				'extensions:jpg,jpeg,png,webp',
				'max:10240',
			],
		];
	}

	/** @return array<string, string> */
	public function messages(): array
	{
		return [
			'avatar.required'   => __('profile.validation.avatar_required'),
			'avatar.image'      => __('profile.validation.avatar_image'),
			'avatar.mimetypes'  => __('profile.validation.avatar_type'),
			'avatar.extensions' => __('profile.validation.avatar_type'),
			'avatar.max'        => __('profile.validation.avatar_size'),
		];
	}

	public function avatar(): UploadedFile
	{
		$avatar = $this->file('avatar');

		assert($avatar instanceof UploadedFile);

		return $avatar;
	}
}
