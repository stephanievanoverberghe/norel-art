import type { FresquesPageContent } from '@/domain/fresques/types';

export const fresquesContent: FresquesPageContent = {
    hero: {
        eyebrow: 'Fresques murales',
        title: `Faire entrer
une présence
dans un lieu.`,
        description: `Une fresque ne s’ajoute pas simplement à un mur.
Elle dialogue avec un espace, une lumière, un usage, une émotion.

Je conçois des fresques sensibles et sur mesure,
pour transformer un lieu sans le figer.`,
        note: 'Projet sur devis · Intérieur ou extérieur selon le support · Étude préalable incluse',
        primaryCtaLabel: 'Parler de votre lieu',
        primaryCtaHref: '#formulaire',
    },
    sectionNav: [
        { id: 'intentions', label: 'Intentions' },
        { id: 'fragments', label: 'Fragments' },
        { id: 'processus', label: 'Processus' },
        { id: 'reperes', label: 'Repères' },
        { id: 'formulaire', label: 'Formulaire' },
    ],

    intentionsTitle: 'Ce qu’une fresque peut ouvrir dans un lieu.',
    intentionsIntro:
        'Habiter un mur, marquer une atmosphère, accueillir un regard, transformer une pièce sans la saturer : chaque fresque naît d’un espace réel et d’une intention précise.',

    intentions: [
        {
            title: 'Créer une présence',
            text: 'La fresque peut donner au lieu une tension, un souffle, un centre de gravité sensible.',
        },
        {
            title: 'Transformer sans surcharger',
            text: 'Je cherche une intervention juste : une œuvre qui révèle l’espace au lieu de l’écraser.',
        },
        {
            title: 'Travailler avec le lieu',
            text: 'Lumière, circulation, volumes, usage du mur : la fresque se pense avec l’espace, jamais à côté.',
        },
    ],
    usageTags: ['Maison', 'Atelier', 'Cabinet', 'Commerce', 'Lieu d’accueil', 'Projet privé'],

    examplesTitle: 'Quelques directions possibles.',
    examplesIntro: 'Des fragments, des matières, des ambiances. Des repères pour sentir le type de présence qu’une fresque peut faire naître.',

    examples: [
        { src: '/images/fresques/fr-001.jpg', alt: 'Inspiration de fresque murale 1', label: 'Présence organique' },
        { src: '/images/fresques/fr-002.jpg', alt: 'Inspiration de fresque murale 2', label: 'Tension graphique' },
        { src: '/images/fresques/fr-003.jpg', alt: 'Inspiration de fresque murale 3', label: 'Souffle mural' },
        { src: '/images/fresques/fr-004.jpg', alt: 'Inspiration de fresque murale 4', label: 'Rythme et matière' },
        { src: '/images/fresques/fr-005.jpg', alt: 'Inspiration de fresque murale 5', label: 'Mur habité' },
        { src: '/images/fresques/fr-006.jpg', alt: 'Inspiration de fresque murale 6', label: 'Présence immersive' },
        { src: '/images/fresques/fr-007.jpg', alt: 'Inspiration de fresque murale 7', label: 'Présence organique' },
        { src: '/images/fresques/fr-008.jpg', alt: 'Inspiration de fresque murale 8', label: 'Tension graphique' },
    ],

    processEyebrow: 'Processus',
    processTitle: 'Une fresque se construit avec le lieu.',
    processIntro: 'Chaque projet commence par un échange, puis une lecture de l’espace, avant la proposition visuelle et la réalisation.',

    process: [
        {
            step: '01',
            title: 'Premier échange',
            text: 'Vous me parlez du lieu, de son usage, de son atmosphère, et de ce que vous souhaitez faire émerger.',
            aside: 'Quelques photos, dimensions et intentions suffisent pour commencer.',
        },
        {
            step: '02',
            title: 'Lecture & proposition',
            text: 'J’étudie le mur, la lumière, les volumes et je prépare une direction visuelle adaptée à l’espace.',
            aside: 'Le projet se construit à partir du lieu réel, pas d’un modèle générique.',
        },
        {
            step: '03',
            title: 'Devis & validation',
            text: 'Le devis est établi selon le support, les dimensions, la complexité, les conditions d’intervention et le temps de réalisation.',
            aside: 'Chaque fresque est pensée sur mesure.',
        },
        {
            step: '04',
            title: 'Réalisation',
            text: 'La fresque est réalisée in situ, avec un travail de matière, de rythme et de présence adapté au mur.',
            aside: 'Le lieu devient partie prenante de l’œuvre.',
        },
    ],
    processFrameEyebrow: 'Cadre',
    processFrameTitle: 'Une structure claire, au service du lieu.',
    processFrameText:
        'Le support, la surface, la technique, le calendrier et les conditions d’intervention se précisent ensemble. Le cadre sert le projet ; il ne fige jamais ce qui doit rester vivant.',

    pricingTitle: 'Repères pour un projet sur mesure',
    pricingIntro:
        'Chaque fresque fait l’objet d’un devis personnalisé. Le budget dépend du support, des dimensions, de la préparation du mur, de la technique choisie, du niveau de détail et des conditions d’intervention.',

    practicalInfos: [
        'Projet étudié sur devis uniquement.',
        'Un échange préparatoire est nécessaire avant validation.',
        'Les frais de déplacement peuvent s’ajouter selon le lieu.',
        'Le délai dépend de la surface, du support et de la complexité du projet.',
    ],
    form: {
        eyebrow: 'Formulaire',
        title: 'Parlez-moi du lieu.',
        intro: 'Quelques éléments suffisent pour ouvrir l’échange : le type d’espace, la surface, l’intention et quelques images si vous en avez.',
        hints: [
            'Des photos du mur ou de la pièce sont très utiles.',
            'Si vous ne connaissez pas la surface exacte, une estimation suffit pour commencer.',
            'Même si l’idée est encore floue, vous pouvez décrire l’atmosphère recherchée.',
        ],
        submitLabel: 'Envoyer la demande',
        placeTypeOptions: [
            { value: 'maison', label: 'Maison / intérieur privé' },
            { value: 'atelier', label: 'Atelier / studio' },
            { value: 'cabinet', label: 'Cabinet / lieu de soin' },
            { value: 'commerce', label: 'Commerce / vitrine / accueil' },
            { value: 'autre', label: 'Autre lieu' },
        ],
        surfaceOptions: [
            { value: 'petite', label: 'Petite surface' },
            { value: 'moyenne', label: 'Surface moyenne' },
            { value: 'grande', label: 'Grande surface' },
            { value: 'a-definir', label: 'À définir' },
        ],
        styleOptions: [
            { value: 'organique', label: 'Organique / sensible' },
            { value: 'graphique', label: 'Graphique / contrasté' },
            { value: 'immersif', label: 'Immersif / enveloppant' },
            { value: 'a-definir', label: 'À définir ensemble' },
        ],
    },
};
