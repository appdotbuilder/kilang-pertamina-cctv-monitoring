<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Room
 *
 * @property int $id
 * @property int $building_id
 * @property string $name
 * @property string $code
 * @property string|null $description
 * @property float|null $latitude
 * @property float|null $longitude
 * @property string|null $floor
 * @property string $icon
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Building $building
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CctvCamera> $cameras
 * @property-read int|null $cameras_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Room newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Room newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Room query()
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereBuildingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereFloor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room active()
 * @method static \Database\Factories\RoomFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Room extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'building_id',
        'name',
        'code',
        'description',
        'latitude',
        'longitude',
        'floor',
        'icon',
        'is_active',
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
    ];

    /**
     * Get the building that owns this room.
     */
    public function building(): BelongsTo
    {
        return $this->belongsTo(Building::class);
    }

    /**
     * Get the cameras that belong to this room.
     */
    public function cameras(): HasMany
    {
        return $this->hasMany(CctvCamera::class);
    }

    /**
     * Scope a query to only include active rooms.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the count of online cameras in this room.
     */
    public function getOnlineCamerasCountAttribute(): int
    {
        return $this->cameras()->where('status', 'online')->count();
    }

    /**
     * Get the count of offline cameras in this room.
     */
    public function getOfflineCamerasCountAttribute(): int
    {
        return $this->cameras()->where('status', 'offline')->count();
    }

    /**
     * Get the count of maintenance cameras in this room.
     */
    public function getMaintenanceCamerasCountAttribute(): int
    {
        return $this->cameras()->where('status', 'maintenance')->count();
    }
}