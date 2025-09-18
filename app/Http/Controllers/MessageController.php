<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display messages.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $messages = Message::where(function ($query) use ($user) {
            $query->where('receiver_id', $user->id)
                  ->orWhere('sender_id', $user->id)
                  ->orWhere('is_broadcast', true);
        })
        ->with(['sender:id,name', 'receiver:id,name'])
        ->latest()
        ->paginate(20);

        $users = User::where('id', '!=', $user->id)
            ->select('id', 'name', 'role')
            ->orderBy('name')
            ->get();

        return Inertia::render('message/index', [
            'messages' => $messages,
            'users' => $users,
        ]);
    }


}