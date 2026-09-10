<?php

namespace App\Models;

use Database\Factories\GenreFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

/**
 * @property int         $id
 * @property string      $name_en
 * @property string      $name_ka
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['name_en', 'name_ka'])]
class Genre extends Model
{
	/** @use HasFactory<GenreFactory> */
	use HasFactory;

	/** @return BelongsToMany<Movie, $this> */
	public function movies(): BelongsToMany
	{
		return $this->belongsToMany(Movie::class);
	}
}
