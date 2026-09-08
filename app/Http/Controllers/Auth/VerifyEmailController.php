<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\VerifyEmail;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
	public function __invoke(Request $request, User $user, VerifyEmail $verifyEmail): RedirectResponse
	{
		abort_unless(
			hash_equals((string) $request->route('hash'), sha1($user->getEmailForVerification())),
			403,
		);

		$verifyEmail->handle($user);

		return to_route('activation.success');
	}
}
