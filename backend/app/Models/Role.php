<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    protected $table = 'roles';

    protected $fillable = [
        'nom',
        'description',
    ];

    public function utilisateurs(): BelongsToMany
    {
        return $this->belongsToMany(
            Utilisateur::class,
            'utilisateurs_roles',
            'role_id',
            'utilisateur_id'
        );
    }
}