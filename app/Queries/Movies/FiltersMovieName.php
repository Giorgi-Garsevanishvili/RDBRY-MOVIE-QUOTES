<?php

namespace App\Queries\Movies;

use App\Models\Movie;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

/** @implements Filter<Movie> */
class FiltersMovieName implements Filter
{
	/** @param Builder<Movie> $query */
	public function __invoke(Builder $query, mixed $value, string $property): void
	{
		$parts = is_array($value) ? $value : [$value];
		$search = trim(implode(',', array_map(
			static fn (mixed $part): string => (string) $part,
			$parts,
		)));

		if ($search === '')
		{
			return;
		}

		$query->where(static function (Builder $query) use ($search): void {
			$query
				->where('name_en', 'like', '%' . $search . '%')
				->orWhere('name_ka', 'like', '%' . $search . '%');
		});
	}
}
