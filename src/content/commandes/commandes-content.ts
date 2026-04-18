import type { CommandesPageContent } from '@/domain/commandes/types';

export const commandesContent: CommandesPageContent = {
    hero: {
        eyebrow: 'Commande sur mesure',
        title: `Confier un visage.
Une histoire.
Une présence à faire apparaître.`,
        description: `Certaines images ne demandent pas seulement à être vues.
Elles demandent à être accueillies.

Si tu veux me confier un visage, une photo, un souvenir ou une émotion,
je peux en faire une trace à part.`,
        note: `Chaque commande est une rencontre.
Le tarif se construit sur devis.`,
    },

    types: [
        {
            title: 'À partir d’un visage',
            text: `Une photo, un regard, une présence réelle.
Je travaille à partir de ce que tu me confies — sans chercher la copie froide.`,
        },
        {
            title: 'À partir d’une histoire',
            text: `Parfois, il y a plus qu’un visage.
Il y a un souvenir, une douceur, une fracture, une absence.`,
        },
        {
            title: 'Pour offrir',
            text: `Un portrait peut être un cadeau.
Mais surtout une manière de dire sans tout expliquer.`,
        },
        {
            title: 'Commande libre',
            text: `Tu peux venir avec une intention floue.
Une émotion, une sensation.
            Je peux travailler à partir de cela.`,
        },
    ],

    examples: [
        {
            src: '/images/commandes/co001.jpg',
            alt: 'Exemple de commande personnalisée 1',
            label: 'Portrait sur mesure',
        },
        {
            src: '/images/commandes/co002.jpg',
            alt: 'Exemple de commande personnalisée 2',
            label: 'Visage offert',
        },
        {
            src: '/images/commandes/co003.jpg',
            alt: 'Exemple de commande personnalisée 3',
            label: 'Fragment de mémoire',
        },
        {
            src: '/images/commandes/co004.jpg',
            alt: 'Exemple de commande personnalisée 4',
            label: 'Présence réinventée',
        },
        {
            src: '/images/commandes/co005.jpg',
            alt: 'Exemple de commande personnalisée 5',
            label: 'Regard confié',
        },
        {
            src: '/images/commandes/co006.jpg',
            alt: 'Exemple de commande personnalisée 6',
            label: 'Commande intime',
        },
    ],

    process: [
        {
            step: '01',
            title: 'Tu me confies une intention',
            text: `Une photo, un visage, une histoire, quelques mots.`,
            aside: `Le premier geste : une intention confiée.`,
        },
        {
            step: '02',
            title: 'J’écoute ce qui cherche à apparaître',
            text: `Je reviens vers toi pour préciser le cadre, le format, l’élan juste.`,
            aside: `Le temps de l’écoute et du cadrage sensible.`,
        },
        {
            step: '03',
            title: 'Je crée la pièce',
            text: `Chaque commande prend son propre temps.
Je ne reproduis pas mécaniquement.
Je travaille la présence.`,
            aside: `Le travail de matière, de tension et de présence.`,
        },
        {
            step: '04',
            title: 'Je te fais une proposition',
            text: `Le devis et les modalités se construisent selon la demande, le format et l’intention.`,
            aside: `Le retour vers toi avec une proposition juste.`,
        },
    ],

    pricingIntro: `Pour les portraits au fusain et au graphite, voici quelques repères.
Pour les autres techniques, les caricatures poussées ou les demandes plus spécifiques,
le tarif se construit sur devis.`,

    pricing: [
        {
            format: 'A4',
            dimensions: '21 × 29,7 cm',
            basePrice: '80 €',
            extraFacePrice: '+ 60 € par visage supplémentaire',
        },
        {
            format: 'A3',
            dimensions: '29,7 × 42 cm',
            basePrice: '100 €',
            extraFacePrice: '+ 80 € par visage supplémentaire',
        },
        {
            format: 'A2',
            dimensions: '42 × 59,4 cm',
            basePrice: '120 €',
            extraFacePrice: '+ 100 € par visage supplémentaire',
        },
    ],

    pricingNotes: [
        'Prix hors livraison (5 à 15 € en France).',
        'Les tarifs affichés concernent les portraits au fusain et au graphite.',
        'Option cadre en supplément.',
        'Pour l’acrylique, l’encre, l’aquarelle, le pastel, les groupes ou les demandes spécifiques : devis gratuit et personnalisé.',
        'Un acompte de 50 % est demandé pour valider la commande.',
    ],

    infos: [
        'Chaque commande est réalisée sur devis.',
        'Le tarif dépend du format, de la technique et de l’intention.',
        'Je travaille à partir d’une photo ou d’un échange.',
        'Je réponds personnellement à chaque demande.',
    ],

    formIntro: `Quelques mots suffisent pour commencer.`,

    final: {
        title: `Tu n’as pas encore toutes les images
ou tous les mots ?`,
        text: `Tu peux déjà m’écrire.
Certaines commandes commencent par une phrase presque incomplète.`,
        cta: 'Me confier un visage',
        href: '/contact',
    },
};
