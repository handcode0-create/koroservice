<?php

namespace App\Enums;

enum StatutVerificationPrestataire: string
{
    case BROUILLON = 'brouillon';
    case EN_ATTENTE = 'en attente de vérification';
    case VERIFIE = 'vérifié';
    case REJETE = 'rejeté';
    case SUSPENDU = 'suspendu';

    public function label(): string
    {
        return match ($this) {
            self::BROUILLON => 'Brouillon',
            self::EN_ATTENTE => 'En attente de vérification',
            self::VERIFIE => 'Vérifié',
            self::REJETE => 'Rejeté',
            self::SUSPENDU => 'Suspendu',
        };
    }
}