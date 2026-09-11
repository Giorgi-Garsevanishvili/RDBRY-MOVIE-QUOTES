<?php

namespace App\Models;

use Database\Factories\MovieFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property int         $id
 * @property int         $user_id
 * @property string      $name_en
 * @property string      $name_ka
 * @property string      $director_en
 * @property string      $director_ka
 * @property string      $description_en
 * @property string      $description_ka
 * @property int         $release_year
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
	'name_en',
	'name_ka',
	'director_en',
	'director_ka',
	'description_en',
	'description_ka',
	'release_year',
])]
class Movie extends Model implements HasMedia
{
	/** @use HasFactory<MovieFactory> */
	use HasFactory, InteractsWithMedia;

	public const POSTER_COLLECTION = 'poster';

	/** @return BelongsTo<User, $this> */
	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}

	/** @return BelongsToMany<Genre, $this> */
	public function genres(): BelongsToMany
	{
		return $this->belongsToMany(Genre::class);
	}

	/** @return HasMany<Quote, $this> */
	public function quotes(): HasMany
	{
		return $this->hasMany(Quote::class);
	}

	public function registerMediaCollections(): void
	{
		$this->addMediaCollection(self::POSTER_COLLECTION)
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
			'release_year' => 'integer',
		];
	}
}
