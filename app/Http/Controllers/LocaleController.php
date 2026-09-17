<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateLocaleRequest;
use Illuminate\Http\RedirectResponse;

class LocaleController extends Controller
{
	public function __invoke(UpdateLocaleRequest $request, string $locale): RedirectResponse
	{
		$request->session()->put('locale', $locale);

		return back();
	}
}
