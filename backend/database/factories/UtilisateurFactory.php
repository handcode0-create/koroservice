<?php

namespace DatabaseFactories;

use IlluminateDatabaseEloquentFactoriesFactory;

/**
 * @extends Factory<\App\Models\Utilisateur>
 */
class UtilisateurFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom' => fake()->lastName(),
            'prenom' => fake()->firstName(),
            'telephone' => fake()->unique()->numerify('+225 05 ## ## ## ##'),
            'email' => fake()->unique()->safeEmail(),
            'mot_de_passe' => 'password',
            'photo_profil' => null,
            'telephone_verifie' => false,
            'email_verifie' => false,
            'actif' => true,
            'dernier_acces_at' => null,
        ];
    }
}