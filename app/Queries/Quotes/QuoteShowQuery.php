<?php

namespace App\Queries\Quotes;

use App\Models\Comment;
use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;

class QuoteShowQuery
{
	/**
	 * @return array{
	 *     quote: array{
	 *         id: int,
	 *         text: array{en: string, ka: string},
	 *         imageUrl: string|null,
	 *         author: array{id: int, username: string, avatar: string|null},
	 *         movie: array{
	 *             id: int,
	 *             name: array{en: string, ka: string},
	 *             releaseYear: int,
	 *             posterUrl: string|null
	 *         },
	 *         comments: list<array{id: int, body: string, author: array{id: int, username: string, avatar: string|null}}>,
	 *         commentCount: int,
	 *         likeCount: int,
	 *         likedByViewer: bool,
	 *         canManage: bool
	 *     }
	 * }
	 */
	public function pageProps(Quote $quote, User $viewer): array
	{
		$quote
			->load([
				'media',
				'movie.media',
				'user',
				'user.media',
				'comments' => static fn ($query) => $query
					->whereHas('user')
					->oldest('created_at')
					->oldest('id'),
				'comments.user:id,username',
				'comments.user.media',
			])
			->loadExists([
				'likes as liked_by_viewer' => static fn ($likes) => $likes
					->where('user_id', $viewer->id),
			])
			->loadCount([
				'comments' => static fn ($query) => $query->whereHas('user'),
				'likes',
			]);
		$movie = $quote->movie;

		return [
			'quote' => [
				'id'   => $quote->id,
				'text' => [
					'en' => $quote->text_en,
					'ka' => $quote->text_ka,
				],
				'imageUrl' => $quote->getFirstMediaUrl(Quote::IMAGE_COLLECTION) ?: null,
				'author'   => [
					'id'       => $quote->user->id,
					'username' => $quote->user->username,
					'avatar'   => $quote->user->avatar,
				],
				'movie'        => $this->movieData($movie),
				'comments'     => array_values($quote->comments
					->filter(static fn (Comment $comment): bool => $comment->user !== null)
					->map(static fn (Comment $comment): array => [
						'id'     => $comment->id,
						'body'   => $comment->body,
						'author' => [
							'id'       => $comment->user->id,
							'username' => $comment->user->username,
							'avatar'   => $comment->user->avatar,
						],
					])
					->all()),
				'commentCount'  => (int) $quote->comments_count,
				'likeCount'     => (int) $quote->likes_count,
				'likedByViewer' => (bool) $quote->liked_by_viewer,
				'canManage'     => $viewer->can('update', $quote),
			],
		];
	}

	/**
	 * @return array{
	 *     id: int,
	 *     name: array{en: string, ka: string},
	 *     releaseYear: int,
	 *     posterUrl: string|null
	 * }
	 */
	private function movieData(Movie $movie): array
	{
		return [
			'id'   => $movie->id,
			'name' => [
				'en' => $movie->name_en,
				'ka' => $movie->name_ka,
			],
			'releaseYear' => $movie->release_year,
			'posterUrl'   => $movie->getFirstMediaUrl(Movie::POSTER_COLLECTION) ?: null,
		];
	}
}
