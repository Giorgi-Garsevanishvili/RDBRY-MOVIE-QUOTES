<?php

namespace App\Http\Controllers\Settings;

use App\Actions\Profile\UpdateProfilePassword;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\PasswordUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class SecurityController extends Controller
{
	public function update(
		PasswordUpdateRequest $request,
		UpdateProfilePassword $updateProfilePassword,
	): RedirectResponse {
		$updateProfilePassword->handle($request->user(), $request->string('password')->toString());

		Inertia::flash('toast', ['type' => 'success', 'message' => __('profile.password_updated')]);

		return to_route('profile.edit');
	}
}
