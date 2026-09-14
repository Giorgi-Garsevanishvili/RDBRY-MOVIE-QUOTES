<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;

function fakeGoogleUser(array $attributes = []): SocialiteUser
{
	return SocialiteUser::fake(array_replace([
		'id'       => 'google-123',
		'nickname' => 'movieviewer',
		'name'     => 'Movie Viewer',
		'email'    => 'viewer@example.com',
	], $attributes));
}

test('google authentication redirects to the provider', function () {
	Socialite::fake('google');

	$this->get(route('auth.google.redirect'))
		->assertRedirect('https://socialite.fake/google/authorize');
});

test('a new google member is created verified and passwordless and authenticated', function () {
	Socialite::fake('google', fakeGoogleUser([
		'email' => ' Viewer@Example.COM ',
	]));

	$response = $this->get(route('auth.google.callback'));

	$response->assertRedirect(route('dashboard', absolute: false));
	$this->assertAuthenticated();

	$user = User::query()->sole();

	expect($user->username)->toBe('movieviewer')
		->and($user->email)->toBe('viewer@example.com')
		->and($user->google_id)->toBe('google-123')
		->and($user->email_verified_at)->not->toBeNull()
		->and($user->password)->toBeNull();
});

test('an existing google member can authenticate again and is verified', function () {
	$user = User::factory()->unverified()->create([
		'email'     => 'viewer@example.com',
		'google_id' => 'google-123',
		'password'  => null,
	]);
	Socialite::fake('google', fakeGoogleUser());

	$this->get(route('auth.google.callback'))
		->assertRedirect(route('dashboard', absolute: false));

	$this->assertAuthenticatedAs($user);
	expect(User::query()->count())->toBe(1)
		->and($user->fresh()->email_verified_at)->not->toBeNull();
});

test('a matching password account is silently linked without losing its password', function () {
	$user = User::factory()->unverified()->create([
		'email' => 'viewer@example.com',
	]);
	Socialite::fake('google', fakeGoogleUser());

	$this->get(route('auth.google.callback'))
		->assertRedirect(route('dashboard', absolute: false));

	$this->assertAuthenticatedAs($user);
	$user->refresh();

	expect($user->google_id)->toBe('google-123')
		->and($user->email_verified_at)->not->toBeNull()
		->and($user->password)->not->toBeNull()
		->and(Hash::check('password', $user->password))->toBeTrue();
});

test('a google identity cannot replace a different identity already linked to the email', function () {
	$user = User::factory()->create([
		'email'     => 'viewer@example.com',
		'google_id' => 'google-existing',
	]);
	Socialite::fake('google', fakeGoogleUser(['id' => 'google-other']));

	$this->get(route('auth.google.callback'))
		->assertRedirect(route('login'))
		->assertSessionHas('google_error', __('auth.google_failed'));

	$this->assertGuest();
	expect($user->fresh()->google_id)->toBe('google-existing');
});

test('google authentication rejects a callback without a valid email', function () {
	Socialite::fake('google', fakeGoogleUser(['email' => null]));

	$this->get(route('auth.google.callback'))
		->assertRedirect(route('login'))
		->assertSessionHas('google_error', __('auth.google_failed'));

	$this->assertGuest();
	expect(User::query()->count())->toBe(0);
});

test('google authentication handles provider cancellation', function () {
	$this->get(route('auth.google.callback', ['error' => 'access_denied']))
		->assertRedirect(route('login'))
		->assertSessionHas('google_error', __('auth.google_failed'));

	$this->assertGuest();
});

test('google usernames remain unique and follow registration rules', function () {
	User::factory()->create(['username' => 'movieviewer']);
	Socialite::fake('google', fakeGoogleUser(['nickname' => null]));

	$this->get(route('auth.google.callback'));

	$user = User::query()->where('google_id', 'google-123')->sole();

	expect($user->username)->toBe('movieviewer1')
		->and($user->username)->toMatch('/^[a-z0-9]{3,15}$/');
});

test('google usernames fall back when the provider name cannot be normalized', function () {
	Socialite::fake('google', fakeGoogleUser([
		'id'       => 'fallback-google-id',
		'nickname' => '---',
	]));

	$this->get(route('auth.google.callback'));

	$user = User::query()->where('google_id', 'fallback-google-id')->sole();

	expect($user->username)
		->toBe('user' . substr(hash('sha256', 'fallback-google-id'), 0, 8))
		->toMatch('/^[a-z0-9]{3,15}$/');
});

test('passwordless google members cannot use password authentication', function () {
	$user = User::factory()->create([
		'google_id' => 'google-123',
		'password'  => null,
	]);

	$this->post(route('login.store'), [
		'login'    => $user->email,
		'password' => 'password',
	])->assertSessionHasErrors(['login' => __('auth.failed')]);

	$this->assertGuest();
});
