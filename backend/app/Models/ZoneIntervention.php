<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ZoneIntervention extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'zones_intervention';

    protected $fillable = [
        'profil_prestataire_id',
        'commune_id',
        'quartier_id',
        'actif',
    ];

    protected function casts(): array
    {
        return [
            'actif' => 'boolean',
        ];
    }

    public function profilPrestataire(): BelongsTo
    {
        return $this->belongsTo(
            ProfilPrestataire::class,
            'profil_prestataire_id'
        );
    }

    public function commune(): BelongsTo
    {
        return $this->belongsTo(Commune::class);
    }

    public function quartier(): BelongsTo
    {
        return $this->belongsTo(Quartier::class);
    }
}