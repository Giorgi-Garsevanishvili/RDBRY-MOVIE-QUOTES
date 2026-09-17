<?php

use App\Models\User;

test('profile page is displayed', function () {
	$user = User::factory()->create();

	$this->actingAs($user)
		->get(route('profile.edit'))
		->assertOk();
});

test('profile information can be updated', function () {
	$user = User::factory()->create();

	$this->actingAs($user)
		->patch(route('profile.update'), [
			'username' => 'testuser',
			'email'    => 'test@example.com',
		])
		->assertSessionHasNoErrors()
		->assertRedirect(route('profile.edit'));

	$user->refresh();

	expect($user->username)->toBe('testuser')
		->and($user->email)->toBe('test@example.com')
		->and($user->email_verified_at)->toBeNull();
});

test('email verification remains when the email address is unchanged', function () {
	$user = User::factory()->create();

	$this->actingAs($user)
		->patch(route('profile.update'), [
			'username' => 'testuser',
			'email'    => $user->email,
		])
		->assertSessionHasNoErrors()
		->assertRedirect(route('profile.edit'));

	expect($user->refresh()->email_verified_at)->not->toBeNull();
});

test('user can delete their account', function () {
	$user = User::factory()->create();

	$this->actingAs($user)
		->delete(route('profile.destroy'), [
			'password' => 'password',
		])
		->assertSessionHasNoErrors()
		->assertRedirect(route('home'));

	$this->assertGuest();
	expect($user->fresh())->toBeNull();
});

test('account deletion requires the correct password', function () {
	$user = User::factory()->create();

	$this->actingAs($user)
		->from(route('profile.edit'))
		->delete(route('profile.destroy'), [
			'password' => 'wrong-password',
		])
		->assertSessionHasErrors('password')
		->assertRedirect(route('profile.edit'));

	expect($user->fresh())->not->toBeNull();
});
