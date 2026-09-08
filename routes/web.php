<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\LocaleController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Landing/Landing')->name('home');
Route::post('locale/{locale}', LocaleController::class)->name('locale.update');

Route::middleware('guest')->group(function () {
	Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
	Route::post('register', [RegisteredUserController::class, 'store'])->name('register.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
	Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
