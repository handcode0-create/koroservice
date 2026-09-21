<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HistoriqueDemande extends Model
{
    use HasUlids;

    public const UPDATED_AT = null;

    protected $table = 'historiques_demandes';

    protected $fillable = [
        'demande_service_id',
        'utilisateur_id',
        'ancien_statut',
        'nouveau_statut',
        'commentaire',
    ];

    public function demandeService(): BelongsTo
    {
        return $this->belongsTo(
            DemandeService::class,
            'demande_service_id'
        );
    }

    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(Utilisateur::class);
    }
}