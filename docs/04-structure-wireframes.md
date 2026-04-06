# 🧩 Norel Art — Structure & Wireframes

---

## 🧭 Rôle du document

Ce document définit la structure complète du site Norel Art.

Il sert de référence pour :

- l’architecture frontend (Next.js)
- la conception des pages (Figma)
- le découpage des composants
- l’organisation du contenu

Il traduit l’expérience utilisateur en structure exploitable.

---

## 🎯 Objectif

Créer une structure :

- simple côté utilisateur
- cohérente avec l’UX
- alignée avec la direction artistique
- scalable dans le temps

---

## 🧠 Principe fondamental

La structure doit être invisible.

Si l’utilisateur réfléchit à la navigation, elle est ratée.

---

## 🌐 Arborescence — Site public

### Accueil `/`

Rôle : entrée immersive

Contenu :

- hero full screen
- transition (effet rideau)
- sélection d’œuvres
- texte univers
- CTA vers galerie

---

### Galerie `/oeuvres`

Rôle : exploration

Contenu :

- filtres (technique, collection)
- galerie immersive

---

### Fiche œuvre `/oeuvres/[slug]`

Rôle : connexion + conversion

Contenu :

- image dominante
- informations
- texte émotion
- CTA
- œuvres similaires

---

### À propos `/a-propos`

Rôle : lien humain

Contenu :

- parcours
- vision
- démarche

---

### Commandes `/commandes`

Rôle : génération de leads

Contenu :

- explication
- formulaire

---

### Fresques `/fresques`

Rôle : service

Contenu :

- présentation
- exemples
- formulaire

---

### Contact `/contact`

Rôle : point de contact

Contenu :

- texte
- formulaire

---

## ⚙️ Arborescence — Admin

### Auth `/admin/login`

- authentification

---

### Dashboard `/admin`

- vue globale

---

### Œuvres `/admin/oeuvres`

Fonctions :

- liste
- recherche
- filtres

---

### Édition œuvre

Champs :

- titre
- slug
- image
- technique
- dimensions
- prix
- description
- texte émotion
- catégorie
- collection

---

### Demandes `/admin/demandes`

- commandes personnalisées
- fresques

---

### Témoignages `/admin/temoignages`

- validation
- publication

---

### Paramètres `/admin/settings`

- contenus
- SEO
- emails

---

## ⚠️ Choix produit (MVP)

Pas de compte utilisateur.

---

### Fonctionnement

- paiement via Stripe
- informations client via checkout
- communication par email

---

### Objectif

- réduire la friction
- préserver l’immersion

---

## 🔮 Évolution future

Espace client (non MVP)

- login
- commandes
- historique
- informations

---

## 🎬 Pages détaillées

---

### Accueil

Structure :

Hero → Transition → Œuvres → Texte → CTA

---

### Galerie

Structure :

Header → Filtres → Galerie → Espace

---

### Fiche œuvre

Structure :

Image → Infos → Texte → CTA → Similaires

---

### À propos

Structure :

Intro → Parcours → Vision

---

### Commandes

Structure :

Intro → Explication → Formulaire

---

### Fresques

Structure :

Intro → Exemples → Explication → Formulaire

---

### Contact

Structure :

Texte → Formulaire

---

## 🧱 Wireframes (zoning)

---

### Accueil

[ HERO ]
[ TRANSITION ]
[ ŒUVRES ]
[ TEXTE ]
[ CTA ]

---

### Galerie

[ HEADER ]
[ FILTRES ]
[ GRID ]
[ ESPACE ]

---

### Fiche œuvre

[ IMAGE ]
[ INFOS ]
[ TEXTE ]
[ CTA ]
[ SIMILAIRES ]

---

## 🧩 Composants

---

### UI

- Button
- Card œuvre
- Badge
- Heading
- Text

---

### Structure

- Section
- Container
- Stack

---

### Visuel

- Hero
- Image block
- Gallery grid

---

### Interactif

- Filters
- Form

---

## ⚡ Patterns UX

---

### Section

Image → espace → texte → action

---

### Page

Hero → immersion → exploration → connexion → action

---

### Fiche œuvre

Image → infos → émotion → CTA

---

## ⚖️ Équilibre global

Le site doit être :

- simple sans être vide
- immersif sans être lourd
- structuré sans être froid

---

## 🚫 À éviter

- structure complexe
- navigation profonde
- grilles e-commerce classiques

---

## 🧭 Règles de conception

- montrer avant d’expliquer
- limiter les éléments
- garder de l’espace
- privilégier le visuel

---

## 🚀 Vision finale

Le site doit être :

- une expérience
- une exploration
- un espace immersif

---

## 💬 Résumé

La structure sert l’expérience.

Elle doit disparaître derrière l’émotion.
