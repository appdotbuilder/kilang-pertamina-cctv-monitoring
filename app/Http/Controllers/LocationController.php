<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\Room;
use App\Models\CctvCamera;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Display the location hierarchy.
     */
    public function index(Request $request)
    {
        $buildings = Building::withCount(['rooms', 'cameras'])
            ->with(['rooms' => function ($query) {
                $query->withCount('cameras')->where('is_active', true);
            }])
            ->where('is_active', true)
            ->orderBy('name')
            ->get();

        return Inertia::render('location/index', [
            'buildings' => $buildings->map(function ($building) {
                return [
                    'id' => $building->id,
                    'name' => $building->name,
                    'code' => $building->code,
                    'description' => $building->description,
                    'rooms_count' => $building->rooms_count,
                    'cameras_count' => $building->cameras_count,
                    'online_cameras_count' => $building->online_cameras_count,
                    'offline_cameras_count' => $building->offline_cameras_count,
                    'maintenance_cameras_count' => $building->maintenance_cameras_count,
                ];
            }),
        ]);
    }




}