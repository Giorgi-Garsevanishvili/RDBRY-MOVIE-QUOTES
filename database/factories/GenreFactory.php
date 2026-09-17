<?php

namespace Database\Factories;

use App\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Genre> */
class GenreFactory extends Factory
{
	/** @return array<string, mixed> */
	public function definition(): array
	{
		return [
			'name_en' => fake()->unique()->lexify('Genre ??????'),
			'name_ka' => 'ჟანრი ' . fake()->unique()->numberBetween(100000, 999999),
		];
	}
}
