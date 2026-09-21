<?php

namespace App\Models;

use App\Enums\NiveauUrgence;
use App\Enums\StatutDemande;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class DemandeService extends Model
{
    use HasFactory, HasUlids, SoftDeletes;

    protected $table = 'demandes_services';

    protected $fillable = [
        'utilisateur_id',
        'categorie_service_id',
        'profil_prestataire_selectionne_id',
        'commune_id',
        'quartier_id',
        'titre',
        'description',
        'repere',
        'adresse_texte',
        'urgence',
        'statut',
        'date_souhaitee',
        'heure_souhaitee',
    ];

    protected function casts(): array
    {
        return [
            'urgence' => NiveauUrgence::class,
            'statut' => StatutDemande::class,
            'date_souhaitee' => 'date',
            'heure_souhaitee' => 'datetime:H:i',
        ];
    }

    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function categorieService(): BelongsTo
    {
        return $this->belongsTo(CategorieService::class);
    }

    public function profilPrestataireSelectionne(): BelongsTo
    {
        return $this->belongsTo(
            ProfilPrestataire::class,
            'profil_prestataire_selectionne_id'
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

    public function photos(): HasMany
    {
        return $this->hasMany(PhotoDemande::class, 'demande_service_id');
    }

    public function historiques(): HasMany
    {
        return $this->hasMany(
            HistoriqueDemande::class,
            'demande_service_id'
        )->oldest('created_at');
    }
}