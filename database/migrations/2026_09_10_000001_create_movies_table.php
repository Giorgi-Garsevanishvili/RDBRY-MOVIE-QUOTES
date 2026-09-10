<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	public function up(): void
	{
		Schema::create('movies', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')->constrained()->cascadeOnDelete();
			$table->string('name_en');
			$table->string('name_ka');
			$table->string('director_en');
			$table->string('director_ka');
			$table->text('description_en');
			$table->text('description_ka');
			$table->unsignedSmallInteger('release_year');
			$table->timestamps();

			$table->index(['user_id', 'created_at']);
			$table->index(['user_id', 'release_year']);
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('movies');
	}
};
