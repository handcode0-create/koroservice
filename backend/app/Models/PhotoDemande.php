<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PhotoDemande extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'photos_demandes';

    protected $fillable = [
        'demande_service_id',
        'chemin',
        'nom_original',
        'type_mime',
        'taille',
        'statut_moderation',
    ];

    protected function casts(): array
    {
        return [
            'taille' => 'integer',
        ];
    }

    public function demandeService(): BelongsTo
    {
        return $this->belongsTo(
            DemandeService::class,
            'demande_service_id'
        );
    }
}