<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\AuthenticateGoogleUser;
use App\Http\Controllers\Controller;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\RedirectResponse as IlluminateRedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;
use Symfony\Component\HttpFoundation\RedirectResponse;
use UnexpectedValueException;

class GoogleAuthController extends Controller
{
	public function redirect(): RedirectResponse
	{
		return Socialite::driver('google')->redirect();
	}

	public function callback(Request $request, AuthenticateGoogleUser $authenticateGoogleUser): IlluminateRedirectResponse
	{
		if ($request->filled('error'))
		{
			return $this->failedResponse();
		}

		try
		{
			$user = $authenticateGoogleUser->handle(Socialite::driver('google')->user());
		}
		catch (GuzzleException | InvalidStateException | UnexpectedValueException $exception)
		{
			report($exception);

			return $this->failedResponse();
		}

		Auth::login($user);
		$request->session()->regenerate();

		return redirect()->intended(route('dashboard', absolute: false));
	}

	private function failedResponse(): IlluminateRedirectResponse
	{
		return to_route('login')->with('google_error', __('auth.google_failed'));
	}
}
