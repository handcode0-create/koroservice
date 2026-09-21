# MLD — Kôrô Services

## Convention

- Tables et colonnes métier en français.
- Identifiants ULID.
- Dates en timestamps.
- Suppression logique sur les entités nécessitant une conservation fonctionnelle.
- JSONB PostgreSQL pour les données flexibles contrôlées.
- Clés étrangères explicites.
- Index sur les colonnes de recherche et de relation.

## Tables

### utilisateurs
id, nom, prenom, telephone, email, mot_de_passe, photo_profil, telephone_verifie, email_verifie, actif, dernier_acces_at, created_at, updated_at, deleted_at

### roles
id, nom, description, created_at, updated_at

### utilisateurs_roles
utilisateur_id, role_id

### profils_prestataires
id, utilisateur_id, nom_entreprise, nom_affichage, description, metier_principal, annees_experience, tarif_minimum, tarif_maximum, statut_verification, statut_disponibilite, note_moyenne, nombre_avis, nombre_interventions, verifie_at, created_at, updated_at, deleted_at

### categories_services
id, nom, slug, description, icone, actif, ordre_affichage, created_at, updated_at

### profils_prestataires_categories
profil_prestataire_id, categorie_service_id, principal, created_at

### communes
id, nom, slug, actif, created_at, updated_at

### quartiers
id, commune_id, nom, slug, actif, created_at, updated_at

### zones_intervention
id, profil_prestataire_id, commune_id, quartier_id, actif, created_at, updated_at

### creneaux_disponibilite
id, profil_prestataire_id, jour_semaine, heure_debut, heure_fin, actif, created_at, updated_at

### demandes_services
id, utilisateur_id, categorie_service_id, profil_prestataire_selectionne_id, commune_id, quartier_id, titre, description, repere, adresse_texte, urgence, statut, date_souhaitee, heure_souhaitee, created_at, updated_at, deleted_at

### photos_demandes
id, demande_service_id, chemin, nom_original, type_mime, taille, statut_moderation, created_at, updated_at

### reponses_prestataires
id, demande_service_id, profil_prestataire_id, prix_indicatif, duree_estimee, commentaire, statut, date_expiration, consulte_at, created_at, updated_at

### rendez_vous
id, demande_service_id, reponse_prestataire_id, profil_prestataire_id, date_prevue, heure_debut, heure_fin, statut, notes, created_at, updated_at

### interventions
id, rendez_vous_id, demande_service_id, profil_prestataire_id, statut, arrive_at, travail_commence_at, travail_termine_at, validee_client_at, contestee_at, commentaire_fin, motif_contestation, created_at, updated_at

### avis
id, intervention_id, utilisateur_id, profil_prestataire_id, note, commentaire, statut, publie_at, created_at, updated_at

### documents_verification
id, profil_prestataire_id, type_document, chemin, numero_document, statut, motif_rejet, verifie_par, verifie_at, created_at, updated_at

### signalements
id, utilisateur_id, cible_type, cible_id, motif, description, statut, traite_par, traite_at, created_at, updated_at

### notifications
id, utilisateur_id, type, titre, message, donnees, lue_at, created_at, updated_at

### journaux_audit
id, utilisateur_id, action, table_cible, enregistrement_id, anciennes_valeurs, nouvelles_valeurs, adresse_ip, agent_utilisateur, created_at

### historiques_demandes
id, demande_service_id, utilisateur_id, ancien_statut, nouveau_statut, commentaire, created_at

## Contraintes principales

- utilisateurs.telephone unique
- utilisateurs.email unique lorsqu'il est renseigné
- utilisateurs_roles unique (utilisateur_id, role_id)
- profils_prestataires_categories unique (profil_prestataire_id, categorie_service_id)
- reponses_prestataires unique (demande_service_id, profil_prestataire_id)
- avis unique (intervention_id, utilisateur_id)
- note entre 1 et 5
- tarifs >= 0 et tarif_maximum >= tarif_minimum
- une seule catégorie principale par prestataire
