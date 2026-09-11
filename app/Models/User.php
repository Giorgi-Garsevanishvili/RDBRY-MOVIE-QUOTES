<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

/**
 * @property int         $id
 * @property string      $username
 * @property string      $email
 * @property string|null $google_id
 * @property Carbon|null $email_verified_at
 * @property string|null $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['username', 'email', 'google_id', 'email_verified_at', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements MustVerifyEmail
{
	/** @use HasFactory<UserFactory> */
	use HasFactory, Notifiable;

	/** @return HasMany<Movie, $this> */
	public function movies(): HasMany
	{
		return $this->hasMany(Movie::class);
	}

	/** @return HasMany<Quote, $this> */
	public function quotes(): HasMany
	{
		return $this->hasMany(Quote::class);
	}

	/** @return HasMany<Comment, $this> */
	public function comments(): HasMany
	{
		return $this->hasMany(Comment::class);
	}

	/** @return HasMany<Like, $this> */
	public function likes(): HasMany
	{
		return $this->hasMany(Like::class);
	}

	/**
	 * Get the attributes that should be cast.
	 *
	 * @return array<string, string>
	 */
	protected function casts(): array
	{
		return [
			'email_verified_at' => 'datetime',
			'password'          => 'hashed',
		];
	}
}
