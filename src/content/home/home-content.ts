import type { HomePageContent } from '@/domain/home/types';

export const homePageContent: HomePageContent = {
    hero: {
        eyebrow: 'Norel Art · Peinture et illustration',
        titleLines: ['Un regard.', 'Un silence.', 'Tu entres.'],
        description: "Œuvres originales, affiches signées, commandes et fresques murales. Ici, on ressent d’abord. On choisit ensuite.",
        primaryCtaLabel: 'Ouvrir la sélection',
        secondaryCtaLabel: "Parler d'une commande",
        secondaryCtaHref: '/commandes',
        scrollTargetId: 'selection-oeuvres',
        image: {
            src: '/images/hero/norel-hero.jpg',
            alt: 'Regard intense dans une atmosphère sombre',
            sizes: '100vw',
        },
    },
    featuredReveal: {
        id: 'selection-oeuvres',
        eyebrow: 'Première apparition',
        title: 'Le regard surgit avant le mot.',
        description: 'Une présence centrale. Deux échos autour. L’exploration commence sans bruit.',
        ctaLabel: 'Explorer les œuvres',
        ctaHref: '/oeuvres',
        footerNote: 'Originaux, affiches signées, pièces disponibles ou en réserve : chaque présence ouvre un dialogue différent.',
    },
    categories: {
        eyebrow: 'Explorer autrement',
        title: 'Chaque regard ouvre un passage différent.',
        description: 'Approcher les œuvres par leur nature, leur tension, ou leur matière.',
        cardCtaLabel: 'Explorer',
    },
    universe: {
        eyebrow: 'L’univers',
        title: 'Peindre ce qui ne se dit pas.',
        paragraphs: [
            'Chaque visage est une présence. Chaque trace, une tentative de retenir quelque chose qui disparaît.',
            'Il ne s’agit pas de représenter. Il s’agit de faire émerger.',
            'Laisser apparaître ce qui était déjà là, mais que personne ne regardait vraiment.',
        ],
        ctaLabel: 'Découvrir la démarche',
        ctaHref: '/a-propos',
        image: {
            src: '/images/norel/norel.jpg',
            alt: 'Norel Art dans son atelier',
            sizes: '(max-width: 1024px) 100vw, 40vw',
        },
    },
    customPaths: {
        intro: {
            eyebrow: 'Prolonger le geste',
            title: 'Deux chemins. Deux façons d’ouvrir l’échange.',
            description: 'Certaines présences se choisissent. D’autres se confient. D’autres encore prennent place directement dans l’espace.',
        },
        items: [
            {
                title: 'Me confier un visage',
                eyebrow: 'Commande sur mesure',
                description: 'Un portrait, une présence, une histoire à faire émerger autrement.',
                href: '/commandes',
                image: '/images/home/commande.jpg',
                alt: 'Œuvre portrait sur mesure de Norel Art',
            },
            {
                title: 'Lui donner un mur',
                eyebrow: 'Fresques murales',
                description: 'Faire entrer le geste dans l’espace. Laisser une émotion prendre place à grande échelle.',
                href: '/fresques',
                image: '/images/home/fresque.jpg',
                alt: 'Fresque murale réalisée par Norel Art',
            },
        ],
    },
    testimonials: {
        intro: {
            eyebrow: 'Résonances',
            title: 'Ils ont regardé. Ils ont été regardés.',
            description: 'Quelques traces laissées par celles et ceux qui ont accueilli une œuvre, confié un visage, ou ouvert un mur à l’émotion.',
        },
        items: [
            {
                quote: 'Quand j’ai découvert l’œuvre, j’ai eu l’impression qu’elle savait déjà quelque chose de moi. Je ne l’ai pas choisie tout de suite. C’est elle qui est restée.',
                name: 'Claire',
                context: 'Aquarelle originale',
            },
            {
                quote: 'Le portrait commandé n’était pas une simple ressemblance. Il y avait une présence, une tension douce, quelque chose de très juste.',
                name: 'Sophie',
                context: 'Commande sur mesure',
            },
            {
                quote: 'La fresque a transformé le lieu. Ce n’était plus seulement un mur. Il y avait une respiration, un regard, une vraie émotion dans l’espace.',
                name: 'Élodie',
                context: 'Projet mural',
            },
        ],
    },
    finalCta: {
        eyebrow: 'Continuer',
        title: 'Peut-être qu’un regard est resté.',
        description: 'Tu peux continuer l’exploration, accueillir une œuvre, ou simplement écrire. Le plus important est peut-être déjà là : quelque chose a bougé.',
        primaryCtaLabel: 'Voir les œuvres',
        primaryCtaHref: '/oeuvres',
        secondaryCtaLabel: 'M’écrire un mot',
        secondaryCtaHref: '/contact',
    },
};
