<?php

namespace Database\Factories;

use App\Models\Like;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Like> */
class LikeFactory extends Factory
{
	/** @return array<string, mixed> */
	public function definition(): array
	{
		return [
			'user_id'  => User::factory(),
			'quote_id' => Quote::factory(),
		];
	}
}
