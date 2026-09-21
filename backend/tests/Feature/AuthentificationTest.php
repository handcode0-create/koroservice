<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\Utilisateur;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthentificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_un_utilisateur_peut_s_inscrire(): void
    {
        Role::create([
            'nom' => 'client',
            'description' => 'Client Kôrô Services.',
        ]);

        $response = $this->postJson('/api/auth/inscription', [
            'nom' => 'Kouassi',
            'prenom' => 'Jean',
            'telephone' => '+225 07 00 00 00 10',
            'email' => 'jean@example.com',
            'mot_de_passe' => 'password',
            'mot_de_passe_confirmation' => 'password',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.token_type', 'Bearer')
            ->assertJsonPath('data.utilisateur.telephone', '+225 07 00 00 00 10')
            ->assertJsonPath('data.utilisateur.roles.0', 'client');

        $this->assertDatabaseHas('utilisateurs', [
            'telephone' => '+225 07 00 00 00 10',
        ]);
    }

    public function test_un_utilisateur_peut_se_connecter_et_consulter_son_compte(): void
    {
        $role = Role::create([
            'nom' => 'client',
            'description' => 'Client Kôrô Services.',
        ]);

        $utilisateur = Utilisateur::create([
            'nom' => 'Kouassi',
            'prenom' => 'Jean',
            'telephone' => '+225 07 00 00 00 11',
            'email' => 'jean11@example.com',
            'mot_de_passe' => 'password',
            'actif' => true,
        ]);

        $utilisateur->roles()->attach($role->id);

        $connexion = $this->postJson('/api/auth/connexion', [
            'telephone' => '+225 07 00 00 00 11',
            'mot_de_passe' => 'password',
        ]);

        $connexion
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.utilisateur.id', $utilisateur->id);

        $token = $connexion->json('data.token');

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.utilisateur.telephone', '+225 07 00 00 00 11');
    }

    public function test_un_utilisateur_peut_se_deconnecter(): void
    {
        $utilisateur = Utilisateur::create([
            'nom' => 'Kouassi',
            'prenom' => 'Jean',
            'telephone' => '+225 07 00 00 00 12',
            'email' => 'jean12@example.com',
            'mot_de_passe' => 'password',
            'actif' => true,
        ]);

        $utilisateur->createToken('mobile');

        $token = $utilisateur->tokens()->latest('id')->first();

        Sanctum::actingAs($utilisateur);

        $this->postJson('/api/auth/deconnexion')
            ->assertOk()
            ->assertJsonPath('success', true);

        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => $token?->id,
        ]);
    }

    public function test_un_compte_inactif_ne_peut_pas_se_connecter(): void
    {
        Utilisateur::create([
            'nom' => 'Kouassi',
            'prenom' => 'Jean',
            'telephone' => '+225 07 00 00 00 13',
            'email' => 'jean13@example.com',
            'mot_de_passe' => 'password',
            'actif' => false,
        ]);

        $this->postJson('/api/auth/connexion', [
            'telephone' => '+225 07 00 00 00 13',
            'mot_de_passe' => 'password',
        ])
            ->assertForbidden()
            ->assertJsonPath('success', false)
            ->assertJsonPath('error.code', 'ACCOUNT_INACTIVE');
    }

    public function test_le_middleware_role_controle_l_acces(): void
    {
        Route::middleware(['auth:sanctum', 'role:administrateur'])
            ->get('/api/test-role-admin', fn () => response()->json(['success' => true]));

        $utilisateur = Utilisateur::create([
            'nom' => 'Kouassi',
            'prenom' => 'Jean',
            'telephone' => '+225 07 00 00 00 14',
            'email' => 'jean14@example.com',
            'mot_de_passe' => 'password',
            'actif' => true,
        ]);

        Sanctum::actingAs($utilisateur);

        $this->getJson('/api/test-role-admin')
            ->assertForbidden()
            ->assertJsonPath('error.code', 'FORBIDDEN');

        $role = Role::create([
            'nom' => 'administrateur',
            'description' => 'Administrateur Kôrô Services.',
        ]);

        $utilisateur->roles()->attach($role->id);

        $this->getJson('/api/test-role-admin')
            ->assertOk()
            ->assertJsonPath('success', true);
    }
}
