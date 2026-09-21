<?php

namespace Tests\Feature;

use App\Models\CategorieService;
use App\Models\Commune;
use App\Models\Quartier;
use App\Models\Utilisateur;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DemandeServiceTest extends TestCase
{
    use RefreshDatabase;

    private function preparerUtilisateurEtGeographie(): array
    {
        $utilisateur = Utilisateur::create([
            'nom' => 'Kouassi',
            'prenom' => 'Jean',
            'telephone' => '+225 07 10 00 00 01',
            'email' => 'jean.demande@example.com',
            'mot_de_passe' => 'password',
            'actif' => true,
        ]);

        $categorie = CategorieService::create([
            'nom' => 'Plomberie',
            'slug' => 'plomberie',
            'description' => 'Services de plomberie.',
            'actif' => true,
            'ordre_affichage' => 1,
        ]);

        $commune = Commune::create([
            'nom' => 'Cocody',
            'slug' => 'cocody',
            'actif' => true,
        ]);

        $quartier = Quartier::create([
            'commune_id' => $commune->id,
            'nom' => 'Riviera',
            'slug' => 'riviera',
            'actif' => true,
        ]);

        Sanctum::actingAs($utilisateur);

        return compact('utilisateur', 'categorie', 'commune', 'quartier');
    }

    public function test_un_client_peut_creer_une_demande_de_service(): void
    {
        $contexte = $this->preparerUtilisateurEtGeographie();

        $response = $this->postJson('/api/demandes-services', [
            'categorie_service_id' => $contexte['categorie']->id,
            'commune_id' => $contexte['commune']->id,
            'quartier_id' => $contexte['quartier']->id,
            'titre' => 'Fuite sous évier',
            'description' => 'Une fuite importante sous l’évier de la cuisine.',
            'repere' => 'Près du rond-point',
            'adresse_texte' => 'Riviera, Cocody',
            'urgence' => 'urgente',
            'date_souhaitee' => now()->addDay()->toDateString(),
            'heure_souhaitee' => '14:30',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.demande.titre', 'Fuite sous évier')
            ->assertJsonPath('data.demande.statut.value', 'envoyée');

        $this->assertDatabaseHas('demandes_services', [
            'utilisateur_id' => $contexte['utilisateur']->id,
            'categorie_service_id' => $contexte['categorie']->id,
            'commune_id' => $contexte['commune']->id,
            'quartier_id' => $contexte['quartier']->id,
            'statut' => 'envoyée',
        ]);

        $this->assertDatabaseHas('historiques_demandes', [
            'utilisateur_id' => $contexte['utilisateur']->id,
            'nouveau_statut' => 'envoyée',
        ]);
    }

    public function test_un_client_ne_peut_pas_utiliser_un_quartier_d_une_autre_commune(): void
    {
        $contexte = $this->preparerUtilisateurEtGeographie();

        $autreCommune = Commune::create([
            'nom' => 'Marcory',
            'slug' => 'marcory',
            'actif' => true,
        ]);

        $response = $this->postJson('/api/demandes-services', [
            'categorie_service_id' => $contexte['categorie']->id,
            'commune_id' => $autreCommune->id,
            'quartier_id' => $contexte['quartier']->id,
            'titre' => 'Intervention',
            'description' => 'Besoin d’une intervention.',
            'urgence' => 'normale',
        ]);

        $response
            ->assertStatus(422)
            ->assertJsonPath('success', false)
            ->assertJsonPath('error.code', 'VALIDATION_ERROR');
    }

    public function test_le_client_peut_consulter_une_demande_qu_il_possede(): void
    {
        $contexte = $this->preparerUtilisateurEtGeographie();

        $creation = $this->postJson('/api/demandes-services', [
            'categorie_service_id' => $contexte['categorie']->id,
            'commune_id' => $contexte['commune']->id,
            'quartier_id' => $contexte['quartier']->id,
            'titre' => 'Climatisation',
            'description' => 'La climatisation ne refroidit plus.',
            'urgence' => 'normale',
        ]);

        $demandeId = $creation->json('data.demande.id');

        $this->getJson('/api/demandes-services/' . $demandeId)
            ->assertOk()
            ->assertJsonPath('data.demande.id', $demandeId)
            ->assertJsonStructure([
                'data' => [
                    'demande',
                    'historique',
                ],
            ]);
    }

    public function test_le_client_peut_ajouter_une_photo_a_sa_demande(): void
    {
        Storage::fake('public');

        $contexte = $this->preparerUtilisateurEtGeographie();

        $creation = $this->postJson('/api/demandes-services', [
            'categorie_service_id' => $contexte['categorie']->id,
            'commune_id' => $contexte['commune']->id,
            'quartier_id' => $contexte['quartier']->id,
            'titre' => 'Prise électrique',
            'description' => 'Une prise est endommagée.',
            'urgence' => 'normale',
        ]);

        $demandeId = $creation->json('data.demande.id');

        $response = $this->post(
            '/api/demandes-services/' . $demandeId . '/photos',
            [
                'photo' => UploadedFile::fake()->image('prise.jpg'),
            ],
            [
                'Accept' => 'application/json',
            ]
        );

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.photo.nom_original', 'prise.jpg');

        $this->assertDatabaseHas('photos_demandes', [
            'demande_service_id' => $demandeId,
            'nom_original' => 'prise.jpg',
        ]);
    }

    public function test_le_client_peut_annuler_sa_demande(): void
    {
        $contexte = $this->preparerUtilisateurEtGeographie();

        $creation = $this->postJson('/api/demandes-services', [
            'categorie_service_id' => $contexte['categorie']->id,
            'commune_id' => $contexte['commune']->id,
            'quartier_id' => $contexte['quartier']->id,
            'titre' => 'Robinet',
            'description' => 'Remplacement du robinet.',
            'urgence' => 'normale',
        ]);

        $demandeId = $creation->json('data.demande.id');

        $this->postJson('/api/demandes-services/' . $demandeId . '/annuler', [
            'commentaire' => 'Le problème est réglé.',
        ])
            ->assertOk()
            ->assertJsonPath('data.demande.statut.value', 'annulée');

        $this->assertDatabaseHas('historiques_demandes', [
            'demande_service_id' => $demandeId,
            'ancien_statut' => 'envoyée',
            'nouveau_statut' => 'annulée',
        ]);
    }
}
