import type { CommandesPageContent } from '@/domain/commandes/types';

export const commandesContent: CommandesPageContent = {
    hero: {
        eyebrow: 'Portraits sur commande',
        title: `Confier un visage.
Une histoire.
Une présence à faire apparaître.`,
        description: `Une commande peut naître d’une photo, d’un souvenir ou de quelques mots.
Je travaille à partir de ce que vous me confiez, avec attention :
le regard d’abord, puis la matière, puis ce qui affleure en silence.`,
        note: 'À partir de 80 € · Matériaux professionnels · Cadre possible en supplément.',
        primaryCtaLabel: 'Me confier une demande',
        primaryCtaHref: '#formulaire',
    },

    sectionNav: [
        { id: 'possibles', label: 'Possibles' },
        { id: 'fragments', label: 'Fragments' },
        { id: 'processus', label: 'Processus' },
        { id: 'reperes', label: 'Repères' },
        { id: 'formulaire', label: 'Formulaire' },
    ],

    offeringsTitle: 'Ce que vous pouvez me confier.',
    offeringsIntro: 'Un visage seul, un couple, une famille, un animal aimé, un cadeau, un hommage. Chaque demande part de ce que vous portez, puis trouve sa forme juste.',

    offerings: [
        {
            title: 'À partir d’un visage',
            text: 'Une photo, un regard, une présence. Je pars d’un visage réel sans chercher une copie froide, mais une traduction sensible.',
        },
        {
            title: 'À partir d’un lien',
            text: 'Couple, famille, enfant, animal : la commande peut garder la trace d’un attachement, d’un souvenir ou d’une présence partagée.',
        },
        {
            title: 'À partir d’une intention',
            text: 'Cadeau, hommage, élan plus intime : parfois quelques mots suffisent pour faire naître la pièce.',
        },
    ],
    usageTags: ['Famille', 'Couple', 'Enfant', 'Animal', 'Cadeau', 'Hommage'],
    techniquesLabel: 'Fusain, graphite, encre, aquarelle, acrylique ou pastel — la technique se précise ensuite selon la demande.',

    examplesTitle: 'Quelques présences déjà confiées.',
    examplesIntro: 'Des visages, des liens, des hommages. Quelques fragments réels pour sentir ce qui peut naître d’une demande confiée.',

    examples: [
        { src: '/images/commandes/co-001.jpg', alt: 'Portrait sur commande en noir et blanc', label: 'Portrait confié' },
        { src: '/images/commandes/co-002.jpg', alt: 'Portrait cadeau réalisé à partir d’une photo', label: 'Visage offert' },
        { src: '/images/commandes/co-003.jpg', alt: 'Portrait hommage à partir d’un souvenir', label: 'Hommage discret' },
        { src: '/images/commandes/co-004.jpg', alt: 'Portrait expressif au regard marqué', label: 'Présence vive' },
        { src: '/images/commandes/co-005.jpg', alt: 'Portrait d’animal sur commande', label: 'Animal aimé' },
        { src: '/images/commandes/co-006.jpg', alt: 'Portrait de groupe sur mesure', label: 'Mémoire de famille' },
    ],

    processTitle: 'Un déroulé clair, sans rigidité.',
    processIntro: 'La commande reste humaine et cadrée : échange, proposition, création, envoi.',

    process: [
        {
            step: '01',
            title: 'Premier message',
            text: 'Vous partagez une intention, une ou plusieurs photos, et ce qui compte dans la demande.',
            aside: 'Un point de départ suffit. Rien n’a besoin d’être parfaitement formulé.',
        },
        {
            step: '02',
            title: 'Cadrage & devis',
            text: 'Je précise le format, la technique, le délai et le budget. Le devis reste gratuit.',
            aside: 'On cherche ensemble la forme la plus juste.',
        },
        {
            step: '03',
            title: 'Validation',
            text: 'La commande est confirmée avec un acompte de 50 %, puis je lance la création.',
            aside: 'C’est le moment où la pièce commence réellement à exister.',
        },
        {
            step: '04',
            title: 'Création & envoi',
            text: 'Je réalise la pièce sur matériaux professionnels, puis l’expédie avec soin.',
            aside: 'Chaque commande suit son propre rythme.',
        },
    ],

    pricingTitle: 'Repères tarifaires',
    pricingIntro:
        'Ces repères concernent les portraits au fusain et au graphite. Pour les autres techniques, les groupes, les caricatures plus poussées ou les demandes particulières, le devis se construit ensuite sur mesure.',
    pricing: [
        { format: 'A4', dimensions: '21 × 29,7 cm', basePrice: '80 €', extraFacePrice: '+ 60 € / visage supplémentaire' },
        { format: 'A3', dimensions: '29,7 × 42 cm', basePrice: '100 €', extraFacePrice: '+ 80 € / visage supplémentaire' },
        { format: 'A2', dimensions: '42 × 59,4 cm', basePrice: '120 €', extraFacePrice: '+ 100 € / visage supplémentaire' },
    ],

    practicalInfos: [
        'Prix indiqués hors livraison.',
        'Expédition en France : entre 5 € et 15 € selon le format.',
        'Un acompte de 50 % permet de valider la commande.',
        'Le cadre peut être ajouté en supplément.',
    ],

    form: {
        eyebrow: 'Formulaire',
        title: 'Confiez-moi les premiers éléments.',
        intro: 'Quelques mots, une photo, une intention : cela suffit pour ouvrir l’échange. Je reviens ensuite vers vous personnellement pour préciser la suite.',
        hints: [
            'Une photo nette aide, mais une intention écrite peut déjà suffire.',
            'Si vous hésitez sur la technique, nous pouvons la définir ensemble.',
            'Pour un cadeau ou un hommage, vous pouvez préciser le délai souhaité.',
        ],
        submitLabel: 'Envoyer la demande',
        requestTypeOptions: [
            { value: 'portrait-photo', label: 'Portrait à partir d’une photo' },
            { value: 'famille-couple', label: 'Famille / couple / groupe' },
            { value: 'animal', label: 'Portrait animalier' },
            { value: 'cadeau-hommage', label: 'Cadeau / hommage' },
        ],
        formatOptions: [
            { value: 'a4', label: 'A4 (21 × 29,7 cm)' },
            { value: 'a3', label: 'A3 (29,7 × 42 cm)' },
            { value: 'a2', label: 'A2 (42 × 59,4 cm)' },
            { value: 'autre', label: 'Autre / à définir' },
        ],
        techniqueOptions: [
            { value: 'fusain', label: 'Fusain' },
            { value: 'graphite', label: 'Graphite' },
            { value: 'encre', label: 'Encre' },
            { value: 'aquarelle', label: 'Aquarelle' },
            { value: 'acrylique', label: 'Acrylique' },
            { value: 'pastel', label: 'Pastel' },
            { value: 'a-definir', label: 'À définir ensemble' },
        ],
    },

    final: {
        title: 'Pas encore tous les mots ?',
        text: 'Vous pouvez simplement m’écrire. Une commande peut commencer par une phrase incomplète.',
        cta: 'Continuer vers le contact',
        href: '/contact',
    },
};
