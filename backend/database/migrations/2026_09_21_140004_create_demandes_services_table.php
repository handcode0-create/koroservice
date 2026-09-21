<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('demandes_services', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->ulid('utilisateur_id');
            $table->ulid('categorie_service_id');
            $table->ulid('profil_prestataire_selectionne_id')->nullable();

            $table->ulid('commune_id');
            $table->ulid('quartier_id')->nullable();

            $table->string('titre', 150);
            $table->text('description');
            $table->string('repere', 200)->nullable();
            $table->text('adresse_texte')->nullable();

            $table->string('urgence', 30)->default('normale');
            $table->string('statut', 50)->default('brouillon');

            $table->date('date_souhaitee')->nullable();
            $table->time('heure_souhaitee')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('utilisateur_id')
                ->references('id')
                ->on('utilisateurs')
                ->cascadeOnDelete();

            $table->foreign('categorie_service_id')
                ->references('id')
                ->on('categories_services')
                ->restrictOnDelete();

            $table->foreign('profil_prestataire_selectionne_id')
                ->references('id')
                ->on('profils_prestataires')
                ->nullOnDelete();

            $table->foreign('commune_id')
                ->references('id')
                ->on('communes')
                ->restrictOnDelete();

            $table->foreign('quartier_id')
                ->references('id')
                ->on('quartiers')
                ->nullOnDelete();

            $table->index([
                'utilisateur_id',
                'statut',
            ]);

            $table->index([
                'categorie_service_id',
                'commune_id',
                'quartier_id',
            ]);

            $table->index('urgence');
            $table->index('date_souhaitee');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demandes_services');
    }
};