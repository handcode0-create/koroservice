<?php

namespace App\Actions\Demandes;

use App\Enums\StatutDemande;
use App\Models\DemandeService;
use App\Models\HistoriqueDemande;
use Illuminate\Database\DatabaseManager;
use Illuminate\Validation\ValidationException;

class AnnulerDemandeService
{
    public function __construct(
        private readonly DatabaseManager $database,
    ) {
    }

    public function execute(
        DemandeService $demande,
        string $utilisateurId,
        ?string $commentaire = null
    ): DemandeService {
        if ($demande->utilisateur_id !== $utilisateurId) {
            throw ValidationException::withMessages([
                'demande' => ['Vous ne pouvez pas annuler cette demande.'],
            ]);
        }

        $ancienStatut = $demande->statut;

        if (! $ancienStatut->peutEtreAnnulee()) {
            throw ValidationException::withMessages([
                'demande' => ['Cette demande ne peut plus être annulée.'],
            ]);
        }

        return $this->database->transaction(function () use (
            $demande,
            $utilisateurId,
            $commentaire,
            $ancienStatut
        ) {
            $demande->update([
                'statut' => StatutDemande::ANNULEE,
            ]);

            HistoriqueDemande::create([
                'demande_service_id' => $demande->id,
                'utilisateur_id' => $utilisateurId,
                'ancien_statut' => $ancienStatut->value,
                'nouveau_statut' => StatutDemande::ANNULEE->value,
                'commentaire' => $commentaire ?: 'Demande annulée par le client.',
            ]);

            return $demande->fresh([
                'categorieService',
                'commune',
                'quartier',
                'profilPrestataireSelectionne',
                'photos',
            ]);
        });
    }
}