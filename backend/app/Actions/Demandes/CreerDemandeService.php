<?php

namespace App\Actions\Demandes;

use App\Enums\StatutDemande;
use App\Models\DemandeService;
use App\Models\HistoriqueDemande;
use App\Models\ProfilPrestataire;
use Illuminate\Database\DatabaseManager;
use Illuminate\Validation\ValidationException;

class CreerDemandeService
{
    public function __construct(
        private readonly DatabaseManager $database,
    ) {
    }

    public function execute(
        string $utilisateurId,
        array $donnees
    ): DemandeService {
        return $this->database->transaction(function () use ($utilisateurId, $donnees) {
            $commune = \App\Models\Commune::query()
                ->whereKey($donnees['commune_id'])
                ->where('actif', true)
                ->first();

            if ($commune === null) {
                throw ValidationException::withMessages([
                    'commune_id' => ['La commune sélectionnée est inactive ou introuvable.'],
                ]);
            }

            if (! empty($donnees['quartier_id'])) {
                $quartierValide = \App\Models\Quartier::query()
                    ->whereKey($donnees['quartier_id'])
                    ->where('commune_id', $donnees['commune_id'])
                    ->where('actif', true)
                    ->exists();

                if (! $quartierValide) {
                    throw ValidationException::withMessages([
                        'quartier_id' => [
                            'Le quartier sélectionné ne correspond pas à la commune.',
                        ],
                    ]);
                }
            }

            if (! empty($donnees['profil_prestataire_selectionne_id'])) {
                $prestataire = ProfilPrestataire::query()
                    ->whereKey($donnees['profil_prestataire_selectionne_id'])
                    ->where('statut_verification', 'vérifié')
                    ->whereNull('deleted_at')
                    ->first();

                if ($prestataire === null) {
                    throw ValidationException::withMessages([
                        'profil_prestataire_selectionne_id' => [
                            'Le prestataire sélectionné n’est pas vérifié.',
                        ],
                    ]);
                }
            }

            $demande = DemandeService::create([
                ...$donnees,
                'utilisateur_id' => $utilisateurId,
                'statut' => StatutDemande::ENVOYEE,
            ]);

            HistoriqueDemande::create([
                'demande_service_id' => $demande->id,
                'utilisateur_id' => $utilisateurId,
                'ancien_statut' => null,
                'nouveau_statut' => StatutDemande::ENVOYEE->value,
                'commentaire' => 'Demande créée et envoyée.',
            ]);

            return $demande->load([
                'categorieService',
                'commune',
                'quartier',
                'profilPrestataireSelectionne',
                'photos',
            ]);
        });
    }
}