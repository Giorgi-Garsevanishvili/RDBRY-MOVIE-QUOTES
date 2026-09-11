<?php

namespace App\Queries\Quotes;

use App\Models\Movie;
use App\Models\Quote;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

/** @implements Filter<Quote> */
class FiltersFeedSearch implements Filter
{
	/** @param Builder<Quote> $query */
	public function __invoke(Builder $query, mixed $value, string $property): void
	{
		$search = $this->searchValue($value);

		if ($search === '')
		{
			return;
		}

		$prefix = mb_substr($search, 0, 1);
		$term = in_array($prefix, ['@', '#'], true)
			? trim(mb_substr($search, 1))
			: $search;

		if ($term === '')
		{
			return;
		}

		if ($prefix === '@')
		{
			$this->filterMovies($query, $term);

			return;
		}

		if ($prefix === '#')
		{
			$this->filterQuotes($query, $term);

			return;
		}

		$this->filterAll($query, $term);
	}

	private function searchValue(mixed $value): string
	{
		$parts = is_array($value) ? $value : [$value];

		return trim(implode(',', array_map(
			static fn (mixed $part): string => (string) $part,
			$parts,
		)));
	}

	/** @param Builder<Quote> $query */
	private function filterMovies(Builder $query, string $term): void
	{
		$query->whereHas('movie', static function (Builder $movieQuery) use ($term): void {
			/* @var Builder<Movie> $movieQuery */
			$movieQuery->where(static function (Builder $nameQuery) use ($term): void {
				$nameQuery
					->where('name_en', 'like', '%' . $term . '%')
					->orWhere('name_ka', 'like', '%' . $term . '%');
			});
		});
	}

	/** @param Builder<Quote> $query */
	private function filterQuotes(Builder $query, string $term): void
	{
		$query->where(static function (Builder $textQuery) use ($term): void {
			$textQuery
				->where('text_en', 'like', '%' . $term . '%')
				->orWhere('text_ka', 'like', '%' . $term . '%');
		});
	}

	/** @param Builder<Quote> $query */
	private function filterAll(Builder $query, string $term): void
	{
		$query->where(static function (Builder $generalQuery) use ($term): void {
			$generalQuery
				->where(static function (Builder $textQuery) use ($term): void {
					$textQuery
						->where('text_en', 'like', '%' . $term . '%')
						->orWhere('text_ka', 'like', '%' . $term . '%');
				})
				->orWhereHas('movie', static function (Builder $movieQuery) use ($term): void {
					$movieQuery->where(static function (Builder $nameQuery) use ($term): void {
						$nameQuery
							->where('name_en', 'like', '%' . $term . '%')
							->orWhere('name_ka', 'like', '%' . $term . '%');
					});
				});
		});
	}
}
