<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('historiques_demandes', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->ulid('demande_service_id');
            $table->ulid('utilisateur_id');

            $table->string('ancien_statut', 50)->nullable();
            $table->string('nouveau_statut', 50);
            $table->text('commentaire')->nullable();

            $table->timestamp('created_at')->useCurrent();

            $table->foreign('demande_service_id')
                ->references('id')
                ->on('demandes_services')
                ->cascadeOnDelete();

            $table->foreign('utilisateur_id')
                ->references('id')
                ->on('utilisateurs')
                ->restrictOnDelete();

            $table->index([
                'demande_service_id',
                'created_at',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('historiques_demandes');
    }
};