<?php

namespace App\Http\Requests\Notifications;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class ReadAllNotificationsRequest extends FormRequest
{
	public function authorize(): bool
	{
		return $this->user() instanceof User;
	}

	/** @return array<string, never> */
	public function rules(): array
	{
		return [];
	}
}
