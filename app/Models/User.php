<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property int         $id
 * @property string      $username
 * @property string      $email
 * @property string|null $pending_email
 * @property string|null $google_id
 * @property string|null $avatar
 * @property bool        $is_passwordless
 * @property Carbon|null $email_verified_at
 * @property string|null $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Appends(['avatar', 'is_passwordless'])]
#[Fillable(['username', 'email', 'pending_email', 'google_id', 'email_verified_at', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements HasMedia, MustVerifyEmail
{
	/** @use HasFactory<UserFactory> */
	use HasFactory, InteractsWithMedia, Notifiable;

	public const AVATAR_COLLECTION = 'avatar';

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

	/** @return MorphMany<QuoteNotification, $this> */
	public function notifications(): MorphMany
	{
		return $this->morphMany(QuoteNotification::class, 'notifiable')
			->latest('created_at')
			->latest('id');
	}

	public function registerMediaCollections(): void
	{
		$this->addMediaCollection(self::AVATAR_COLLECTION)
			->useDisk('public')
			->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp'])
			->singleFile();
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

	public function getAvatarAttribute(): ?string
	{
		return $this->resolveAvatarUrl();
	}

	/** @return Attribute<bool, never> */
	protected function isPasswordless(): Attribute
	{
		return Attribute::get(fn (): bool => $this->password === null);
	}

	private function resolveAvatarUrl(): ?string
	{
		$url = $this->getFirstMediaUrl(self::AVATAR_COLLECTION);

		return $url === '' ? null : $url;
	}
}
