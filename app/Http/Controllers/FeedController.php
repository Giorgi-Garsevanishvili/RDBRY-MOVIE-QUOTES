<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuoteFeedResource;
use App\Models\User;
use App\Queries\Quotes\QuoteFeedQuery;
use App\Queries\Quotes\QuoteFormOptionsQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FeedController extends Controller
{
	public function __invoke(
		Request $request,
		QuoteFeedQuery $quoteFeedQuery,
		QuoteFormOptionsQuery $quoteFormOptionsQuery,
	): Response {
		$author = $request->user();
		abort_unless($author instanceof User, 401);

		return Inertia::render('feed/Feed', [
			...$quoteFormOptionsQuery->pageProps($author),
			'quotes' => Inertia::scroll(
				static fn () => QuoteFeedResource::collection($quoteFeedQuery->paginate($request)),
			),
			'filters' => [
				'search' => $quoteFeedQuery->searchValue($request),
			],
		]);
	}
}
