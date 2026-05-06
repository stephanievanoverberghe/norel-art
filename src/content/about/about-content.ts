import type { AboutPageContent } from '@/domain/about/types';

export const aboutPageContent: AboutPageContent = {
    hero: {
        eyebrow: 'À propos',
        heading: {
            lines: ['Norel Art,', 'visages', 'et contrastes.'],
        },
        leadLines: ['Je crée des portraits, des peintures et des compositions graphiques.', 'Mon travail mélange pop art, manga, street art et matière brute.'],
        supportingText: 'Chaque pièce part d’un visage, d’une couleur ou d’un contraste à pousser jusqu’au bon équilibre.',
        badge: 'Artiste portraitiste',
        image: {
            src: '/images/norel/norel.jpg',
            alt: 'Portrait de Norel Art',
            sizes: '(max-width: 1024px) 100vw, 35rem',
        },
        floatingNote: {
            eyebrow: 'Note',
            lines: ['Portraits, peintures, affiches.', 'Commandes sur mesure.'],
        },
    },
    journey: {
        eyebrow: 'Parcours',
        heading: {
            lines: ['Un retour', 'progressif', 'à l’atelier.'],
        },
        descriptionLines: ['Le dessin a toujours été là.', 'Le site lui donne maintenant un vrai espace de vente.'],
        fragments: [
            {
                step: '01',
                label: 'Avant',
                text: 'Le dessin était présent depuis l’enfance, avec une attirance forte pour les visages, les contrastes et les images très graphiques.',
            },
            {
                step: '02',
                label: 'Bascule',
                text: 'Le retour à la création s’est fait par étapes : reprendre les outils, tester les supports, retrouver un rythme et montrer les premières pièces.',
                offsetClassName: 'lg:ml-12',
            },
            {
                step: '03',
                label: 'Depuis',
                text: 'Aujourd’hui, Norel Art réunit peintures originales, affiches signées, portraits commandés et projets muraux.',
                offsetClassName: 'lg:ml-5',
            },
        ],
    },
    vision: {
        eyebrow: 'Vision',
        heading: {
            lines: ['Des visages,', 'des contrastes,', 'une matière visible.'],
        },
        description: 'La démarche repose sur des portraits expressifs, des couleurs franches, des noirs profonds et des lignes qui donnent de la force au sujet.',
        fragments: [
            {
                index: '01',
                label: 'Visage',
                text: 'Le visage donne le point de départ : expression, cadrage, attitude, intensité.',
            },
            {
                index: '02',
                label: 'Tension',
                text: 'Le contraste entre sombre, lumière et couleur permet de construire une image immédiatement lisible.',
                offsetClassName: 'lg:ml-10',
            },
            {
                index: '03',
                label: 'Trait',
                text: 'Le trait structure le visage, souligne une expression ou casse volontairement une zone trop lisse.',
            },
            {
                index: '04',
                label: 'Matière',
                text: 'La matière reste visible : couches, marques, textures et accidents contrôlés font partie de la pièce.',
                offsetClassName: 'lg:ml-10',
            },
        ],
    },
    finalCta: {
        eyebrow: 'Continuer',
        heading: {
            lines: ['Voir les œuvres', 'ou commander', 'un portrait.'],
        },
        bodyLines: ['Parcourez les peintures et affiches disponibles.', 'Ou envoyez une demande pour une création personnalisée.'],
        primaryAction: {
            href: '/oeuvres',
            label: 'Voir les œuvres',
        },
        secondaryAction: {
            href: '/commandes',
            label: 'Commander un portrait',
        },
    },
};
