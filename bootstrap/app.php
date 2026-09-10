<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetLocale;
use App\Http\Responses\ErrorPageResponse;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
	->withRouting(
		web: __DIR__ . '/../routes/web.php',
		commands: __DIR__ . '/../routes/console.php',
		health: '/up',
	)
	->withMiddleware(function (Middleware $middleware): void {
		$middleware->encryptCookies(except: ['appearance', 'locale', 'sidebar_state']);

		$middleware->web(append: [
			HandleAppearance::class,
			SetLocale::class,
			HandleInertiaRequests::class,
			AddLinkHeadersForPreloadedAssets::class,
		]);
	})
	->withExceptions(function (Exceptions $exceptions): void {
		$exceptions->shouldRenderJsonWhen(
			fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
		);

		$exceptions->render(function (AuthenticationException $exception, Request $request): ?Response {
			if ($request->is('api/*') || $request->expectsJson())
			{
				return null;
			}

			return app(ErrorPageResponse::class)->render($request, Response::HTTP_FORBIDDEN);
		});

		$exceptions->respond(function (Response $response, \Throwable $exception, Request $request): Response {
			$status = $response->getStatusCode();

			if ($request->is('api/*') || $request->expectsJson() || !in_array($status, [
				Response::HTTP_FORBIDDEN,
				Response::HTTP_NOT_FOUND,
			], true))
			{
				return $response;
			}

			return app(ErrorPageResponse::class)->render($request, $status);
		});
	})->create();
