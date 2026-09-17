<?php

use App\Models\Comment;
use App\Models\Like;
use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

test('deleting a member removes their content and uploaded media', function () {
	Storage::fake('public');

	$user = User::factory()->create();
	$otherMember = User::factory()->create();
	$movie = Movie::factory()->for($user)->create();
	$quote = Quote::factory()->for($user)->for($movie)->create();
	$otherQuote = Quote::factory()->for($otherMember)->create();
	$comment = Comment::factory()->for($user)->for($otherQuote)->create();
	$like = Like::factory()->for($user)->for($otherQuote)->create();

	$user->addMedia(UploadedFile::fake()->image('avatar.jpg'))
		->toMediaCollection(User::AVATAR_COLLECTION);
	$movie->addMedia(UploadedFile::fake()->image('poster.jpg'))
		->toMediaCollection(Movie::POSTER_COLLECTION);
	$quote->addMedia(UploadedFile::fake()->image('quote.jpg'))
		->toMediaCollection(Quote::IMAGE_COLLECTION);

	$mediaIds = Media::query()->pluck('id');

	$user->deleteOrFail();

	$this->assertDatabaseMissing('comments', ['id' => $comment->id]);
	$this->assertDatabaseMissing('likes', ['id' => $like->id]);
	$this->assertDatabaseMissing('quotes', ['id' => $quote->id]);
	$this->assertDatabaseMissing('movies', ['id' => $movie->id]);
	$this->assertDatabaseHas('quotes', ['id' => $otherQuote->id]);

	expect(Media::query()->whereKey($mediaIds)->exists())->toBeFalse();
});
