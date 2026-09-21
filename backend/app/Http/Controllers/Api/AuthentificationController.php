<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ConnexionRequest;
use App\Http\Requests\Auth\InscriptionRequest;
use App\Http\Resources\UtilisateurResource;
use App\Models\Utilisateur;
use App\Support\Api\ReponseApi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthentificationController extends Controller
{
    public function inscription(InscriptionRequest $request): JsonResponse
    {
        $utilisateur = Utilisateur::create([
            'nom' => $request->string('nom')->toString(),
            'prenom' => $request->string('prenom')->toString(),
            'telephone' => $request->string('telephone')->toString(),
            'email' => $request->input('email'),
            'mot_de_passe' => $request->string('mot_de_passe')->toString(),
            'actif' => true,
        ]);

        $roleClient = \App\Models\Role::where('nom', 'client')->first();

        if ($roleClient !== null) {
            $utilisateur->roles()->syncWithoutDetaching([$roleClient->id]);
        }

        $utilisateur->load('roles', 'profilPrestataire');

        $token = $utilisateur->createToken('mobile')->plainTextToken;

        return ReponseApi::succes(
            data: [
                'utilisateur' => new UtilisateurResource($utilisateur),
                'token' => $token,
                'token_type' => 'Bearer',
            ],
            status: 201
        );
    }

    public function connexion(ConnexionRequest $request): JsonResponse
    {
        $utilisateur = Utilisateur::query()
            ->where('telephone', $request->string('telephone')->toString())
            ->first();

        if (
            $utilisateur === null
            || ! Hash::check(
                $request->string('mot_de_passe')->toString(),
                $utilisateur->mot_de_passe
            )
        ) {
            return ReponseApi::erreur(
                code: 'UNAUTHORIZED',
                message: 'Les identifiants sont incorrects.',
                status: 401
            );
        }

        if (! $utilisateur->actif) {
            return ReponseApi::erreur(
                code: 'ACCOUNT_INACTIVE',
                message: 'Ce compte est désactivé.',
                status: 403
            );
        }

        $utilisateur->forceFill([
            'dernier_acces_at' => now(),
        ])->save();

        $utilisateur->load('roles', 'profilPrestataire');

        $token = $utilisateur->createToken('mobile')->plainTextToken;

        return ReponseApi::succes([
            'utilisateur' => new UtilisateurResource($utilisateur),
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $utilisateur = $request->user();

        $utilisateur->load('roles', 'profilPrestataire');

        return ReponseApi::succes(
            data: [
                'utilisateur' => new UtilisateurResource($utilisateur),
            ]
        );
    }

    public function deconnexion(Request $request): JsonResponse
    {
        $token = $request->user()->currentAccessToken();

        if ($token !== null) {
            $token->delete();
        }

        return ReponseApi::succes([
            'message' => 'Déconnexion effectuée.',
        ]);
    }
}