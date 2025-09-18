<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sender_id' => User::factory(),
            'receiver_id' => User::factory(),
            'subject' => fake()->sentence(6),
            'content' => fake()->paragraphs(3, true),
            'is_broadcast' => fake()->boolean(10),
            'read_at' => fake()->optional(40)->dateTimeBetween('-1 week', 'now'),
        ];
    }

    /**
     * Indicate that the message is unread.
     */
    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'read_at' => null,
        ]);
    }

    /**
     * Indicate that the message is a broadcast.
     */
    public function broadcast(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_broadcast' => true,
            'receiver_id' => null,
        ]);
    }
}