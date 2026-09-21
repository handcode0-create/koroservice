# Kôrô Services — Design System mobile

## 1. Source de vérité

La maquette mobile 393 × 852 px fournie pour Kôrô Services est la référence visuelle principale.

Le système doit conserver :
- fond général clair et très léger ;
- typographie Poppins ;
- icônes Ionicons ;
- avatar + salutation + notification en tête ;
- recherche ;
- banner héro sombre avec image du professionnel à droite ;
- six catégories en grille 3 × 2 ;
- section « Vos demandes récentes » ;
- navigation basse à cinq positions avec bouton « + » central.

## 2. Palette

| Token | Valeur | Usage |
| --- | --- | --- |
| background | #F7F8FA | fond de l’application |
| surface | #FFFFFF | cartes et champs |
| navy | #0B1E3A | banner / surfaces fortes |
| blue | #1D68DD | action primaire |
| blueBright | #2B7BFF | accent |
| blueSoft | #EAF2FF | fonds d’icônes / états |
| yellow | #FFB020 | CTA du banner |
| yellowSoft | #FFF2D8 | badge d’attente |
| green | #1FAF6A | jardinage / états positifs |
| orange | #F97316 | peinture |
| purple | #6B46C1 | nettoyage |
| text | #0B1220 | texte principal |
| textSecondary | #64748B | texte secondaire |
| textMuted | #8C98A8 | métadonnées |
| border | #E2E8F0 | séparateurs et bordures |

## 3. Typographie

Poppins est obligatoire.

- Display : Poppins Black 22/27
- Title : Poppins Black 18/23
- Body strong : Poppins Bold 12/18
- Body : Poppins Medium 12/18
- Caption : Poppins SemiBold 9/14
- Label : Poppins ExtraBold 10/14
- Navigation : Poppins ExtraBold 9/13

## 4. Spacing

Échelle de base : 4 / 8 / 12 / 16 / 20 / 24 / 32 px.

La page 393 px utilise 16 px de marge horizontale.

## 5. Rayons

- petit : 10
- moyen : 14
- large : 18
- hero : 22
- pill : 999

## 6. Iconographie

Bibliothèque : @expo/vector-icons, famille Ionicons.

Tailles : 14 / 18 / 22 / 26 px.

Aucun SymbolView ou icône du starter Expo dans les écrans produit.

## 7. Banner héro

Le banner est une carte de 148 px de haut avec un rayon de 22 px.

Le PNG fourni par le produit : mobile/assets/images/koro-banner-pros-verifies.png

doit remplir toute la carte.

Le texte et le bouton sont positionnés au-dessus du côté gauche de l’image.
Le professionnel présent dans le PNG reste visible côté droit.

Il ne faut pas :
- limiter l’image à une largeur fixe de 150 px ;
- découper le sujet manuellement ;
- recréer le professionnel avec des Views ;
- remplacer le PNG par une illustration générique.

## 8. Services

Les six services MVP visibles sur l’accueil sont :

1. Plomberie
2. Électricité
3. Climatisation
4. Peinture
5. Nettoyage
6. Jardinage

Disposition : 3 colonnes × 2 lignes.

Chaque carte possède :
- surface blanche ;
- bordure #E2E8F0 ;
- rayon 14–16 ;
- icône 22 px dans un conteneur 34 px ;
- nom en Poppins Black.

## 9. Navigation basse

5 positions :

Accueil | Demandes | + | Messages | Profil

Le « + » :
- cercle bleu ;
- 56 × 56 px ;
- bordure blanche 4 px ;
- légèrement surélevé ;
- ombre douce.

## 10. Règle de cohérence

Les nouveaux écrans doivent consommer les tokens de mobile/src/design-system/tokens.ts.
Les couleurs, rayons, tailles d’icônes et styles ne doivent pas être réinventés localement sans nécessité.
