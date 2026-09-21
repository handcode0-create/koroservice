<?php

namespace DatabaseFactories;

use IlluminateDatabaseEloquentFactoriesFactory;
use Illuminate\Support\Str;

/**
 * @extends Factory<\App\Models\CategorieService>
 */
class CategorieServiceFactory extends Factory
{
    public function definition(): array
    {
        $nom = fake()->words(2, true);

        return [
            'nom' => $nom,
            'slug' => Str::slug($nom),
            'description' => fake()->sentence(),
            'icone' => null,
            'actif' => true,
            'ordre_affichage' => fake()->numberBetween(0, 20),
        ];
    }
}