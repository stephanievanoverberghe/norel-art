# ⚙️ Norel Art — Développement

---

## 🧭 Rôle du document

Ce document définit la base technique du projet Norel Art.

Il sert de référence pour :

- le développement frontend et backend
- l’architecture du projet
- la gestion des données
- l’administration
- les intégrations externes
- les bonnes pratiques de développement

---

## 🎯 Objectif

Construire un projet :

- propre
- maintenable
- évolutif
- cohérent avec l’expérience utilisateur

---

## 🧠 Principe fondamental

La technique doit servir l’expérience.

---

## ⚙️ Stack technique

---

### Frontend

- Next.js (App Router)
- React
- TypeScript

---

### UI & Styling

- Tailwind CSS
- CSS variables

---

### Animations

- Framer Motion

---

### Formulaires

- React Hook Form
- Zod

---

### Backend

- Next.js API routes

---

### Paiement

- Stripe

---

### Emails

- Resend

---

### Déploiement

- Vercel

---

### Base de données (optionnel MVP)

- PostgreSQL (Neon)

---

## 🧱 Architecture du projet

---

### Structure

```
src/
    app/
    components/
    ui/
    layout/
    marketing/
    content/
    domain/
    application/
    infrastructure/
    lib/
    styles/
```

---

### Répartition

- UI → `ui/`
- composants métier → `components/`
- logique métier → `application/`
- types → `domain/`
- services → `infrastructure/`
- pages → `app/`

---

## 🌐 Routing

---

### Public

- `/`
- `/oeuvres`
- `/oeuvres/[slug]`
- `/a-propos`
- `/commandes`
- `/fresques`
- `/contact`

---

### Admin

- `/admin/login`
- `/admin/dashboard`
- `/admin/oeuvres`
- `/admin/demandes`
- `/admin/temoignages`
- `/admin/settings`

---

### API

- `/api/contact`
- `/api/commandes`
- `/api/temoignages`

---

## 🧠 Data models

---

### Principaux modèles

- Artwork
- Category
- Collection
- CustomRequest
- MuralRequest
- Testimonial
- AdminUser

---

### Optionnel

- Order

---

### Exemple TypeScript

```ts
export interface Artwork {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    description: string;
    emotionalText: string;
    technique: string;
    support: string;
    dimensions: string;
    price: number;
    currency: string;
    isAvailable: boolean;
    isFeatured: boolean;
    categoryId: string;
    collectionId?: string | null;
    createdAt: string;
    updatedAt: string;
}
```

---

## ⚙️ Admin & gestion

---

### 🎯 Objectif

Fournir un back-office simple, rapide et efficace pour gérer le contenu du site sans complexité inutile.

---

### Fonctionnalités principales

- dashboard léger
- gestion des œuvres
- catégories & collections
- demandes (commandes + fresques)
- témoignages
- paramètres du site

---

### Principes

- simplicité avant tout
- interfaces lisibles
- actions rapides
- aucun écran inutile

---

### Règle

L’admin doit simplifier la gestion, pas la compliquer.

---

## 🔌 Intégrations & services

---

### Stripe

- gestion des paiements
- checkout sécurisé
- récupération des informations client

---

### Resend

- envoi des emails
- notifications (contact, demandes)

---

### Stockage images

- Cloudinary recommandé
- gestion des uploads et optimisation

---

### Base de données

- PostgreSQL (Neon recommandé)
- stockage des œuvres, demandes, témoignages

---

### Déploiement

- Vercel
- CI/CD simple

---

### Principe

Externaliser la complexité tout en gardant le contrôle de la logique métier.

---

## ⚡ Performance

---

### Objectif

Offrir une expérience rapide et fluide.

---

### Règles

- optimiser les images
- utiliser lazy loading
- limiter le JavaScript inutile
- éviter les animations lourdes

---

### Priorités

- chargement rapide du hero
- fluidité du scroll
- réactivité globale

---

## ♿ Accessibilité

---

### Objectif

Rendre le site utilisable par tous.

---

### Règles

- contraste suffisant
- HTML sémantique
- navigation clavier
- labels sur les formulaires
- focus visibles

---

### Principe

Une interface belle mais inaccessible reste une mauvaise interface.

---

## 🧩 Règles de développement

---

### Organisation

- 1 fichier = 1 responsabilité
- séparation claire des couches

---

### Composants

- simples
- lisibles
- sans logique métier

---

### Typage

- TypeScript strict
- éviter `any`

---

### Naming

- explicite
- cohérent
- anglais

---

### Styling

- Tailwind uniquement
- pas de styles inline
- tokens centralisés

---

### Logique métier

- dans `application/`
- jamais dans les composants

---

### Services externes

- dans `infrastructure/`
- jamais appel direct depuis UI

---

## ⚖️ Bonnes pratiques

---

- simplicité
- cohérence
- lisibilité
- réutilisation

---

## 🚫 À éviter

---

- sur-architecture
- duplication
- logique dispersée
- complexité prématurée

---

## 🧭 Règle d’or

Un code propre aujourd’hui évite des problèmes demain.
