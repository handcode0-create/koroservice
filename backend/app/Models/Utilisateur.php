<?php

namespace App\Models;

use Database\Factories\UtilisateurFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Utilisateur extends Authenticatable
{
    /** @use HasFactory<UtilisateurFactory> */
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $table = 'utilisateurs';

    protected $fillable = [
        'nom',
        'prenom',
        'telephone',
        'email',
        'mot_de_passe',
        'photo_profil',
        'telephone_verifie',
        'email_verifie',
        'actif',
        'dernier_acces_at',
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    protected $casts = [
        'telephone_verifie' => 'boolean',
        'email_verifie' => 'boolean',
        'actif' => 'boolean',
        'dernier_acces_at' => 'datetime',
        'mot_de_passe' => 'hashed',
    ];

    public function getAuthPassword(): string
    {
        return $this->mot_de_passe;
    }
}