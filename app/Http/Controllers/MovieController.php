<?php

namespace App\Http\Controllers;

use App\Actions\Movies\CreateMovie;
use App\Actions\Movies\DeleteMovie;
use App\Actions\Movies\UpdateMovie;
use App\Http\Requests\Movies\DestroyMovieRequest;
use App\Http\Requests\Movies\StoreMovieRequest;
use App\Http\Requests\Movies\UpdateMovieRequest;
use App\Models\Movie;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;

class MovieController extends Controller
{
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

		return back();
	}
}
