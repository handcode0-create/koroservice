<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DemandeServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'titre' => $this->titre,
            'description' => $this->description,
            'repere' => $this->repere,
            'adresse_texte' => $this->adresse_texte,
            'urgence' => [
                'value' => $this->urgence?->value,
                'label' => $this->urgence?->label(),
            ],
            'statut' => [
                'value' => $this->statut?->value,
                'label' => $this->statut?->label(),
            ],
            'date_souhaitee' => $this->date_souhaitee?->toDateString(),
            'heure_souhaitee' => $this->heure_souhaitee?->format('H:i'),
            'categorie_service' => $this->whenLoaded(
                'categorieService',
                fn () => [
                    'id' => $this->categorieService->id,
                    'nom' => $this->categorieService->nom,
                    'slug' => $this->categorieService->slug,
                ]
            ),
            'commune' => $this->whenLoaded(
                'commune',
                fn () => [
                    'id' => $this->commune->id,
                    'nom' => $this->commune->nom,
                ]
            ),
            'quartier' => $this->whenLoaded(
                'quartier',
                fn () => $this->quartier ? [
                    'id' => $this->quartier->id,
                    'nom' => $this->quartier->nom,
                ] : null
            ),
            'prestataire_selectionne' => $this->whenLoaded(
                'profilPrestataireSelectionne',
                fn () => $this->profilPrestataireSelectionne ? [
                    'id' => $this->profilPrestataireSelectionne->id,
                    'nom_affichage' => $this->profilPrestataireSelectionne->nom_affichage,
                ] : null
            ),
            'photos' => PhotoDemandeResource::collection(
                $this->whenLoaded('photos')
            ),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}