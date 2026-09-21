<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UtilisateurResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'nom_complet' => trim($this->prenom . ' ' . $this->nom),
            'telephone' => $this->telephone,
            'email' => $this->email,
            'photo_profil' => $this->photo_profil,
            'telephone_verifie' => (bool) $this->telephone_verifie,
            'email_verifie' => (bool) $this->email_verifie,
            'actif' => (bool) $this->actif,
            'dernier_acces_at' => $this->dernier_acces_at?->toISOString(),
            'roles' => $this->whenLoaded(
                'roles',
                fn () => $this->roles->pluck('nom')->values()->all()
            ),
            'profil_prestataire' => $this->whenLoaded(
                'profilPrestataire',
                fn () => $this->profilPrestataire
            ),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}