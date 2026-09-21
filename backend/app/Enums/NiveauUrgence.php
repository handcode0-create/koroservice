<?php

namespace App\Enums;

enum NiveauUrgence: string
{
    case NORMALE = 'normale';
    case URGENTE = 'urgente';
    case TRES_URGENTE = 'très urgente';

    public function label(): string
    {
        return match ($this) {
            self::NORMALE => 'Normale',
            self::URGENTE => 'Urgente',
            self::TRES_URGENTE => 'Très urgente',
        };
    }
}