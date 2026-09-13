<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SecurityController;
use App\Http\Middleware\RequireVerifiedEmail;
use Illuminate\Support\Facades\Route;

Route::get('settings/profile/email/verify/{user}/{hash}', [ProfileController::class, 'verifyEmail'])
	->middleware(['signed', 'throttle:6,1'])
	->name('profile.email.verify');

Route::middleware(['auth', RequireVerifiedEmail::class])->group(function () {
	Route::redirect('settings', '/settings/profile');

	Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::post('settings/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
	Route::patch('settings/profile/username', [ProfileController::class, 'updateUsername'])->name('profile.username.update');
	Route::post('settings/profile/email', [ProfileController::class, 'requestEmailChange'])->name('profile.email.request');

	Route::put('settings/password', [SecurityController::class, 'update'])
		->middleware('throttle:6,1')
		->name('user-password.update');
});
