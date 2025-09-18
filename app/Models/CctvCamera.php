<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\CctvCamera
 *
 * @property int $id
 * @property int $room_id
 * @property string $name
 * @property string $ip_address
 * @property string $rtsp_url
 * @property string $username
 * @property string $password
 * @property float|null $latitude
 * @property float|null $longitude
 * @property string $status
 * @property string|null $brand
 * @property string|null $model
 * @property string|null $notes
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $last_ping_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Room $room
 * @property-read \App\Models\Building $building
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera query()
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereBrand($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereLastPingAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereModel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereRoomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereRtspUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera online()
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera offline()
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera maintenance()
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera active()
 * @method static \Database\Factories\CctvCameraFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class CctvCamera extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'room_id',
        'name',
        'ip_address',
        'rtsp_url',
        'username',
        'password',
        'latitude',
        'longitude',
        'status',
        'brand',
        'model',
        'notes',
        'is_active',
        'last_ping_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'is_active' => 'boolean',
        'last_ping_at' => 'datetime',
    ];

    /**
     * Get the room that owns this camera.
     */
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * Get the building through the room.
     */
    public function building()
    {
        return $this->room->building ?? null;
    }

    /**
     * Scope a query to only include online cameras.
     */
    public function scopeOnline($query)
    {
        return $query->where('status', 'online');
    }

    /**
     * Scope a query to only include offline cameras.
     */
    public function scopeOffline($query)
    {
        return $query->where('status', 'offline');
    }

    /**
     * Scope a query to only include maintenance cameras.
     */
    public function scopeMaintenance($query)
    {
        return $query->where('status', 'maintenance');
    }

    /**
     * Scope a query to only include active cameras.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the HLS stream URL for this camera.
     */
    public function getHlsUrlAttribute(): string
    {
        return "/live/{$this->ip_address}/playlist.m3u8";
    }

    /**
     * Check if the camera is reachable.
     */
    public function isReachable(): bool
    {
        // Use a safer ping implementation or service
        return $this->status === 'online';
    }

    /**
     * Update the camera status based on reachability.
     */
    public function updateStatus(): void
    {
        if ($this->isReachable()) {
            $this->update([
                'status' => 'online',
                'last_ping_at' => now(),
            ]);
        } else {
            $this->update(['status' => 'offline']);
        }
    }
}