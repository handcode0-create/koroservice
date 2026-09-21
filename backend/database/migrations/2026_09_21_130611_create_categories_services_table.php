<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories_services', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->string('nom', 100);
            $table->string('slug', 120)->unique();
            $table->text('description')->nullable();
            $table->string('icone', 100)->nullable();

            $table->boolean('actif')->default(true);
            $table->unsignedSmallInteger('ordre_affichage')->default(0);

            $table->timestamps();

            $table->index(['actif', 'ordre_affichage']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories_services');
    }
};