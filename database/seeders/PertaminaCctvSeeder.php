<?php

namespace Database\Seeders;

use App\Models\Building;
use App\Models\Room;
use App\Models\CctvCamera;
use App\Models\User;
use App\Models\Contact;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PertaminaCctvSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@pertamina.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'status' => 'online',
            'theme' => 'system',
            'email_verified_at' => now(),
        ]);

        // Create security operator
        $security = User::create([
            'name' => 'Security Operator',
            'email' => 'security@pertamina.com',
            'password' => Hash::make('security123'),
            'role' => 'security_operator',
            'status' => 'online',
            'theme' => 'system',
            'email_verified_at' => now(),
        ]);

        // Define Pertamina buildings with precise coordinates
        $buildings = [
            [
                'name' => 'Gedung Kolaboratif',
                'code' => 'BLD-001',
                'description' => 'Main collaborative building for administrative purposes',
                'latitude' => -6.1944,
                'longitude' => 108.4417,
                'rooms' => ['Main Office', 'Conference Room A', 'Conference Room B', 'Reception']
            ],
            [
                'name' => 'Gerbang Utama',
                'code' => 'BLD-002',
                'description' => 'Main entrance gate with security checkpoint',
                'latitude' => -6.1940,
                'longitude' => 108.4410,
                'rooms' => ['Security Checkpoint', 'Guard Post', 'Visitor Registration']
            ],
            [
                'name' => 'AWI',
                'code' => 'BLD-003',
                'description' => 'Automated Weighing Installation facility',
                'latitude' => -6.1948,
                'longitude' => 108.4420,
                'rooms' => ['Control Room', 'Weighing Platform', 'Data Center']
            ],
            [
                'name' => 'Shelter Maintenance Area 1',
                'code' => 'BLD-004',
                'description' => 'Primary maintenance facility',
                'latitude' => -6.1952,
                'longitude' => 108.4425,
                'rooms' => ['Workshop A', 'Workshop B', 'Tool Storage', 'Equipment Room']
            ],
            [
                'name' => 'Shelter Maintenance Area 2',
                'code' => 'BLD-005',
                'description' => 'Secondary maintenance facility',
                'latitude' => -6.1955,
                'longitude' => 108.4428,
                'rooms' => ['Workshop C', 'Parts Storage', 'Inspection Area']
            ],
            [
                'name' => 'Shelter Maintenance Area 3',
                'code' => 'BLD-006',
                'description' => 'Third maintenance facility',
                'latitude' => -6.1958,
                'longitude' => 108.4430,
                'rooms' => ['Heavy Equipment Bay', 'Service Area', 'Testing Lab']
            ],
            [
                'name' => 'Shelter Maintenance Area 4',
                'code' => 'BLD-007',
                'description' => 'Fourth maintenance facility',
                'latitude' => -6.1960,
                'longitude' => 108.4432,
                'rooms' => ['Electrical Workshop', 'Mechanical Workshop', 'Storage']
            ],
            [
                'name' => 'Shelter White OM',
                'code' => 'BLD-008',
                'description' => 'Operations and Maintenance white building',
                'latitude' => -6.1945,
                'longitude' => 108.4435,
                'rooms' => ['Operations Center', 'OM Office', 'Meeting Room', 'Control Station']
            ],
            [
                'name' => 'Pintu Masuk Area Kilang Pertamina',
                'code' => 'BLD-009',
                'description' => 'Refinery area entrance gate',
                'latitude' => -6.1942,
                'longitude' => 108.4415,
                'rooms' => ['Entry Gate', 'Security Office', 'ID Check Point']
            ],
            [
                'name' => 'Marine Region III Pertamina Balongan',
                'code' => 'BLD-010',
                'description' => 'Marine operations facility',
                'latitude' => -6.1935,
                'longitude' => 108.4445,
                'rooms' => ['Marine Control', 'Jetty Office', 'Harbor Master', 'Communication Center']
            ],
            [
                'name' => 'Main Control Room',
                'code' => 'BLD-011',
                'description' => 'Central control room for refinery operations',
                'latitude' => -6.1950,
                'longitude' => 108.4440,
                'rooms' => ['Primary Control', 'Secondary Control', 'Emergency Control', 'Server Room']
            ],
            [
                'name' => 'Tank Farm Area 1',
                'code' => 'BLD-012',
                'description' => 'Primary tank farm storage area',
                'latitude' => -6.1965,
                'longitude' => 108.4450,
                'rooms' => ['Tank Monitoring', 'Pump Station', 'Loading Bay', 'Safety Station']
            ],
            [
                'name' => 'Gedung EXOR',
                'code' => 'BLD-013',
                'description' => 'EXOR building for external operations',
                'latitude' => -6.1938,
                'longitude' => 108.4422,
                'rooms' => ['EXOR Office', 'External Relations', 'Meeting Hall']
            ],
            [
                'name' => 'Area Produksi Crude Distillation Unit (CDU)',
                'code' => 'BLD-014',
                'description' => 'Crude oil distillation production unit',
                'latitude' => -6.1970,
                'longitude' => 108.4460,
                'rooms' => ['CDU Control', 'Distillation Tower', 'Heat Exchanger Area', 'Process Control']
            ],
            [
                'name' => 'HSSE Demo Room',
                'code' => 'BLD-015',
                'description' => 'Health, Safety, Security, and Environment demonstration room',
                'latitude' => -6.1943,
                'longitude' => 108.4425,
                'rooms' => ['Training Room', 'Demo Area', 'Safety Equipment Storage', 'Emergency Response']
            ],
            [
                'name' => 'Gedung Amanah',
                'code' => 'BLD-016',
                'description' => 'Amanah building with IT facilities',
                'latitude' => -6.1947,
                'longitude' => 108.4433,
                'rooms' => ['IT Office', 'IT Pubstek', 'Server Room', 'Network Center']
            ],
            [
                'name' => 'POC',
                'code' => 'BLD-017',
                'description' => 'Plant Operations Center',
                'latitude' => -6.1953,
                'longitude' => 108.4442,
                'rooms' => ['Operations Control', 'Monitoring Center', 'Communication Hub']
            ],
            [
                'name' => 'JGC',
                'code' => 'BLD-018',
                'description' => 'JGC facility building',
                'latitude' => -6.1957,
                'longitude' => 108.4447,
                'rooms' => ['JGC Office', 'Technical Room', 'Project Management']
            ]
        ];

        // Create buildings, rooms, and cameras
        $cameraIpCounter = 1;
        
        foreach ($buildings as $buildingData) {
            $building = Building::create([
                'name' => $buildingData['name'],
                'code' => $buildingData['code'],
                'description' => $buildingData['description'],
                'latitude' => $buildingData['latitude'],
                'longitude' => $buildingData['longitude'],
                'icon' => 'building',
                'is_active' => true,
            ]);

            foreach ($buildingData['rooms'] as $index => $roomName) {
                $room = Room::create([
                    'building_id' => $building->id,
                    'name' => $roomName,
                    'code' => $buildingData['code'] . '-R' . str_pad((string)($index + 1), 2, '0', STR_PAD_LEFT),
                    'description' => $roomName . ' in ' . $building->name,
                    'latitude' => $building->latitude + (random_int(-5, 5) * 0.0001),
                    'longitude' => $building->longitude + (random_int(-5, 5) * 0.0001),
                    'floor' => 'Ground Floor',
                    'icon' => 'room',
                    'is_active' => true,
                ]);

                // Create 2-5 cameras per room to reach ~700 total
                $camerasPerRoom = random_int(2, 5);
                for ($i = 1; $i <= $camerasPerRoom && $cameraIpCounter <= 700; $i++) {
                    $ipAddress = '10.56.236.' . str_pad((string)$cameraIpCounter, 3, '0', STR_PAD_LEFT);
                    
                    // Special case for IT Pubstek room
                    if ($building->name === 'Gedung Amanah' && $roomName === 'IT Pubstek') {
                        CctvCamera::create([
                            'room_id' => $room->id,
                            'name' => 'CCTV Camera ' . $cameraIpCounter,
                            'ip_address' => '10.56.236.11',
                            'rtsp_url' => 'https://10.56.236.11/#/live-preview',
                            'username' => 'admin',
                            'password' => 'password.123',
                            'latitude' => $room->latitude + (random_int(-2, 2) * 0.00001),
                            'longitude' => $room->longitude + (random_int(-2, 2) * 0.00001),
                            'status' => 'online',
                            'brand' => 'Honeywell',
                            'model' => 'MAXPRO-VMS',
                            'notes' => 'External Honeywell CCTV system',
                            'is_active' => true,
                            'last_ping_at' => now(),
                        ]);
                    } else {
                        $status = ['online', 'offline', 'maintenance'][array_rand(['online', 'offline', 'maintenance'])];
                        CctvCamera::create([
                            'room_id' => $room->id,
                            'name' => 'CCTV Camera ' . $cameraIpCounter,
                            'ip_address' => $ipAddress,
                            'rtsp_url' => "rtsp://admin:password.123@{$ipAddress}/streaming/channels/",
                            'username' => 'admin',
                            'password' => 'password.123',
                            'latitude' => $room->latitude + (random_int(-2, 2) * 0.00001),
                            'longitude' => $room->longitude + (random_int(-2, 2) * 0.00001),
                            'status' => $status,
                            'brand' => ['Hikvision', 'Dahua', 'Axis', 'Bosch'][array_rand(['Hikvision', 'Dahua', 'Axis', 'Bosch'])],
                            'model' => ['DS-2CD2', 'IPC-HDW', 'M3045-V', 'NBN-921'][array_rand(['DS-2CD2', 'IPC-HDW', 'M3045-V', 'NBN-921'])],
                            'notes' => null,
                            'is_active' => true,
                            'last_ping_at' => $status === 'online' ? now() : now()->subHours(random_int(1, 48)),
                        ]);
                    }
                    
                    $cameraIpCounter++;
                }
            }
        }

        // Create contacts
        $contacts = [
            [
                'name' => 'Security Manager',
                'phone' => '+62 234 123456',
                'whatsapp' => '08123456789',
                'email' => 'security.manager@pertamina.com',
                'instagram' => '@pertamina_security',
                'address' => 'Kilang Pertamina Internasional RU VI Balongan',
                'position' => 'Security Manager',
                'department' => 'Security'
            ],
            [
                'name' => 'Operations Manager',
                'phone' => '+62 234 123457',
                'whatsapp' => '08123456790',
                'email' => 'operations@pertamina.com',
                'instagram' => '@pertamina_ops',
                'address' => 'Kilang Pertamina Internasional RU VI Balongan',
                'position' => 'Operations Manager',
                'department' => 'Operations'
            ],
            [
                'name' => 'IT Support',
                'phone' => '+62 234 123458',
                'whatsapp' => '08123456791',
                'email' => 'it.support@pertamina.com',
                'instagram' => '@pertamina_it',
                'address' => 'Kilang Pertamina Internasional RU VI Balongan',
                'position' => 'IT Manager',
                'department' => 'IT'
            ],
            [
                'name' => 'HSE Coordinator',
                'phone' => '+62 234 123459',
                'whatsapp' => '08123456792',
                'email' => 'hse@pertamina.com',
                'instagram' => '@pertamina_hse',
                'address' => 'Kilang Pertamina Internasional RU VI Balongan',
                'position' => 'HSE Coordinator',
                'department' => 'HSE'
            ]
        ];

        foreach ($contacts as $contactData) {
            Contact::create($contactData);
        }

        $this->command->info('Pertamina CCTV system seeded successfully!');
        $this->command->info("Created {$cameraIpCounter} CCTV cameras across 18 buildings");
    }
}