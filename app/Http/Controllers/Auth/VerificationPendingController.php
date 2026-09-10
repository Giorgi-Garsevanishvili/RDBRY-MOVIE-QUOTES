<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VerificationPendingController extends Controller
{
	public const EMAIL_SESSION_KEY = 'activation.email';

	public function __invoke(Request $request): Response
	{
		return Inertia::render('auth/VerificationPending', [
			'canResend' => is_string($request->session()->get(self::EMAIL_SESSION_KEY)),
			'status'    => $request->session()->get('status'),
		]);
	}
}
