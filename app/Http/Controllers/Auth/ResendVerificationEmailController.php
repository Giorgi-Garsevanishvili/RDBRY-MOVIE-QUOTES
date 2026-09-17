<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\ResendVerificationEmail;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ResendVerificationEmailController extends Controller
{
	public function __invoke(Request $request, ResendVerificationEmail $resendVerificationEmail): RedirectResponse
	{
		$email = $request->session()->get(VerificationPendingController::EMAIL_SESSION_KEY);

		if (is_string($email))
		{
			$resendVerificationEmail->handle($email);
		}

		return back()->with('status', __('auth.verification_link_sent'));
	}
}
