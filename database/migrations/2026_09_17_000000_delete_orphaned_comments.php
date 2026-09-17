<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
	public function up(): void
	{
		DB::table('comments')
			->whereNotIn('user_id', DB::table('users')->select('id'))
			->delete();
	}

	public function down(): void
	{
	}
};
