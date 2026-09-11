<?php

namespace App\Http\Controllers;

use App\Actions\Comments\CreateComment;
use App\Http\Requests\Quotes\StoreCommentRequest;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class QuoteCommentController extends Controller
{
	public function __invoke(
		StoreCommentRequest $request,
		Quote $quote,
		CreateComment $createComment,
	): RedirectResponse {
		/** @var User $author */
		$author = $request->user();

		$createComment->handle($author, $quote, $request->body());

		return back();
	}
}
