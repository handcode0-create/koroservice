<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Commune extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'communes';

    protected $fillable = [
        'nom',
        'slug',
        'actif',
    ];

    protected function casts(): array
    {
        return [
            'actif' => 'boolean',
        ];
    }

    public function quartiers(): HasMany
    {
        return $this->hasMany(Quartier::class);
    }

    public function zonesIntervention(): HasMany
    {
        return $this->hasMany(ZoneIntervention::class);
    }
}