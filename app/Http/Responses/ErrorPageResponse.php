<?php

namespace App\Http\Responses;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ErrorPageResponse
{
	public function render(Request $request, int $status): Response
	{
		return Inertia::render('errors/ErrorPage', [
			'locale' => $this->resolveLocale($request),
			'status' => $status,
		])->toResponse($request)->setStatusCode($status);
	}

	private function resolveLocale(Request $request): string
	{
		$locale = $request->cookie('locale');
		$supportedLocales = config('app.supported_locales');

		if (is_string($locale) && is_array($supportedLocales) && in_array($locale, $supportedLocales, true))
		{
			return $locale;
		}

		return app()->getLocale();
	}
}
