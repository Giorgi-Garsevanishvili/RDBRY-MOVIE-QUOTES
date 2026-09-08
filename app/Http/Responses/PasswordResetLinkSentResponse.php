<?php

namespace App\Http\Responses;

use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\SuccessfulPasswordResetLinkRequestResponse;

class PasswordResetLinkSentResponse implements SuccessfulPasswordResetLinkRequestResponse
{
	public function toResponse($request): RedirectResponse
	{
		return to_route('password.email.sent');
	}
}
