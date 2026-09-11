<?php

namespace App\Http\Resources;

use App\Models\Quote;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Quote */
class QuoteFeedResource extends JsonResource
{
	/**
	 * @return array{
	 *     id: int,
	 *     text: array{en: string, ka: string},
	 *     imageUrl: string|null,
	 *     author: array{id: int, username: string},
	 *     movie: array{id: int, name: array{en: string, ka: string}, releaseYear: int},
	 *     commentCount: int,
	 *     likeCount: int
	 * }
	 */
	public function toArray(Request $request): array
	{
		return [
			'id'   => $this->id,
			'text' => [
				'en' => $this->text_en,
				'ka' => $this->text_ka,
			],
			'imageUrl' => $this->getFirstMediaUrl(Quote::IMAGE_COLLECTION) ?: null,
			'author'   => [
				'id'       => $this->user->id,
				'username' => $this->user->username,
			],
			'movie' => [
				'id'   => $this->movie->id,
				'name' => [
					'en' => $this->movie->name_en,
					'ka' => $this->movie->name_ka,
				],
				'releaseYear' => $this->movie->release_year,
			],
			'commentCount' => (int) $this->comments_count,
			'likeCount'    => (int) $this->likes_count,
		];
	}
}
