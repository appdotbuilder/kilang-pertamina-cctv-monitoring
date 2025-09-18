<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Building>
 */
class BuildingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company() . ' Building',
            'code' => strtoupper(fake()->unique()->lexify('BLD-???')),
            'description' => fake()->paragraph(),
            'latitude' => fake()->latitude(-6.2, -6.1), // Balongan area
            'longitude' => fake()->longitude(108.4, 108.5),
            'icon' => 'building',
            'is_active' => fake()->boolean(90),
        ];
    }

    /**
     * Indicate that the building is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}