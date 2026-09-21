<?php

namespace App\Http\Requests\Demandes;

use App\Http\Requests\ApiFormRequest;

class AnnulerDemandeServiceRequest extends ApiFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'commentaire' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ];
    }
}