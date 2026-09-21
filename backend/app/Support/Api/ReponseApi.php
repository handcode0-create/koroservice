<?php

namespace App\Support\Api;

use Illuminate\Http\JsonResponse;

class ReponseApi
{
    public static function succes(
        mixed $data = null,
        array $meta = [],
        int $status = 200
    ): JsonResponse {
        return response()->json([
            'success' => true,
            'data' => $data,
            'meta' => $meta,
        ], $status);
    }

    public static function erreur(
        string $code,
        string $message,
        array $fields = [],
        int $status = 400
    ): JsonResponse {
        $error = [
            'code' => $code,
            'message' => $message,
        ];

        if ($fields !== []) {
            $error['fields'] = $fields;
        }

        return response()->json([
            'success' => false,
            'error' => $error,
        ], $status);
    }
}