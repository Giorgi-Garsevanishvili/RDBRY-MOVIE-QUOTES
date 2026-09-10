<?php

namespace Database\Factories;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Movie> */
class MovieFactory extends Factory
{
	/** @return array<string, mixed> */
	public function definition(): array
	{
		return [
			'user_id'        => User::factory(),
			'name_en'        => fake()->sentence(3),
			'name_ka'        => 'ქართული ფილმის სახელი',
			'director_en'    => fake()->name(),
			'director_ka'    => 'ქართული რეჟისორი',
			'description_en' => fake()->paragraph(),
			'description_ka' => 'ფილმის ქართული აღწერა',
			'release_year'   => fake()->numberBetween(1888, (int) date('Y')),
		];
	}
}
