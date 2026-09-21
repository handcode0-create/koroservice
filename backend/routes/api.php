<?php

use App\Http\Controllers\Api\AuthentificationController;
use App\Http\Controllers\Api\DemandeServiceController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/inscription', [AuthentificationController::class, 'inscription']);
    Route::post('/connexion', [AuthentificationController::class, 'connexion']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthentificationController::class, 'me']);
        Route::post('/deconnexion', [AuthentificationController::class, 'deconnexion']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/demandes-services', [DemandeServiceController::class, 'index']);
    Route::post('/demandes-services', [DemandeServiceController::class, 'store']);
    Route::get('/demandes-services/{demandeService}', [DemandeServiceController::class, 'show']);
    Route::post('/demandes-services/{demandeService}/photos', [DemandeServiceController::class, 'ajouterPhoto']);
    Route::post('/demandes-services/{demandeService}/annuler', [DemandeServiceController::class, 'annuler']);
});
