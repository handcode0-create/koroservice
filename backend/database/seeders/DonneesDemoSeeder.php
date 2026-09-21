<?php

namespace Database\Seeders;

use App\Models\CategorieService;
use App\Models\ProfilPrestataire;
use App\Models\Utilisateur;
use Illuminate\Database\Seeder;

class DonneesDemoSeeder extends Seeder
{
    public function run(): void
    {
        $roleClient = \App\Models\Role::where('nom', 'client')->firstOrFail();
        $rolePrestataire = \App\Models\Role::where('nom', 'prestataire')->firstOrFail();
        $roleAdministrateur = \App\Models\Role::where('nom', 'administrateur')->firstOrFail();

        $plomberie = CategorieService::where('slug', 'plomberie')->firstOrFail();
        $electricite = CategorieService::where('slug', 'electricite')->firstOrFail();
        $climatisation = CategorieService::where('slug', 'climatisation')->firstOrFail();

        $client = Utilisateur::updateOrCreate(
            ['telephone' => '+225 07 00 00 00 01'],
            [
                'nom' => 'Kouassi',
                'prenom' => 'Jean',
                'email' => 'client@koroservices.test',
                'mot_de_passe' => 'password',
                'telephone_verifie' => true,
                'email_verifie' => true,
                'actif' => true,
            ]
        );
        $client->roles()->syncWithoutDetaching([$roleClient->id]);

        $admin = Utilisateur::updateOrCreate(
            ['telephone' => '+225 07 00 00 00 02'],
            [
                'nom' => 'Koffi',
                'prenom' => 'Admin',
                'email' => 'admin@koroservices.test',
                'mot_de_passe' => 'password',
                'telephone_verifie' => true,
                'email_verifie' => true,
                'actif' => true,
            ]
        );
        $admin->roles()->syncWithoutDetaching([$roleAdministrateur->id]);

        $prestataireUtilisateur = Utilisateur::updateOrCreate(
            ['telephone' => '+225 07 00 00 00 03'],
            [
                'nom' => 'Yao',
                'prenom' => 'Michel',
                'email' => 'prestataire@koroservices.test',
                'mot_de_passe' => 'password',
                'telephone_verifie' => true,
                'email_verifie' => true,
                'actif' => true,
            ]
        );
        $prestataireUtilisateur->roles()->syncWithoutDetaching([$rolePrestataire->id]);

        $profil = ProfilPrestataire::updateOrCreate(
            ['utilisateur_id' => $prestataireUtilisateur->id],
            [
                'nom_entreprise' => 'Yao Services',
                'nom_affichage' => 'Michel Yao',
                'description' => 'Prestataire spécialisé dans les interventions de plomberie.',
                'metier_principal' => 'Plombier',
                'annees_experience' => 8,
                'tarif_minimum' => 5000,
                'tarif_maximum' => 50000,
                'statut_verification' => 'vérifié',
                'statut_disponibilite' => 'disponible',
                'note_moyenne' => 0,
                'nombre_avis' => 0,
                'nombre_interventions' => 0,
                'verifie_at' => now(),
            ]
        );
        $profil->categories()->sync([
            $plomberie->id => ['principal' => true],
            $electricite->id => ['principal' => false],
        ]);

        $prestataireClim = Utilisateur::updateOrCreate(
            ['telephone' => '+225 07 00 00 00 04'],
            [
                'nom' => 'Konan',
                'prenom' => 'Serge',
                'email' => 'clim@koroservices.test',
                'mot_de_passe' => 'password',
                'telephone_verifie' => true,
                'email_verifie' => true,
                'actif' => true,
            ]
        );
        $prestataireClim->roles()->syncWithoutDetaching([$rolePrestataire->id]);

        $profilClim = ProfilPrestataire::updateOrCreate(
            ['utilisateur_id' => $prestataireClim->id],
            [
                'nom_entreprise' => 'Konan Clim',
                'nom_affichage' => 'Serge Konan',
                'description' => 'Technicien spécialisé en climatisation.',
                'metier_principal' => 'Technicien climatisation',
                'annees_experience' => 6,
                'tarif_minimum' => 10000,
                'tarif_maximum' => 75000,
                'statut_verification' => 'vérifié',
                'statut_disponibilite' => 'disponible',
                'note_moyenne' => 0,
                'nombre_avis' => 0,
                'nombre_interventions' => 0,
                'verifie_at' => now(),
            ]
        );
        $profilClim->categories()->sync([
            $climatisation->id => ['principal' => true],
        ]);
    }
}