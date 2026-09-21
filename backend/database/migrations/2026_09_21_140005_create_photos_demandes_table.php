<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('photos_demandes', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->ulid('demande_service_id');

            $table->string('chemin', 500);
            $table->string('nom_original', 255);
            $table->string('type_mime', 100);
            $table->unsignedBigInteger('taille');
            $table->string('statut_moderation', 30)->default('en attente');

            $table->timestamps();

            $table->foreign('demande_service_id')
                ->references('id')
                ->on('demandes_services')
                ->cascadeOnDelete();

            $table->index([
                'demande_service_id',
                'statut_moderation',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('photos_demandes');
    }
};