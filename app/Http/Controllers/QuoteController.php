<?php

namespace App\Http\Controllers;

use App\Actions\Quotes\CreateQuote;
use App\Actions\Quotes\DeleteQuote;
use App\Actions\Quotes\UpdateQuote;
use App\Http\Requests\Quotes\DestroyQuoteRequest;
use App\Http\Requests\Quotes\ShowQuoteRequest;
use App\Http\Requests\Quotes\StoreQuoteRequest;
use App\Http\Requests\Quotes\UpdateQuoteRequest;
use App\Models\Quote;
use App\Models\User;
use App\Queries\Quotes\QuoteShowQuery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use Inertia\Response;

class QuoteController extends Controller
{
	public function show(ShowQuoteRequest $request, Quote $quote, QuoteShowQuery $quoteShowQuery): Response
	{
		/** @var User $viewer */
		$viewer = $request->user();

		return Inertia::render('quotes/QuoteDetails', $quoteShowQuery->pageProps($quote, $viewer));
	}

	public function store(StoreQuoteRequest $request, CreateQuote $createQuote): RedirectResponse
	{
		/** @var User $author */
		$author = $request->user();
		/** @var UploadedFile $image */
		$image = $request->file('image');

		$createQuote->handle(
			$author,
			$request->movieId(),
			$request->quoteAttributes(),
			$image,
		);

		return back();
	}

	public function update(UpdateQuoteRequest $request, Quote $quote, UpdateQuote $updateQuote): RedirectResponse
	{
		/** @var UploadedFile|null $image */
		$image = $request->file('image');

		$updateQuote->handle(
			$quote,
			$request->movieId(),
			$request->quoteAttributes(),
			$image,
		);

		return back();
	}

	public function destroy(DestroyQuoteRequest $request, Quote $quote, DeleteQuote $deleteQuote): RedirectResponse
	{
		$deleteQuote->handle($quote);

		return to_route('dashboard');
	}
}
