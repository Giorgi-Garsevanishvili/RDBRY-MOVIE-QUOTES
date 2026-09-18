<?php

namespace App\Http\Controllers\Settings;

use App\Actions\Profile\RequestEmailChange;
use App\Actions\Profile\UpdateProfileAvatar;
use App\Actions\Profile\UpdateProfileUsername;
use App\Actions\Profile\VerifyPendingEmail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\AvatarUpdateRequest;
use App\Http\Requests\Settings\EmailChangeRequest;
use App\Http\Requests\Settings\UsernameUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
	/**
	 * Show the user's profile settings page.
	 */
	public function edit(Request $request): Response
	{
		$user = $request->user();

		assert($user instanceof User);

		return Inertia::render('settings/Profile', [
			'profile' => [
				'pendingEmail'   => $user->pending_email,
				'isPasswordless' => $user->password === null,
			],
		]);
	}

	public function updateAvatar(
		AvatarUpdateRequest $request,
		UpdateProfileAvatar $updateProfileAvatar,
	): RedirectResponse {
		$updateProfileAvatar->handle($request->user(), $request->avatar());

		Inertia::flash('toast', ['type' => 'success', 'message' => __('profile.avatar_updated')]);

		return to_route('profile.edit');
	}

	public function updateUsername(
		UsernameUpdateRequest $request,
		UpdateProfileUsername $updateProfileUsername,
	): RedirectResponse {
		$updateProfileUsername->handle($request->user(), $request->string('username')->toString());

		Inertia::flash('toast', ['type' => 'success', 'message' => __('profile.username_updated')]);

		return to_route('profile.edit');
	}

	public function requestEmailChange(
		EmailChangeRequest $request,
		RequestEmailChange $requestEmailChange,
	): RedirectResponse {
		$requestEmailChange->handle($request->user(), $request->string('email')->toString());

		Inertia::flash('toast', ['type' => 'success', 'message' => __('profile.email_change_sent')]);

		return to_route('profile.edit');
	}

	public function verifyEmail(
		Request $request,
		User $user,
		string $hash,
		VerifyPendingEmail $verifyPendingEmail,
	): RedirectResponse {
		abort_unless($verifyPendingEmail->handle($user, $hash), 403);

		Inertia::flash('toast', ['type' => 'success', 'message' => __('profile.email_verified')]);

		return $request->user()?->is($user) === true
			? to_route('profile.edit')
			: to_route('home');
	}
}
