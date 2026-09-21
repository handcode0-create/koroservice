<?php

namespace App\Enums;

enum StatutDisponibilitePrestataire: string
{
    case DISPONIBLE = 'disponible';
    case INDISPONIBLE = 'indisponible';

    public function label(): string
    {
        return match ($this) {
            self::DISPONIBLE => 'Disponible',
            self::INDISPONIBLE => 'Indisponible',
        };
    }
}