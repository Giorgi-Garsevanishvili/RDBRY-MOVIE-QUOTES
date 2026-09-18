<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

test('a password member can update their password', function () {
	$user = User::factory()->create();

	$this->actingAs($user)
		->put(route('user-password.update'), [
			'current_password'      => 'password',
			'password'              => 'newpassword1',
			'password_confirmation' => 'newpassword1',
		])
		->assertSessionHasNoErrors()
		->assertRedirect(route('profile.edit'));

	expect(Hash::check('newpassword1', $user->refresh()->password))->toBeTrue();
});

test('password updates require the current password and the account password rules', function (array $payload, array|string $field) {
	$user = User::factory()->create();

	$this->actingAs($user)
		->put(route('user-password.update'), array_replace([
			'current_password'      => 'password',
			'password'              => 'newpassword1',
			'password_confirmation' => 'newpassword1',
		], $payload))
		->assertSessionHasErrors($field);

	expect(Hash::check('password', $user->refresh()->password))->toBeTrue();
})->with([
	'missing current password' => [['current_password' => null], 'current_password'],
	'wrong current password'   => [['current_password' => 'wrongpassword'], 'current_password'],
	'short password'           => [['password' => 'short1', 'password_confirmation' => 'short1'], 'password'],
	'long password'            => [['password' => 'abcdefghijklmnop', 'password_confirmation' => 'abcdefghijklmnop'], 'password'],
	'uppercase password'       => [['password' => 'Newpassword1', 'password_confirmation' => 'Newpassword1'], 'password'],
	'punctuated password'      => [['password' => 'new-pass1', 'password_confirmation' => 'new-pass1'], 'password'],
	'unmatched confirmation'   => [['password_confirmation' => 'different1'], 'password'],
	'missing confirmation'     => [['password_confirmation' => null], ['password', 'password_confirmation']],
]);

test('passwordless Google members cannot add a password from the profile', function () {
	$user = User::factory()->create([
		'google_id' => 'google-password-id',
		'password'  => null,
	]);

	$this->actingAs($user)
		->put(route('user-password.update'), [
			'password'              => 'newpassword1',
			'password_confirmation' => 'newpassword1',
		])
		->assertForbidden();

	expect($user->refresh()->password)->toBeNull();
});

test('password validation messages are localized in Georgian', function () {
	app()->setLocale('ka');
	$user = User::factory()->create();

	$this->actingAs($user)
		->put(route('user-password.update'), [
			'current_password'      => 'password',
			'password'              => 'SHORT1',
			'password_confirmation' => 'SHORT1',
		])
		->assertSessionHasErrors([
			'password' => 'ახალი პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს.',
		]);
});

test('guests and unverified members cannot update passwords', function () {
	$this->put(route('user-password.update'))->assertForbidden();

	$user = User::factory()->unverified()->create();

	$this->actingAs($user)
		->put(route('user-password.update'))
		->assertForbidden();
});
