<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'phone' => fake()->phoneNumber(),
            'whatsapp' => fake()->regexify('08[0-9]{8,11}'),
            'email' => fake()->unique()->safeEmail(),
            'instagram' => '@' . fake()->userName(),
            'address' => fake()->address(),
            'position' => fake()->jobTitle(),
            'department' => fake()->randomElement(['Security', 'Operations', 'Maintenance', 'Engineering', 'HSE', 'IT']),
            'is_active' => fake()->boolean(90),
        ];
    }

    /**
     * Indicate that the contact is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}