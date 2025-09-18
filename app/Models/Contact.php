<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Contact
 *
 * @property int $id
 * @property string $name
 * @property string|null $phone
 * @property string|null $whatsapp
 * @property string|null $email
 * @property string|null $instagram
 * @property string|null $address
 * @property string|null $position
 * @property string|null $department
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Contact newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact query()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereDepartment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereInstagram($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereWhatsapp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact active()
 * @method static \Database\Factories\ContactFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Contact extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'phone',
        'whatsapp',
        'email',
        'instagram',
        'address',
        'position',
        'department',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Scope a query to only include active contacts.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the WhatsApp URL for this contact.
     */
    public function getWhatsappUrlAttribute(): ?string
    {
        if (!$this->whatsapp) {
            return null;
        }

        $number = preg_replace('/[^0-9]/', '', $this->whatsapp);
        if (substr($number, 0, 1) === '0') {
            $number = '62' . substr($number, 1);
        }

        return "https://wa.me/{$number}";
    }

    /**
     * Get the Instagram URL for this contact.
     */
    public function getInstagramUrlAttribute(): ?string
    {
        if (!$this->instagram) {
            return null;
        }

        $username = str_replace('@', '', $this->instagram);
        return "https://instagram.com/{$username}";
    }
}