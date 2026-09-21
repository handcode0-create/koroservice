# MCD — Kôrô Services

## Noyau métier

Utilisateur → Demande de service → Réponses prestataires → Rendez-vous → Intervention → Avis.

## Entités

- utilisateurs
- roles
- utilisateurs_roles
- profils_prestataires
- categories_services
- profils_prestataires_categories
- communes
- quartiers
- zones_intervention
- creneaux_disponibilite
- demandes_services
- photos_demandes
- reponses_prestataires
- rendez_vous
- interventions
- avis
- documents_verification
- signalements
- notifications
- journaux_audit
- historiques_demandes

## Règles majeures

- Un utilisateur peut avoir plusieurs rôles.
- Un utilisateur peut posséder au plus un profil prestataire.
- Un prestataire peut exercer plusieurs catégories, dont une seule principale.
- Une demande appartient à un client et à une catégorie.
- Une demande peut recevoir plusieurs réponses, mais un prestataire ne peut répondre qu'une fois à une même demande.
- Un client sélectionne au plus un prestataire principal pour une demande.
- Un rendez-vous peut être issu d'une réponse prestataire.
- Une intervention est liée à un rendez-vous.
- Un avis ne peut être publié qu'après une intervention terminée et validée.
- Un utilisateur ne peut noter qu'une fois la même intervention.
- Les demandes et leurs changements de statut conservent un historique.
- Les documents de vérification sont contrôlés par un administrateur.
- Les signalements et actions sensibles sont auditables.

## Identifiants

Les entités utilisent des ULID.

## Géographie

Le MVP utilise commune + quartier + repère/adresse textuelle. La cartographie reste optionnelle.
