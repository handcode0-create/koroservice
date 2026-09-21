<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('zones_intervention', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->ulid('profil_prestataire_id');
            $table->ulid('commune_id');
            $table->ulid('quartier_id')->nullable();

            $table->boolean('actif')->default(true);

            $table->timestamps();

            $table->foreign('profil_prestataire_id')
                ->references('id')
                ->on('profils_prestataires')
                ->cascadeOnDelete();

            $table->foreign('commune_id')
                ->references('id')
                ->on('communes')
                ->cascadeOnDelete();

            $table->foreign('quartier_id')
                ->references('id')
                ->on('quartiers')
                ->nullOnDelete();

            $table->index([
                'profil_prestataire_id',
                'actif',
            ]);

            $table->index([
                'commune_id',
                'quartier_id',
                'actif',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('zones_intervention');
    }
};