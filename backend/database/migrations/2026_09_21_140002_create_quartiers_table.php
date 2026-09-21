<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quartiers', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->ulid('commune_id');

            $table->string('nom', 120);
            $table->string('slug', 140);

            $table->boolean('actif')->default(true);

            $table->timestamps();

            $table->foreign('commune_id')
                ->references('id')
                ->on('communes')
                ->cascadeOnDelete();

            $table->unique([
                'commune_id',
                'slug',
            ]);

            $table->index([
                'commune_id',
                'actif',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quartiers');
    }
};