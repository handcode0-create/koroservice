<?php

namespace App\Models;

use App\Enums\StatutDisponibilitePrestataire;
use App\Enums\StatutVerificationPrestataire;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProfilPrestataire extends \Illuminate\Database\Eloquent\Model
{
    use HasFactory, HasUlids, SoftDeletes;

    protected $table = 'profils_prestataires';

    protected $fillable = [
        'utilisateur_id',
        'nom_entreprise',
        'nom_affichage',
        'description',
        'metier_principal',
        'annees_experience',
        'tarif_minimum',
        'tarif_maximum',
        'statut_verification',
        'statut_disponibilite',
        'note_moyenne',
        'nombre_avis',
        'nombre_interventions',
        'verifie_at',
    ];

    protected function casts(): array
    {
        return [
            'annees_experience' => 'integer',
            'tarif_minimum' => 'decimal:2',
            'tarif_maximum' => 'decimal:2',
            'statut_verification' => StatutVerificationPrestataire::class,
            'statut_disponibilite' => StatutDisponibilitePrestataire::class,
            'note_moyenne' => 'decimal:2',
            'nombre_avis' => 'integer',
            'nombre_interventions' => 'integer',
            'verifie_at' => 'datetime',
        ];
    }

    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(
            CategorieService::class,
            'profils_prestataires_categories',
            'profil_prestataire_id',
            'categorie_service_id'
        )->withPivot('principal');
    }

    public function zonesIntervention(): HasMany
    {
        return $this->hasMany(
            ZoneIntervention::class,
            'profil_prestataire_id'
        );
    }
}