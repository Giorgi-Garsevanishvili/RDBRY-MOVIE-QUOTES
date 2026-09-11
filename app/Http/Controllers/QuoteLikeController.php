<?php

namespace App\Http\Controllers;

use App\Actions\Likes\LikeQuote;
use App\Actions\Likes\UnlikeQuote;
use App\Http\Requests\Quotes\QuoteLikeRequest;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class QuoteLikeController extends Controller
{
	public function store(QuoteLikeRequest $request, Quote $quote, LikeQuote $likeQuote): RedirectResponse
	{
		/** @var User $user */
		$user = $request->user();

		$likeQuote->handle($user, $quote);

		return back();
	}

	public function destroy(QuoteLikeRequest $request, Quote $quote, UnlikeQuote $unlikeQuote): RedirectResponse
	{
		/** @var User $user */
		$user = $request->user();

		$unlikeQuote->handle($user, $quote);

		return back();
	}
}
