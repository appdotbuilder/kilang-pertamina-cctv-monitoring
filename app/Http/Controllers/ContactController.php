<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display the contact list.
     */
    public function index(Request $request)
    {
        $contacts = Contact::where('is_active', true)
            ->orderBy('department')
            ->orderBy('name')
            ->get();

        return Inertia::render('contact/index', [
            'contacts' => $contacts->map(function ($contact) {
                return [
                    'id' => $contact->id,
                    'name' => $contact->name,
                    'phone' => $contact->phone,
                    'whatsapp' => $contact->whatsapp,
                    'whatsapp_url' => $contact->whatsapp_url,
                    'email' => $contact->email,
                    'instagram' => $contact->instagram,
                    'instagram_url' => $contact->instagram_url,
                    'address' => $contact->address,
                    'position' => $contact->position,
                    'department' => $contact->department,
                ];
            }),
        ]);
    }
}