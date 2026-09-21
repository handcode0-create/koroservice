<?php

namespace DatabaseFactories;

use App\Models\Utilisateur;
use IlluminateDatabaseEloquentFactoriesFactory;

/**
 * @extends Factory<\App\Models\ProfilPrestataire>
 */
class ProfilPrestataireFactory extends Factory
{
    public function definition(): array
    {
        $tarifMinimum = fake()->numberBetween(5000, 25000);
        $tarifMaximum = fake()->numberBetween(
            $tarifMinimum,
            $tarifMinimum + 50000
        );

        return [
            'utilisateur_id' => Utilisateur::factory(),
            'nom_entreprise' => fake()->optional()->company(),
            'nom_affichage' => fake()->name(),
            'description' => fake()->paragraph(),
            'metier_principal' => fake()->randomElement([
                'Plombier',
                'Électricien',
                'Technicien climatisation',
            ]),
            'annees_experience' => fake()->numberBetween(1, 20),
            'tarif_minimum' => $tarifMinimum,
            'tarif_maximum' => $tarifMaximum,
            'statut_verification' => 'brouillon',
            'statut_disponibilite' => 'indisponible',
            'note_moyenne' => 0,
            'nombre_avis' => 0,
            'nombre_interventions' => 0,
            'verifie_at' => null,
        ];
    }
}