<?php

namespace App\Actions\Quotes;

use App\Models\Quote;
use Illuminate\Support\Facades\DB;

class DeleteQuote
{
	public function handle(Quote $quote): void
	{
		DB::transaction(static function () use ($quote): void {
			$quote->deleteOrFail();
		});
	}
}
