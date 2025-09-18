<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\Room;
use App\Models\CctvCamera;
use App\Models\User;
use App\Models\Notification;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $stats = [
            'buildings' => [
                'total' => Building::count(),
                'active' => Building::where('is_active', true)->count(),
                'inactive' => Building::where('is_active', false)->count(),
            ],
            'rooms' => [
                'total' => Room::count(),
                'active' => Room::where('is_active', true)->count(),
                'inactive' => Room::where('is_active', false)->count(),
            ],
            'cameras' => [
                'total' => CctvCamera::count(),
                'online' => CctvCamera::where('status', 'online')->count(),
                'offline' => CctvCamera::where('status', 'offline')->count(),
                'maintenance' => CctvCamera::where('status', 'maintenance')->count(),
                'active' => CctvCamera::where('is_active', true)->count(),
            ],
            'users' => [
                'total' => User::count(),
                'online' => User::where('status', 'online')->count(),
                'offline' => User::where('status', 'offline')->count(),
                'admin' => User::where('role', 'admin')->count(),
                'security_operator' => User::where('role', 'security_operator')->count(),
            ],
        ];

        $recentNotifications = Notification::with('user')
            ->latest()
            ->limit(10)
            ->get();

        $buildingsWithCameras = Building::with('rooms.cameras')->get()->map(function ($building) {
            $cameras = $building->rooms->flatMap->cameras;

            return [
                'id' => $building->id,
                'name' => $building->name,
                'code' => $building->code,
                'total_cameras' => $cameras->count(),
                'online_cameras' => $cameras->where('status', 'online')->count(),
                'offline_cameras' => $cameras->where('status', 'offline')->count(),
                'maintenance_cameras' => $cameras->where('status', 'maintenance')->count(),
            ];
        });

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'buildings' => $buildingsWithCameras,
            'recentNotifications' => $recentNotifications,
        ]);
    }
}