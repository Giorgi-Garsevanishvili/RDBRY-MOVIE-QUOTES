<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\LocaleController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Landing/Landing')->name('home');
Route::post('locale/{locale}', LocaleController::class)->name('locale.update');

Route::middleware('guest')->group(function () {
	Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
	Route::post('register', [RegisteredUserController::class, 'store'])->name('register.store');
	Route::inertia('email/verify', 'auth/VerificationPending')->name('activation.notice');
	Route::inertia('email/verified', 'auth/VerificationSuccess')->name('activation.success');
	Route::inertia('forgot-password/email-sent', 'auth/PasswordResetEmailSent')->name('password.email.sent');
	Route::inertia('password-reset-complete', 'auth/PasswordResetSuccess')->name('password.reset.success');
});

Route::get('account/activate/{user}/{hash}', VerifyEmailController::class)
	->middleware(['signed', 'throttle:6,1'])
	->name('activation.verify');

Route::middleware(['auth', 'verified'])->group(function () {
	Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
