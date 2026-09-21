<?php

use App\Http\Controllers\Api\AuthentificationController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/inscription', [AuthentificationController::class, 'inscription']);
    Route::post('/connexion', [AuthentificationController::class, 'connexion']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthentificationController::class, 'me']);
        Route::post('/deconnexion', [AuthentificationController::class, 'deconnexion']);
    });
});
