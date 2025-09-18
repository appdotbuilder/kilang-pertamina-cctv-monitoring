<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\Room;
use App\Models\CctvCamera;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapController extends Controller
{
    /**
     * Display the interactive map.
     */
    public function index(Request $request)
    {
        $buildings = Building::with(['rooms.cameras' => function ($query) {
            $query->where('is_active', true);
        }])->where('is_active', true)->get();

        // Transform buildings for map display
        $mapBuildings = [];
        foreach ($buildings as $building) {
            $allCameras = $building->rooms->flatMap->cameras;
            
            $rooms = [];
            foreach ($building->rooms as $room) {
                $cameras = [];
                foreach ($room->cameras as $camera) {
                    $cameras[] = [
                        'id' => $camera->id,
                        'name' => $camera->name,
                        'ip_address' => $camera->ip_address,
                        'latitude' => $camera->latitude ?? 0.0,
                        'longitude' => $camera->longitude ?? 0.0,
                        'status' => $camera->status,
                        'brand' => $camera->brand ?? '',
                        'model' => $camera->model ?? '',
                        'hls_url' => $camera->hls_url,
                        'rtsp_url' => $camera->rtsp_url,
                        'last_ping_at' => $camera->last_ping_at,
                    ];
                }

                $rooms[] = [
                    'id' => $room->id,
                    'name' => $room->name,
                    'code' => $room->code,
                    'latitude' => $room->latitude ?? 0.0,
                    'longitude' => $room->longitude ?? 0.0,
                    'cameras' => $cameras,
                ];
            }

            $mapBuildings[] = [
                'id' => $building->id,
                'name' => $building->name,
                'code' => $building->code,
                'description' => $building->description,
                'latitude' => $building->latitude ?? 0.0,
                'longitude' => $building->longitude ?? 0.0,
                'icon' => $building->icon,
                'total_cameras' => $allCameras->count(),
                'online_cameras' => $allCameras->where('status', 'online')->count(),
                'offline_cameras' => $allCameras->where('status', 'offline')->count(),
                'maintenance_cameras' => $allCameras->where('status', 'maintenance')->count(),
                'rooms' => $rooms,
            ];
        }

        $stats = [
            'total_buildings' => $buildings->count(),
            'total_cameras' => CctvCamera::where('is_active', true)->count(),
            'online_cameras' => CctvCamera::where('status', 'online')->where('is_active', true)->count(),
            'offline_cameras' => CctvCamera::where('status', 'offline')->where('is_active', true)->count(),
            'maintenance_cameras' => CctvCamera::where('status', 'maintenance')->where('is_active', true)->count(),
        ];

        return Inertia::render('maps/index', [
            'buildings' => $mapBuildings,
            'stats' => $stats,
        ]);
    }




}