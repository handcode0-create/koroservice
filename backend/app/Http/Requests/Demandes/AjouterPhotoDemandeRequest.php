<?php

namespace App\Http\Requests\Demandes;

use App\Http\Requests\ApiFormRequest;

class AjouterPhotoDemandeRequest extends ApiFormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'photo' => [
                'required',
                'file',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:10240',
            ],
        ];
    }
}