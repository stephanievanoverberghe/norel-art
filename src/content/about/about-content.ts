import type { AboutPageContent } from '@/types/about';

export const aboutPageContent: AboutPageContent = {
    hero: {
        eyebrow: 'À propos',
        heading: {
            lines: ['Il y a un jour', 'où j’ai repris', 'le trait.'],
        },
        leadLines: ['Longtemps, j’ai tenu ça en silence.', 'Puis j’ai recommencé à tracer.', 'Des regards. Des tensions. Des absences.'],
        supportingText: 'Ce que je peins n’explique pas. Ça apparaît.',
        badge: 'Portraitiste de l’émotion',
        image: {
            src: '/images/norel/norel.jpg',
            alt: 'Portrait de Norel Art',
            sizes: '(max-width: 1024px) 100vw, 35rem',
        },
        floatingNote: {
            eyebrow: 'Note',
            lines: ['Le regard avant le mot.', 'La présence avant l’explication.'],
        },
    },
    journey: {
        eyebrow: 'Parcours',
        heading: {
            lines: ['Longtemps,', 'j’ai tu', 'ce que je voyais.'],
        },
        descriptionLines: ['Ce n’est pas une ligne droite.', 'C’est un retour.'],
        fragments: [
            {
                step: '01',
                label: 'Avant',
                text: 'Le dessin était là depuis l’enfance. Une évidence. Une langue intérieure. Puis il y a eu les freins, les détours, les choses qu’on tait pour tenir.',
            },
            {
                step: '02',
                label: 'Bascule',
                text: 'Après l’épuisement, quelque chose est revenu. Pas comme un passe-temps. Comme une nécessité. Une manière de reprendre souffle autrement.',
                offsetClassName: 'lg:ml-12',
            },
            {
                step: '03',
                label: 'Depuis',
                text: 'J’ai repris un pinceau. Puis un autre. Depuis, je trace des regards, des silences, des absences. Et parfois, des fragments de lumière.',
                offsetClassName: 'lg:ml-5',
            },
        ],
    },
    vision: {
        eyebrow: 'Vision',
        heading: {
            lines: ['Je ne cherche', 'pas à représenter.', 'Je cherche', 'à faire apparaître.'],
        },
        description: 'Entre pop art, manga, street art, expressionnisme et matière brute, je poursuis toujours la même chose : une présence qui tient le regard sans s’épuiser.',
        fragments: [
            {
                index: '01',
                label: 'Regard',
                text: 'Le regard vient avant le mot. Il arrête. Il trouble. Il tient la présence avant toute explication.',
            },
            {
                index: '02',
                label: 'Tension',
                text: 'Je cherche l’endroit où le sombre rencontre la lumière. Là où quelque chose résiste, vibre, apparaît.',
                offsetClassName: 'lg:ml-10',
            },
            {
                index: '03',
                label: 'Trait',
                text: 'Le trait blanc n’est pas un effet. C’est une fracture parfois. Un souffle, parfois aussi. Une manière d’ouvrir le visage.',
            },
            {
                index: '04',
                label: 'Présence',
                text: 'Je ne veux pas illustrer. Je veux faire sentir une présence qui reste un peu après le regard.',
                offsetClassName: 'lg:ml-10',
            },
        ],
    },
    finalCta: {
        eyebrow: 'Continuer',
        heading: {
            lines: ['Et toi,', 'tu les vois ?'],
        },
        bodyLines: ['Tu peux entrer dans les œuvres.', 'Ou me confier un visage, une histoire, une présence à faire apparaître.'],
        primaryAction: {
            href: '/oeuvres',
            label: 'Voir ce regard',
        },
        secondaryAction: {
            href: '/commandes',
            label: 'Me confier un visage',
        },
    },
};
