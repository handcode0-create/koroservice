<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profils_prestataires_categories', function (Blueprint $table) {
            $table->ulid('profil_prestataire_id');
            $table->ulid('categorie_service_id');

            $table->boolean('principal')->default(false);

            $table->primary([
                'profil_prestataire_id',
                'categorie_service_id',
            ]);

            $table->foreign('profil_prestataire_id')
                ->references('id')
                ->on('profils_prestataires')
                ->cascadeOnDelete();

            $table->foreign('categorie_service_id')
                ->references('id')
                ->on('categories_services')
                ->cascadeOnDelete();

            $table->index([
                'categorie_service_id',
                'principal',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profils_prestataires_categories');
    }
};