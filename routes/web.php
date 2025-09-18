<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MapController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Maps
    Route::get('maps', [MapController::class, 'index'])->name('maps.index');
    
    // Location hierarchy
    Route::get('location', [LocationController::class, 'index'])->name('location.index');
    
    // Contacts
    Route::get('contact', [ContactController::class, 'index'])->name('contact.index');
    
    // Notifications
    Route::get('notifications', [NotificationController::class, 'index'])->name('notifications.index');
    
    // Messages  
    Route::get('messages', [MessageController::class, 'index'])->name('messages.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
