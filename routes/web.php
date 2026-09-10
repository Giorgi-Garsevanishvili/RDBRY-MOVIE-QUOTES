<?php

use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\ResendVerificationEmailController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\VerificationPendingController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\MovieController;
use App\Http\Middleware\RequireVerifiedEmail;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Landing/Landing')->name('home');
Route::post('locale/{locale}', LocaleController::class)->name('locale.update');

Route::middleware('guest')->group(function () {
	Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
	Route::post('register', [RegisteredUserController::class, 'store'])->name('register.store');
	Route::get('auth/google/redirect', [GoogleAuthController::class, 'redirect'])->name('auth.google.redirect');
	Route::get('auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');
	Route::get('email/verify', VerificationPendingController::class)->name('activation.notice');
	Route::post('account/activation/resend', ResendVerificationEmailController::class)
		->middleware('throttle:6,1')
		->name('activation.resend');
	Route::inertia('email/verified', 'auth/VerificationSuccess')->name('activation.success');
	Route::inertia('forgot-password/email-sent', 'auth/PasswordResetEmailSent')->name('password.email.sent');
	Route::inertia('password-reset-complete', 'auth/PasswordResetSuccess')->name('password.reset.success');
});

Route::get('account/activate/{user}/{hash}', VerifyEmailController::class)
	->middleware(['signed', 'throttle:6,1'])
	->name('activation.verify');

Route::middleware(['auth', RequireVerifiedEmail::class])->group(function () {
	Route::inertia('dashboard', 'protected/ProtectedPlaceholder', ['section' => 'feed'])->name('dashboard');
	Route::inertia('movies', 'protected/ProtectedPlaceholder', ['section' => 'movies'])->name('movies.index');
	Route::inertia('notifications', 'protected/ProtectedPlaceholder', ['section' => 'notifications'])->name('notifications.index');
	Route::post('movies', [MovieController::class, 'store'])->name('movies.store');
	Route::patch('movies/{movie}', [MovieController::class, 'update'])->name('movies.update');
	Route::delete('movies/{movie}', [MovieController::class, 'destroy'])->name('movies.destroy');
});

require __DIR__ . '/settings.php';
