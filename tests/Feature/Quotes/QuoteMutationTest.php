<?php

use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

function validQuotePayload(Movie $movie, array $overrides = []): array
{
	return array_replace([
		'text_en'  => 'Do not pity the dead, Harry.',
		'text_ka'  => 'ნუ შეიბრალებ მკვდრებს, ჰარი.',
		'movie_id' => $movie->id,
		'image'    => UploadedFile::fake()->image('quote.jpg', 1200, 700),
	], $overrides);
}

test('a verified member can create a quote for their movie with an image', function () {
	Storage::fake('public');

	$author = User::factory()->create();
	$movie = Movie::factory()->for($author)->create();

	$this->actingAs($author)
		->from('/dashboard')
		->post(route('quotes.store'), validQuotePayload($movie))
		->assertRedirect('/dashboard')
		->assertSessionHasNoErrors();

	$quote = Quote::query()->sole();
	$image = $quote->getFirstMedia(Quote::IMAGE_COLLECTION);

	expect($quote->user_id)->toBe($author->id)
		->and($quote->movie_id)->toBe($movie->id)
		->and($quote->text_en)->toBe('Do not pity the dead, Harry.')
		->and($quote->text_ka)->toBe('ნუ შეიბრალებ მკვდრებს, ჰარი.')
		->and($image)->not->toBeNull();

	Storage::disk('public')->assertExists($image->getPathRelativeToRoot());
});

test('quote images accept each approved image format', function (string $extension) {
	Storage::fake('public');

	$author = User::factory()->create();
	$movie = Movie::factory()->for($author)->create();

	$this->actingAs($author)
		->post(route('quotes.store'), validQuotePayload($movie, [
			'image' => UploadedFile::fake()->image('quote.' . $extension),
		]))
		->assertSessionHasNoErrors();

	expect(Quote::query()->sole()->getFirstMedia(Quote::IMAGE_COLLECTION)?->mime_type)
		->toBe('image/' . ($extension === 'jpg' ? 'jpeg' : $extension));
})->with(['jpg', 'png', 'webp']);

test('an author can update quote text and movie without replacing the image', function () {
	Storage::fake('public');

	$author = User::factory()->create();
	$originalMovie = Movie::factory()->for($author)->create();
	$newMovie = Movie::factory()->for($author)->create();
	$quote = Quote::factory()->for($author)->for($originalMovie)->create();
	$quote->addMedia(UploadedFile::fake()->image('original.jpg'))
		->toMediaCollection(Quote::IMAGE_COLLECTION);
	$originalImageId = $quote->getFirstMedia(Quote::IMAGE_COLLECTION)?->id;

	$payload = validQuotePayload($newMovie, [
		'text_en' => 'Updated English quote.',
		'text_ka' => 'განახლებული ქართული ციტატა.',
	]);
	unset($payload['image']);

	$this->actingAs($author)
		->from('/dashboard')
		->patch(route('quotes.update', $quote), $payload)
		->assertRedirect('/dashboard')
		->assertSessionHasNoErrors();

	$quote->refresh();

	expect($quote->movie_id)->toBe($newMovie->id)
		->and($quote->text_en)->toBe('Updated English quote.')
		->and($quote->text_ka)->toBe('განახლებული ქართული ციტატა.')
		->and($quote->getFirstMedia(Quote::IMAGE_COLLECTION)?->id)->toBe($originalImageId);
});

test('an author can replace a quote image', function () {
	Storage::fake('public');

	$author = User::factory()->create();
	$movie = Movie::factory()->for($author)->create();
	$quote = Quote::factory()->for($author)->for($movie)->create();
	$oldImage = $quote->addMedia(UploadedFile::fake()->image('original.jpg'))
		->toMediaCollection(Quote::IMAGE_COLLECTION);
	$oldPath = $oldImage->getPathRelativeToRoot();

	$this->actingAs($author)
		->patch(route('quotes.update', $quote), validQuotePayload($movie, [
			'image' => UploadedFile::fake()->image('replacement.png'),
		]))
		->assertSessionHasNoErrors();

	$quote->refresh();
	$newImage = $quote->getFirstMedia(Quote::IMAGE_COLLECTION);

	expect($quote->getMedia(Quote::IMAGE_COLLECTION))->toHaveCount(1)
		->and($newImage?->file_name)->toBe('replacement.png');

	Storage::disk('public')->assertMissing($oldPath);
	Storage::disk('public')->assertExists($newImage->getPathRelativeToRoot());
});

test('a member cannot create or move a quote to another members movie', function () {
	Storage::fake('public');

	$author = User::factory()->create();
	$otherMember = User::factory()->create();
	$authorsMovie = Movie::factory()->for($author)->create();
	$otherMovie = Movie::factory()->for($otherMember)->create();
	$quote = Quote::factory()->for($author)->for($authorsMovie)->create();

	$this->actingAs($author)
		->post(route('quotes.store'), validQuotePayload($otherMovie))
		->assertSessionHasErrors('movie_id');

	$this->actingAs($author)
		->patch(route('quotes.update', $quote), validQuotePayload($otherMovie))
		->assertSessionHasErrors('movie_id');

	expect(Quote::query()->count())->toBe(1)
		->and($quote->fresh()?->movie_id)->toBe($authorsMovie->id);
});

test('only the author can update or delete a quote', function () {
	Storage::fake('public');

	$author = User::factory()->create();
	$otherMember = User::factory()->create();
	$movie = Movie::factory()->for($author)->create();
	$otherMovie = Movie::factory()->for($otherMember)->create();
	$quote = Quote::factory()->for($author)->for($movie)->create();

	$this->actingAs($otherMember)
		->patch(route('quotes.update', $quote), validQuotePayload($otherMovie))
		->assertForbidden();

	$this->actingAs($otherMember)
		->delete(route('quotes.destroy', $quote))
		->assertForbidden();

	$this->assertDatabaseHas('quotes', ['id' => $quote->id]);
});

test('an author hard-deletes a quote and its image', function () {
	Storage::fake('public');

	$author = User::factory()->create();
	$movie = Movie::factory()->for($author)->create();
	$quote = Quote::factory()->for($author)->for($movie)->create();
	$image = $quote->addMedia(UploadedFile::fake()->image('quote.jpg'))
		->toMediaCollection(Quote::IMAGE_COLLECTION);
	$imagePath = $image->getPathRelativeToRoot();

	$this->actingAs($author)
		->delete(route('quotes.destroy', $quote))
		->assertRedirect(route('dashboard'));

	$this->assertDatabaseMissing('quotes', ['id' => $quote->id]);
	$this->assertDatabaseMissing('media', [
		'model_type' => Quote::class,
		'model_id'   => $quote->id,
	]);
	Storage::disk('public')->assertMissing($imagePath);
});

test('deleting a movie cascades its quotes and quote images', function () {
	Storage::fake('public');

	$author = User::factory()->create();
	$movie = Movie::factory()->for($author)->create();
	$quote = Quote::factory()->for($author)->for($movie)->create();
	$image = $quote->addMedia(UploadedFile::fake()->image('quote.jpg'))
		->toMediaCollection(Quote::IMAGE_COLLECTION);
	$imagePath = $image->getPathRelativeToRoot();

	$this->actingAs($author)->delete(route('movies.destroy', $movie));

	$this->assertDatabaseMissing('quotes', ['id' => $quote->id]);
	$this->assertDatabaseMissing('media', [
		'model_type' => Quote::class,
		'model_id'   => $quote->id,
	]);
	Storage::disk('public')->assertMissing($imagePath);
});

test('quote fields enforce required scripts movie ownership and image rules', function (array $overrides, array|string $fields) {
	Storage::fake('public');

	$author = User::factory()->create();
	$movie = Movie::factory()->for($author)->create();

	$this->actingAs($author)
		->post(route('quotes.store'), validQuotePayload($movie, $overrides))
		->assertSessionHasErrors($fields);
})->with([
	'required text' => [[
		'text_en' => null,
		'text_ka' => null,
	], ['text_en', 'text_ka']],
	'English quote script'  => [['text_en' => 'English ქართული'], 'text_en'],
	'Georgian quote script' => [['text_ka' => 'ქართული English'], 'text_ka'],
	'missing movie'         => [['movie_id' => null], 'movie_id'],
	'unknown movie'         => [['movie_id' => 999999], 'movie_id'],
	'missing image'         => [['image' => null], 'image'],
	'wrong image type'      => [[
		'image' => UploadedFile::fake()->create('quote.pdf', 100, 'application/pdf'),
	], 'image'],
	'oversized image' => [[
		'image' => UploadedFile::fake()->create('quote.jpg', 10241, 'image/jpeg'),
	], 'image'],
]);

test('quote validation messages are localized in Georgian', function () {
	Storage::fake('public');
	app()->setLocale('ka');

	$author = User::factory()->create();
	$movie = Movie::factory()->for($author)->create();

	$this->actingAs($author)
		->post(route('quotes.store'), validQuotePayload($movie, ['text_en' => null]))
		->assertSessionHasErrors([
			'text_en' => 'ინგლისური ციტატა სავალდებულოა.',
		]);
});

test('guest and unverified members cannot mutate quotes', function () {
	Storage::fake('public');

	$this->post(route('quotes.store'))->assertForbidden();

	$unverifiedMember = User::factory()->unverified()->create();
	$movie = Movie::factory()->for($unverifiedMember)->create();

	$this->actingAs($unverifiedMember)
		->post(route('quotes.store'), validQuotePayload($movie))
		->assertForbidden();

	expect(Quote::query()->count())->toBe(0);
});
