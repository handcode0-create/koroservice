<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ApiFormRequest;

class InscriptionRequest extends ApiFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => ['required', 'string', 'max:100'],
            'prenom' => ['required', 'string', 'max:100'],
            'telephone' => ['required', 'string', 'max:30', 'unique:utilisateurs,telephone'],
            'email' => ['nullable', 'email', 'max:150', 'unique:utilisateurs,email'],
            'mot_de_passe' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }
}