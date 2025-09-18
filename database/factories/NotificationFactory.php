<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['login', 'camera_offline', 'system_alert', 'maintenance', 'security_breach'];
        $type = fake()->randomElement($types);
        
        $titles = [
            'login' => 'User Login',
            'camera_offline' => 'Camera Offline',
            'system_alert' => 'System Alert',
            'maintenance' => 'Maintenance Required',
            'security_breach' => 'Security Breach Detected',
        ];

        $messages = [
            'login' => 'User has logged into the system',
            'camera_offline' => 'CCTV camera has gone offline and requires attention',
            'system_alert' => 'System maintenance window scheduled',
            'maintenance' => 'Equipment requires scheduled maintenance',
            'security_breach' => 'Unauthorized access attempt detected',
        ];

        return [
            'user_id' => User::factory(),
            'type' => $type,
            'title' => $titles[$type] ?? 'System Notification',
            'message' => $messages[$type] ?? 'System notification',
            'data' => fake()->optional()->randomElement([
                ['camera_id' => fake()->numberBetween(1, 100)],
                ['building_id' => fake()->numberBetween(1, 18)],
                ['ip_address' => '10.56.236.' . fake()->numberBetween(1, 700)],
            ]),
            'read_at' => fake()->optional(30)->dateTimeBetween('-1 week', 'now'),
            'is_system' => fake()->boolean(20),
        ];
    }



    /**
     * Indicate that the notification is unread.
     */
    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'read_at' => null,
        ]);
    }

    /**
     * Indicate that the notification is a system notification.
     */
    public function system(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_system' => true,
            'user_id' => null,
        ]);
    }
}