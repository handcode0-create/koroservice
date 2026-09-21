<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profils_prestataires', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->ulid('utilisateur_id')->unique();

            $table->string('nom_entreprise', 150)->nullable();
            $table->string('nom_affichage', 150);
            $table->text('description')->nullable();
            $table->string('metier_principal', 100)->nullable();

            $table->unsignedSmallInteger('annees_experience')->default(0);

            $table->decimal('tarif_minimum', 10, 2)->nullable();
            $table->decimal('tarif_maximum', 10, 2)->nullable();

            $table->string('statut_verification', 50)->default('brouillon');
            $table->string('statut_disponibilite', 30)->default('indisponible');

            $table->decimal('note_moyenne', 3, 2)->default(0);
            $table->unsignedInteger('nombre_avis')->default(0);
            $table->unsignedInteger('nombre_interventions')->default(0);

            $table->timestamp('verifie_at')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('utilisateur_id')
                ->references('id')
                ->on('utilisateurs')
                ->cascadeOnDelete();

            $table->index([
                'statut_verification',
                'statut_disponibilite',
            ]);

            $table->index('metier_principal');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profils_prestataires');
    }
};