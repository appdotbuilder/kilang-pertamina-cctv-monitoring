<?php

namespace Database\Factories;

use App\Models\Building;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'building_id' => Building::factory(),
            'name' => fake()->randomElement(['Control Room', 'Office', 'Storage', 'Meeting Room', 'Server Room', 'Security Room']) . ' ' . fake()->numberBetween(1, 20),
            'code' => strtoupper(fake()->unique()->lexify('RM-???')),
            'description' => fake()->sentence(),
            'latitude' => fake()->latitude(-6.2, -6.1),
            'longitude' => fake()->longitude(108.4, 108.5),
            'floor' => fake()->randomElement(['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor']),
            'icon' => 'room',
            'is_active' => fake()->boolean(95),
        ];
    }

    /**
     * Indicate that the room is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}