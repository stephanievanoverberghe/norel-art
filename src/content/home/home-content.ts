import type { HomePageContent } from '@/domain/home/types';

export const homePageContent: HomePageContent = {
    hero: {
        eyebrow: 'Norel Art · Boutique d’artiste',
        titleLines: ['Peintures originales.', 'Affiches signées.'],
        description: 'Des œuvres à acheter en ligne, des affiches à offrir et des portraits à commander. La galerie présente les pièces disponibles, les formats et les prix sans détour.',
        primaryCtaLabel: 'Voir les pièces disponibles',
        secondaryCtaLabel: 'Commander un portrait',
        secondaryCtaHref: '/commandes',
        scrollTargetId: 'selection-oeuvres',
        image: {
            src: '/images/hero/norel-hero.jpg',
            alt: 'Portrait Norel Art dans une atmosphère bleu nuit',
            sizes: '100vw',
        },
    },
    featuredReveal: {
        id: 'selection-oeuvres',
        eyebrow: 'Œuvres disponibles',
        title: 'Les pièces que vous pouvez acheter maintenant.',
        description: 'Chaque fiche indique le prix, le format, la technique, la disponibilité et les options d’achat.',
        ctaLabel: 'Voir toute la galerie',
        ctaHref: '/oeuvres',
        footerNote: 'Ajoutez une œuvre aux favoris pour y revenir, ou contactez l’atelier si vous voulez une pièce proche.',
    },
    categories: {
        eyebrow: 'Parcourir la galerie',
        title: 'Choisir par univers visuel.',
        description: 'Portrait, pop art, manga, graphisme ou street art : chaque catégorie ouvre une sélection précise.',
        cardCtaLabel: 'Explorer',
    },
    universe: {
        eyebrow: 'L’artiste',
        title: 'Un travail centré sur les visages, les contrastes et les formats qui marquent.',
        paragraphs: [
            'Norel Art crée des portraits, des compositions pop et des pièces graphiques construites autour des visages et des contrastes.',
            'Les œuvres mélangent peinture, illustration, références manga, street art et contrastes marqués.',
            'Chaque pièce est pensée pour exister seule : sur un mur, dans une collection ou comme point de départ d’une commande.',
        ],
        ctaLabel: 'Découvrir l’artiste',
        ctaHref: '/a-propos',
        image: {
            src: '/images/norel/norel.jpg',
            alt: 'Norel Art dans son atelier',
            sizes: '(max-width: 1024px) 100vw, 40vw',
        },
    },
    customPaths: {
        intro: {
            eyebrow: 'Commandes et murs',
            title: 'Commander une œuvre ou une fresque.',
            description: 'Pour un portrait personnel, une idée précise ou un mur à transformer, le formulaire permet de cadrer le projet, le format, le lieu et le budget.',
        },
        items: [
            {
                title: 'Commander un portrait',
                eyebrow: 'Commande sur mesure',
                description: 'Envoyez votre idée, vos références et le format souhaité. L’atelier revient vers vous avec une proposition.',
                href: '/commandes',
                image: '/images/home/commande.jpg',
                alt: 'Œuvre portrait sur mesure de Norel Art',
            },
            {
                title: 'Créer une fresque',
                eyebrow: 'Fresques murales',
                description: 'Un projet mural pour un intérieur, un commerce ou un lieu de vie : surface, style, délai et budget sont étudiés ensemble.',
                href: '/fresques',
                image: '/images/home/fresque.jpg',
                alt: 'Fresque murale réalisée par Norel Art',
            },
        ],
    },
    testimonials: {
        intro: {
            eyebrow: 'Avis clients',
            title: 'Des œuvres reçues, offertes ou commandées.',
            description: 'Retours de clientes et clients après achat, commande personnalisée ou projet mural.',
        },
        items: [
            {
                quote: 'J’ai acheté une aquarelle après l’avoir vue plusieurs fois dans la galerie. Les photos, le format et les détails m’ont aidée à choisir sans hésiter.',
                name: 'Claire',
                context: 'Aquarelle originale',
            },
            {
                quote: 'Le portrait commandé a gardé les traits importants sans tomber dans la copie froide. L’échange était clair du premier message à la livraison.',
                name: 'Sophie',
                context: 'Commande sur mesure',
            },
            {
                quote: 'La fresque a vraiment changé l’accueil du lieu. Le projet a été cadré avec les dimensions, les contraintes du mur et le rendu attendu.',
                name: 'Élodie',
                context: 'Projet mural',
            },
        ],
    },
    finalCta: {
        eyebrow: 'Galerie',
        title: 'Voir les pièces disponibles.',
        description: 'Parcourez les peintures, les affiches et les commandes possibles. Chaque fiche indique le prix, le format et la disponibilité.',
        primaryCtaLabel: 'Voir la galerie',
        primaryCtaHref: '/oeuvres',
        secondaryCtaLabel: 'Contacter l’atelier',
        secondaryCtaHref: '/contact',
    },
};
