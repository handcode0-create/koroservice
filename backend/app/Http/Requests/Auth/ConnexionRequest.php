<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ApiFormRequest;

class ConnexionRequest extends ApiFormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'telephone' => ['required', 'string', 'max:30'],
            'mot_de_passe' => ['required', 'string'],
        ];
    }
}