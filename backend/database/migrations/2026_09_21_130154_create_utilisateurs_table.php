<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->ulid('id')->primary();

            $table->string('nom', 100);
            $table->string('prenom', 100);

            $table->string('telephone', 30)->unique();
            $table->string('email', 150)->nullable()->unique();

            $table->string('mot_de_passe');

            $table->string('photo_profil')->nullable();

            $table->boolean('telephone_verifie')->default(false);
            $table->boolean('email_verifie')->default(false);
            $table->boolean('actif')->default(true);

            $table->timestamp('dernier_acces_at')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
};