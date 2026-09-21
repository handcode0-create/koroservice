<?php

namespace App\Http\Requests\Demandes;

use App\Http\Requests\ApiFormRequest;
use App\Enums\NiveauUrgence;

class CreerDemandeServiceRequest extends ApiFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'categorie_service_id' => [
                'required',
                'string',
                'exists:categories_services,id',
            ],
            'profil_prestataire_selectionne_id' => [
                'nullable',
                'string',
                'exists:profils_prestataires,id',
            ],
            'commune_id' => [
                'required',
                'string',
                'exists:communes,id',
            ],
            'quartier_id' => [
                'nullable',
                'string',
                'exists:quartiers,id',
            ],
            'titre' => [
                'required',
                'string',
                'max:150',
            ],
            'description' => [
                'required',
                'string',
            ],
            'repere' => [
                'nullable',
                'string',
                'max:200',
            ],
            'adresse_texte' => [
                'nullable',
                'string',
            ],
            'urgence' => [
                'required',
                'string',
                'in:' . implode(',', array_column(NiveauUrgence::cases(), 'value')),
            ],
            'date_souhaitee' => [
                'nullable',
                'date',
            ],
            'heure_souhaitee' => [
                'nullable',
                'date_format:H:i',
            ],
        ];
    }
}