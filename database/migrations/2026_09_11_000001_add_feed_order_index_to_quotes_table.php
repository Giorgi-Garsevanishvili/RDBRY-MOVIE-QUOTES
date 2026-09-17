<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	public function up(): void
	{
		Schema::table('quotes', function (Blueprint $table) {
			$table->index(['created_at', 'id'], 'quotes_feed_order_index');
		});
	}

	public function down(): void
	{
		Schema::table('quotes', function (Blueprint $table) {
			$table->dropIndex('quotes_feed_order_index');
		});
	}
};
