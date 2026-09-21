<?php

namespace App\Http\Requests;

use App\Support\Api\ReponseApi;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

abstract class ApiFormRequest extends FormRequest
{
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            ReponseApi::erreur(
                code: 'VALIDATION_ERROR',
                message: 'Les données sont invalides.',
                fields: $validator->errors()->toArray(),
                status: 422
            )
        );
    }
}