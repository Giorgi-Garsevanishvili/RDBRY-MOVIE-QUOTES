<?php

namespace App\Http\Requests\Notifications;

use App\Models\QuoteNotification;
use Illuminate\Foundation\Http\FormRequest;

class ReadNotificationRequest extends FormRequest
{
	public function authorize(): bool
	{
		$notification = $this->route('notification');

		return $notification instanceof QuoteNotification
			&& $this->user()?->can('update', $notification) === true;
	}

	/** @return array<string, never> */
	public function rules(): array
	{
		return [];
	}
}
