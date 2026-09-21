<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'nom' => 'client',
                'description' => 'Utilisateur qui publie et demande des services.',
            ],
            [
                'nom' => 'prestataire',
                'description' => 'Professionnel qui propose ses services.',
            ],
            [
                'nom' => 'administrateur',
                'description' => "Utilisateur chargé de l’administration de Kôrô Services.",
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['nom' => $role['nom']],
                ['description' => $role['description']]
            );
        }
    }
}