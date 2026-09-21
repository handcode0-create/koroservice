<?php

namespace App\Http\Middleware;

use App\Support\Api\ReponseApi;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(
        Request $request,
        Closure $next,
        string ...$roles
    ): Response {
        $utilisateur = $request->user();

        if ($utilisateur === null) {
            return ReponseApi::erreur(
                code: 'UNAUTHORIZED',
                message: 'Authentification requise.',
                status: 401
            );
        }

        if ($roles === []) {
            return $next($request);
        }

        $utilisateur->loadMissing('roles');

        $autorise = $utilisateur->roles
            ->pluck('nom')
            ->intersect($roles)
            ->isNotEmpty();

        if (! $autorise) {
            return ReponseApi::erreur(
                code: 'FORBIDDEN',
                message: 'Vous n’avez pas les droits nécessaires.',
                status: 403
            );
        }

        return $next($request);
    }
}