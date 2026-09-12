<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Carbon;

/**
 * @property string               $id
 * @property string               $type
 * @property string               $notifiable_type
 * @property int                  $notifiable_id
 * @property int                  $actor_id
 * @property int                  $quote_id
 * @property array<string, mixed> $data
 * @property Carbon|null          $read_at
 * @property Carbon|null          $created_at
 * @property Carbon|null          $updated_at
 * @property User                 $actor
 * @property Quote                $quote
 */
class QuoteNotification extends DatabaseNotification
{
	protected $dateFormat = 'Y-m-d H:i:s.u';

	/** @return BelongsTo<User, $this> */
	public function actor(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}

	/** @return BelongsTo<Quote, $this> */
	public function quote(): BelongsTo
	{
		return $this->belongsTo(Quote::class);
	}
}
