<?php

namespace DatabaseFactories;

use IlluminateDatabaseEloquentFactoriesFactory;

/**
 * @extends Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom' => fake()->unique()->word(),
            'description' => fake()->sentence(),
        ];
    }
}