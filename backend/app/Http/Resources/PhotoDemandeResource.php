<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PhotoDemandeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom_original' => $this->nom_original,
            'type_mime' => $this->type_mime,
            'taille' => $this->taille,
            'url' => $this->chemin
                ? asset('storage/' . ltrim($this->chemin, '/'))
                : null,
            'statut_moderation' => $this->statut_moderation,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}