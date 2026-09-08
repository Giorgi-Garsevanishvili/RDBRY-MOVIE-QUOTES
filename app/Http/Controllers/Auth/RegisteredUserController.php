<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\RegisterUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterUserRequest;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
	public function create(): Response
	{
		return Inertia::render('auth/Register');
	}

	public function store(RegisterUserRequest $request, RegisterUser $registerUser): RedirectResponse
	{
		$user = $registerUser->handle(
			$request->string('username')->toString(),
			$request->string('email')->toString(),
			$request->string('password')->toString(),
		);

		event(new Registered($user));

		return to_route('login')->with('status', __('auth.registration_pending'));
	}
}
