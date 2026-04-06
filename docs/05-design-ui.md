# 🎨 Norel Art — Design UI

---

## 🧭 Rôle du document

Ce document définit l’interface visuelle du site Norel Art.

Il sert de référence pour :

- le design (Figma)
- le développement frontend (Next.js / Tailwind)
- le design system
- les composants UI

Il traduit la direction artistique et l’expérience utilisateur en interface concrète.

---

## 🎯 Objectif

Créer une interface :

- immersive
- élégante
- lisible
- émotionnelle

---

## 🧠 Principe fondamental

L’interface doit rester discrète.

Si l’UI devient visible, l’expérience disparaît.

---

## 🎨 Design system

---

### Tokens principaux

#### Couleurs

- `--bg-primary` : #0D1B2A
- `--surface` : #5B1E33
- `--accent` : #9E0031
- `--text-primary` : #F7F7F7
- `--muted` : #474747

---

#### Typographies

- `--font-heading` : 'Catchy Mager'
- `--font-body` : 'Montserrat', sans-serif

---

#### Espacements

- `space-xs`
- `space-sm`
- `space-md`
- `space-lg`
- `space-xl`
- `space-2xl`

---

#### Rayons

- `radius-sm`
- `radius-md`
- `radius-lg`

---

## ✏️ Typographie & hiérarchie

---

### Catchy Mager (titres)

Utilisation :

- H1
- phrases fortes
- éléments émotionnels

Rôle :

- attirer
- incarner l’identité

---

### Montserrat (corps)

Utilisation :

- texte
- UI
- navigation
- formulaires

Rôle :

- structurer
- équilibrer

---

### Hiérarchie

- H1 → Catchy Mager
- H2 → Montserrat (bold)
- H3 → Montserrat (medium)
- Body → Montserrat (regular)
- Caption → Montserrat (light)

---

### Règle

Catchy Mager attire.  
Montserrat stabilise.

---

## 🎨 Couleurs & usage UI

---

### Fond

- sombre dominant

---

### Texte

- blanc pour lisibilité

---

### Accent

- utilisé avec parcimonie (CTA, hover)

---

### CSS

```css
:root {
    --bg-primary: #0d1b2a;
    --surface: #5b1e33;
    --accent: #9e0031;
    --text-primary: #f7f7f7;
    --muted: #474747;
}
```

---

### Tailwind

```javascript
theme: {
  extend: {
    colors: {
      bg: "var(--bg-primary)",
      surface: "var(--surface)",
      accent: "var(--accent)",
      text: "var(--text-primary)",
      muted: "var(--muted)",
    }
  }
}
```

---

## 🧩 Composants UI

---

### 🎯 Principe

Les composants doivent être :

- simples
- réutilisables
- cohérents
- discrets

---

👉 L’UI ne doit jamais voler la vedette au contenu.

---

## 🔘 Button

---

### Rôle

Déclencher une action sans casser l’immersion

---

### Variantes

- Primary → action principale
- Secondary → action secondaire
- Ghost → action discrète

---

### Style

- padding confortable
- bordures fines
- transitions douces

---

### États

- default
- hover → léger éclaircissement
- active → léger enfoncement
- disabled

---

### Copy

- privilégier un langage émotionnel

Exemples :

- Je la choisis
- Voir ce regard

---

## 🖼️ Card œuvre

---

### Rôle

Présenter une œuvre sans la dénaturer

---

### Structure

- image dominante
- titre optionnel

---

### Interaction

- hover → zoom très léger
- contraste subtil

---

### Règle

👉 l’image reste toujours prioritaire

---

## 🧱 Section

---

### Rôle

Structurer les pages

---

### Caractéristiques

- padding vertical généreux
- espace important
- possibilité de fond

---

### Variantes

- immersive (plein écran)
- standard

---

## 📐 Container

---

### Rôle

Limiter la largeur du contenu

---

### Caractéristiques

- max-width
- centrage
- padding horizontal

---

---

## ✏️ Heading

---

### Rôle

Structurer la lecture

---

### Variantes

- H1 → Catchy Mager
- H2 → Montserrat bold
- H3 → Montserrat medium

---

### Règle

👉 hiérarchie simple et claire

---

## 📝 Text

---

### Rôle

Contenu principal

---

### Variantes

- body
- small
- muted

---

### Style

- lisible
- espacé
- fluide

---

## 🏷️ Badge / Tag

---

### Rôle

Afficher les catégories / techniques

---

### Style

- petit
- discret
- fond léger

---

---

## 🎛️ Filters

---

### Rôle

Filtrer les œuvres

---

### Structure

- boutons horizontaux
- état actif visible

---

### Style

- minimal
- transitions douces

---

---

## 🧾 Form

---

### Rôle

Collecter des informations

---

### Champs

- input
- textarea
- select

---

### Style

- fond sombre
- bordures fines
- focus doux

---

### UX

- labels clairs
- validation simple

---

---

## 🖼️ Image Block

---

### Rôle

Mettre en avant une image

---

### Style

- grande
- immersive
- sans distraction

---

---

## 🎬 Hero

---

### Rôle

Créer un impact immédiat

---

### Structure

- image full screen
- texte minimal
- animation lente

---

---

## 🧭 Navigation

---

### Rôle

Permettre de se repérer sans casser l’expérience

---

### Structure

- logo
- quelques liens
- CTA discret

---

### Comportement

- transparent au départ
- apparaît au scroll
- discret

---

---

## ⚡ États globaux

---

### Hover

- léger
- fluide

---

### Focus

- visible mais discret

---

### Active

- subtil

---

---

## 🧠 Patterns UI

---

### Pattern section

Visuel → espace → texte → action

---

### Pattern page

Hero → immersion → exploration → connexion → action

---

### Pattern fiche œuvre

Image → infos → émotion → CTA

---

---

## ⚖️ Règles globales

---

### Simplicité

Éviter les variantes inutiles

---

### Cohérence

Utiliser les mêmes styles partout

---

### Réutilisation

Un composant doit servir plusieurs fois

---

### Discrétion

L’UI doit rester en retrait

---

---

## 🚫 À éviter

- composants complexes
- styles incohérents
- UI trop visible
- surcharge visuelle

---

---

## 🧭 Règle d’or

Le composant sert l’expérience, jamais l’inverse.
