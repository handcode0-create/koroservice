<?php

namespace Database\Seeders;

use App\Models\CategorieService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategoriesServicesSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'nom' => 'Plomberie',
                'description' => 'Installation, dépannage et réparation de plomberie.',
                'icone' => 'plumbing',
                'ordre_affichage' => 1,
            ],
            [
                'nom' => 'Électricité',
                'description' => 'Installation, dépannage et réparation électrique.',
                'icone' => 'electricity',
                'ordre_affichage' => 2,
            ],
            [
                'nom' => 'Climatisation',
                'description' => 'Installation, entretien et dépannage de climatisation.',
                'icone' => 'air-conditioning',
                'ordre_affichage' => 3,
            ],
        ];

        foreach ($categories as $categorie) {
            CategorieService::updateOrCreate(
                ['slug' => Str::slug($categorie['nom'])],
                [
                    'nom' => $categorie['nom'],
                    'description' => $categorie['description'],
                    'icone' => $categorie['icone'],
                    'actif' => true,
                    'ordre_affichage' => $categorie['ordre_affichage'],
                ]
            );
        }
    }
}