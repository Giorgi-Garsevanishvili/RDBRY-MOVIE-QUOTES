<?php

namespace App\Http\Controllers;

use App\Actions\Movies\CreateMovie;
use App\Actions\Movies\DeleteMovie;
use App\Actions\Movies\UpdateMovie;
use App\Http\Requests\Movies\DestroyMovieRequest;
use App\Http\Requests\Movies\ShowMovieRequest;
use App\Http\Requests\Movies\StoreMovieRequest;
use App\Http\Requests\Movies\UpdateMovieRequest;
use App\Models\Movie;
use App\Models\User;
use App\Queries\Movies\MovieFormOptionsQuery;
use App\Queries\Movies\MovieIndexQuery;
use App\Queries\Movies\MovieShowQuery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Inertia\Inertia;
use Inertia\Response;

class MovieController extends Controller
{
	public function index(
		Request $request,
		MovieIndexQuery $movieIndexQuery,
		MovieFormOptionsQuery $movieFormOptionsQuery,
	): Response {
		$owner = $request->user();
		abort_unless($owner instanceof User, 401);

		return Inertia::render('movies/MovieList', [
			...$movieIndexQuery->pageProps($owner, $request),
			...$movieFormOptionsQuery->pageProps(),
		]);
	}

	public function show(
		ShowMovieRequest $request,
		Movie $movie,
		MovieShowQuery $movieShowQuery,
		MovieFormOptionsQuery $movieFormOptionsQuery,
	): Response {
		return Inertia::render('movies/MovieDetails', [
			...$movieShowQuery->pageProps($movie),
			...$movieFormOptionsQuery->pageProps(),
		]);
	}

	public function store(StoreMovieRequest $request, CreateMovie $createMovie): RedirectResponse
	{
		/** @var User $owner */
		$owner = $request->user();
		/** @var UploadedFile $poster */
		$poster = $request->file('poster');

		$createMovie->handle(
			$owner,
			$request->movieAttributes(),
			$request->genreIds(),
			$poster,
		);

		return back();
	}

	public function update(UpdateMovieRequest $request, Movie $movie, UpdateMovie $updateMovie): RedirectResponse
	{
		/** @var UploadedFile|null $poster */
		$poster = $request->file('poster');

		$updateMovie->handle(
			$movie,
			$request->movieAttributes(),
			$request->genreIds(),
			$poster,
		);

		return back();
	}

	public function destroy(DestroyMovieRequest $request, Movie $movie, DeleteMovie $deleteMovie): RedirectResponse
	{
		$deleteMovie->handle($movie);

		return to_route('movies.index');
	}
}
