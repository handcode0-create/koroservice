<?php

namespace App\Enums;

enum StatutDemande: string
{
    case BROUILLON = 'brouillon';
    case ENVOYEE = 'envoyée';
    case EN_ATTENTE_REPONSES = 'en attente de réponses';
    case DEVIS_RECU = 'devis reçu';
    case PRESTATAIRE_SELECTIONNE = 'prestataire sélectionné';
    case PLANIFIEE = 'planifiée';
    case EN_COURS = 'en cours';
    case TERMINEE = 'terminée';
    case ANNULEE = 'annulée';
    case LITIGE = 'litige';

    public function label(): string
    {
        return match ($this) {
            self::BROUILLON => 'Brouillon',
            self::ENVOYEE => 'Envoyée',
            self::EN_ATTENTE_REPONSES => 'En attente de réponses',
            self::DEVIS_RECU => 'Devis reçu',
            self::PRESTATAIRE_SELECTIONNE => 'Prestataire sélectionné',
            self::PLANIFIEE => 'Planifiée',
            self::EN_COURS => 'En cours',
            self::TERMINEE => 'Terminée',
            self::ANNULEE => 'Annulée',
            self::LITIGE => 'Litige',
        };
    }

    public function peutEtreAnnulee(): bool
    {
        return ! in_array($this, [
            self::TERMINEE,
            self::ANNULEE,
            self::LITIGE,
        ], true);
    }
}