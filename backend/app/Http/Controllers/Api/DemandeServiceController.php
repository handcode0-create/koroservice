<?php

namespace App\Http\Controllers\Api;

use App\Actions\Demandes\AnnulerDemandeService;
use App\Actions\Demandes\CreerDemandeService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Demandes\AjouterPhotoDemandeRequest;
use App\Http\Requests\Demandes\AnnulerDemandeServiceRequest;
use App\Http\Requests\Demandes\CreerDemandeServiceRequest;
use App\Http\Resources\DemandeServiceResource;
use App\Http\Resources\PhotoDemandeResource;
use App\Models\DemandeService;
use App\Models\PhotoDemande;
use App\Support\Api\ReponseApi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DemandeServiceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $demandes = DemandeService::query()
            ->where('utilisateur_id', $request->user()->id)
            ->with([
                'categorieService',
                'commune',
                'quartier',
                'profilPrestataireSelectionne',
                'photos',
            ])
            ->latest()
            ->paginate(
                perPage: min(
                    max((int) $request->integer('limit', 15), 1),
                    50
                )
            );

        return ReponseApi::succes(
            data: DemandeServiceResource::collection($demandes->items()),
            meta: [
                'current_page' => $demandes->currentPage(),
                'per_page' => $demandes->perPage(),
                'total' => $demandes->total(),
                'last_page' => $demandes->lastPage(),
            ]
        );
    }

    public function store(
        CreerDemandeServiceRequest $request,
        CreerDemandeService $creerDemandeService
    ): JsonResponse {
        $demande = $creerDemandeService->execute(
            $request->user()->id,
            $request->validated()
        );

        return ReponseApi::succes(
            data: [
                'demande' => new DemandeServiceResource($demande),
            ],
            status: 201
        );
    }

    public function show(
        Request $request,
        DemandeService $demandeService
    ): JsonResponse {
        $this->verifierProprietaire($request, $demandeService);

        $demandeService->load([
            'categorieService',
            'commune',
            'quartier',
            'profilPrestataireSelectionne',
            'photos',
            'historiques',
        ]);

        return ReponseApi::succes([
            'demande' => new DemandeServiceResource($demandeService),
            'historique' => $demandeService->historiques,
        ]);
    }

    public function ajouterPhoto(
        AjouterPhotoDemandeRequest $request,
        DemandeService $demandeService
    ): JsonResponse {
        $this->verifierProprietaire($request, $demandeService);

        $fichier = $request->file('photo');
        $chemin = $fichier->store(
            'demandes/' . $demandeService->id,
            'public'
        );

        $photo = PhotoDemande::create([
            'demande_service_id' => $demandeService->id,
            'chemin' => $chemin,
            'nom_original' => $fichier->getClientOriginalName(),
            'type_mime' => $fichier->getMimeType() ?: $fichier->getClientMimeType(),
            'taille' => $fichier->getSize(),
            'statut_moderation' => 'en attente',
        ]);

        return ReponseApi::succes(
            data: [
                'photo' => new PhotoDemandeResource($photo),
            ],
            status: 201
        );
    }

    public function annuler(
        AnnulerDemandeServiceRequest $request,
        DemandeService $demandeService,
        AnnulerDemandeService $annulerDemandeService
    ): JsonResponse {
        $demande = $annulerDemandeService->execute(
            $demandeService,
            $request->user()->id,
            $request->string('commentaire')->toString() ?: null
        );

        return ReponseApi::succes([
            'demande' => new DemandeServiceResource($demande),
        ]);
    }

    private function verifierProprietaire(
        Request $request,
        DemandeService $demandeService
    ): void {
        abort_unless(
            $demandeService->utilisateur_id === $request->user()->id,
            403,
            'Vous n’avez pas accès à cette demande.'
        );
    }
}