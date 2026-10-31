<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerGroup extends Model
{
    use HasFactory;

    protected $table = 'customer_groups';

    protected $fillable = [
        'name',
        'discount_percentage',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'discount_percentage' => 'float',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    /**
     * Users assigned to this group (via preferences->vip_group)
     */
    public function getUsersQuery()
    {
        return User::query()->where('preferences->vip_group', $this->name);
    }
}

