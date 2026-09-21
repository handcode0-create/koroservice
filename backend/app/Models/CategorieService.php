<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CategorieService extends Model
{
    use HasFactory, HasUlids;

    protected $table = 'categories_services';

    protected $fillable = [
        'nom',
        'slug',
        'description',
        'icone',
        'actif',
        'ordre_affichage',
    ];

    protected function casts(): array
    {
        return [
            'actif' => 'boolean',
            'ordre_affichage' => 'integer',
        ];
    }

    public function profilsPrestataires(): BelongsToMany
    {
        return $this->belongsToMany(
            ProfilPrestataire::class,
            'profils_prestataires_categories',
            'categorie_service_id',
            'profil_prestataire_id'
        )->withPivot('principal');
    }

    public function demandesServices(): HasMany
    {
        return $this->hasMany(DemandeService::class, 'categorie_service_id');
    }
}