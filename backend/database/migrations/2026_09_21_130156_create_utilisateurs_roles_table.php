<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('utilisateurs_roles', function (Blueprint $table) {
            $table->ulid('utilisateur_id');
            $table->ulid('role_id');

            $table->primary([
                'utilisateur_id',
                'role_id',
            ]);

            $table->foreign('utilisateur_id')
                ->references('id')
                ->on('utilisateurs')
                ->cascadeOnDelete();

            $table->foreign('role_id')
                ->references('id')
                ->on('roles')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('utilisateurs_roles');
    }
};