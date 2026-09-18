<?php

namespace App\Models;

use Database\Factories\QuoteFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property int         $id
 * @property int         $user_id
 * @property int         $movie_id
 * @property string      $text_en
 * @property string      $text_ka
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int|null    $comments_count
 * @property int|null    $likes_count
 * @property bool|null   $liked_by_viewer
 */
#[Fillable(['movie_id', 'text_en', 'text_ka'])]
class Quote extends Model implements HasMedia
{
	/** @use HasFactory<QuoteFactory> */
	use HasFactory, InteractsWithMedia;

	public const IMAGE_COLLECTION = 'image';

	/** @return BelongsTo<User, $this> */
	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}

	/** @return BelongsTo<Movie, $this> */
	public function movie(): BelongsTo
	{
		return $this->belongsTo(Movie::class);
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

	public function registerMediaCollections(): void
	{
		$this->addMediaCollection(self::IMAGE_COLLECTION)
			->useDisk('public')
			->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp'])
			->singleFile();
	}
}
