<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Queries\Quotes\QuoteFormOptionsQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FeedController extends Controller
{
	public function __invoke(Request $request, QuoteFormOptionsQuery $quoteFormOptionsQuery): Response
	{
		$author = $request->user();
		abort_unless($author instanceof User, 401);

		return Inertia::render('feed/Feed', $quoteFormOptionsQuery->pageProps($author));
	}
}
