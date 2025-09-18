<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CctvCamera>
 */
class CctvCameraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ipLast = fake()->numberBetween(1, 700);
        $ipAddress = "10.56.236." . str_pad((string)$ipLast, 3, '0', STR_PAD_LEFT);
        
        return [
            'room_id' => Room::factory(),
            'name' => 'CCTV Camera ' . fake()->numberBetween(1, 999),
            'ip_address' => $ipAddress,
            'rtsp_url' => "rtsp://admin:password.123@{$ipAddress}/streaming/channels/",
            'username' => 'admin',
            'password' => 'password.123',
            'latitude' => fake()->latitude(-6.2, -6.1),
            'longitude' => fake()->longitude(108.4, 108.5),
            'status' => fake()->randomElement(['online', 'offline', 'maintenance']),
            'brand' => fake()->randomElement(['Hikvision', 'Dahua', 'Axis', 'Bosch', 'Samsung']),
            'model' => fake()->randomElement(['DS-2CD2', 'IPC-HDW', 'M3045-V', 'NBN-921', 'SNO-L6083R']),
            'notes' => fake()->optional()->sentence(),
            'is_active' => fake()->boolean(95),
            'last_ping_at' => fake()->optional(70)->dateTimeBetween('-1 day', 'now'),
        ];
    }

    /**
     * Indicate that the camera is online.
     */
    public function online(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'online',
            'last_ping_at' => now(),
        ]);
    }

    /**
     * Indicate that the camera is offline.
     */
    public function offline(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'offline',
            'last_ping_at' => fake()->dateTimeBetween('-1 week', '-1 day'),
        ]);
    }

    /**
     * Indicate that the camera is under maintenance.
     */
    public function maintenance(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'maintenance',
            'last_ping_at' => fake()->dateTimeBetween('-1 day', 'now'),
        ]);
    }
}