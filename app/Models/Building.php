<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Building
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string|null $description
 * @property float|null $latitude
 * @property float|null $longitude
 * @property string $icon
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Room> $rooms
 * @property-read int|null $rooms_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CctvCamera> $cameras
 * @property-read int|null $cameras_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Building newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Building newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Building query()
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building active()
 * @method static \Database\Factories\BuildingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Building extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'description',
        'latitude',
        'longitude',
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
     * Get the rooms that belong to this building.
     */
    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    /**
     * Get all cameras in this building through rooms.
     */
    public function cameras()
    {
        return $this->hasManyThrough(CctvCamera::class, Room::class);
    }

    /**
     * Scope a query to only include active buildings.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the count of online cameras in this building.
     */
    public function getOnlineCamerasCountAttribute(): int
    {
        return $this->cameras()->where('status', 'online')->count();
    }

    /**
     * Get the count of offline cameras in this building.
     */
    public function getOfflineCamerasCountAttribute(): int
    {
        return $this->cameras()->where('status', 'offline')->count();
    }

    /**
     * Get the count of maintenance cameras in this building.
     */
    public function getMaintenanceCamerasCountAttribute(): int
    {
        return $this->cameras()->where('status', 'maintenance')->count();
    }
}