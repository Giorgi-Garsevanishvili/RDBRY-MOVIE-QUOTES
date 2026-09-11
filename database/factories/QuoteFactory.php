<?php

namespace Database\Factories;

use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Quote> */
class QuoteFactory extends Factory
{
	/** @return array<string, mixed> */
	public function definition(): array
	{
		return [
			'user_id'  => User::factory(),
			'movie_id' => static fn (array $attributes): int => Movie::factory()->create([
				'user_id' => $attributes['user_id'],
			])->id,
			'text_en'  => fake()->sentence(),
			'text_ka'  => 'ქართული ციტატის ტექსტი',
		];
	}
}
