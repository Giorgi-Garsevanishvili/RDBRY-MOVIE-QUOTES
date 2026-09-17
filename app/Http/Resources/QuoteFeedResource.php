<?php

namespace App\Http\Resources;

use App\Models\Comment;
use App\Models\Quote;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Quote */
class QuoteFeedResource extends JsonResource
{
	/**
	 * @return array{
	 *     id: int,
	 *     text: array{en: string, ka: string},
	 *     imageUrl: string|null,
	 *     author: array{id: int, username: string, avatar: string|null},
	 *     movie: array{id: int, name: array{en: string, ka: string}, releaseYear: int},
	 *     comments: AnonymousResourceCollection,
	 *     commentCount: int,
	 *     likeCount: int,
	 *     likedByViewer: bool
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
				'avatar'   => $this->user->avatar,
			],
			'movie' => [
				'id'   => $this->movie->id,
				'name' => [
					'en' => $this->movie->name_en,
					'ka' => $this->movie->name_ka,
				],
				'releaseYear' => $this->movie->release_year,
			],
			'comments' => CommentResource::collection(
				$this->comments
					->filter(static fn (Comment $comment): bool => $comment->user !== null)
					->values(),
			),
			'commentCount'  => (int) $this->comments_count,
			'likeCount'     => (int) $this->likes_count,
			'likedByViewer' => (bool) $this->liked_by_viewer,
		];
	}
}
