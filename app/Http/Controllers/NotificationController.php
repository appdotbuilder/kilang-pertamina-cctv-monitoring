<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display notifications.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $notifications = Notification::where(function ($query) use ($user) {
            $query->where('user_id', $user->id)
                  ->orWhere('is_system', true);
        })
        ->with('user:id,name')
        ->latest()
        ->paginate(20);

        return Inertia::render('notification/index', [
            'notifications' => $notifications,
        ]);
    }


}