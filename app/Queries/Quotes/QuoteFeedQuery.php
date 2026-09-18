<?php

namespace App\Queries\Quotes;

use App\Models\Quote;
use App\Models\User;
use Illuminate\Contracts\Pagination\CursorPaginator;
use Illuminate\Http\Request;
use Illuminate\Pagination\Cursor;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class QuoteFeedQuery
{
	public const PER_PAGE = 10;

	/** @return QueryBuilder<Quote> */
	public function build(?Request $request = null): QueryBuilder
	{
		$query = QueryBuilder::for(Quote::query(), $request)
			->allowedFilters(AllowedFilter::custom('search', new FiltersFeedSearch()));

		$query
			->with([
				'user:id,username',
				'user.media',
				'movie:id,name_en,name_ka,release_year',
				'media',
				'comments' => static fn ($query) => $query
					->oldest('created_at')
					->oldest('id'),
				'comments.user:id,username',
				'comments.user.media',
			])
			->withCount(['comments', 'likes'])
			->orderByDesc('created_at')
			->orderByDesc('id');

		$viewer = $request?->user();

		if ($viewer instanceof User)
		{
			$query->withExists([
				'likes as liked_by_viewer' => static fn ($likes) => $likes
					->where('user_id', $viewer->id),
			]);
		}

		return $query;
	}

	/** @return CursorPaginator<int, Quote> */
	public function paginate(Request $request): CursorPaginator
	{
		$cursorValue = $request->query('cursor');
		$cursor = is_string($cursorValue) ? Cursor::fromEncoded($cursorValue) : null;

		return $this->build($request)
			->cursorPaginate(perPage: self::PER_PAGE, cursor: $cursor);
	}

	public function searchValue(Request $request): string
	{
		$filters = $request->query('filter');

		if (!is_array($filters) || !is_string($filters['search'] ?? null))
		{
			return '';
		}

		return trim($filters['search']);
	}
}
