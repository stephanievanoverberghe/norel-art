import type { CommandesPageContent } from '@/domain/commandes/types';

export const commandesContent: CommandesPageContent = {
    hero: {
        eyebrow: 'Portraits sur commande',
        title: `Commander un portrait
à partir d’une photo
ou d’une idée.`,
        description: `Une commande peut partir d’un visage, d’un couple, d’une famille, d’un animal ou d’un cadeau à préparer.
Vous envoyez vos références, le format souhaité et le délai. Je reviens ensuite avec une proposition claire.`,
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

    types: {
        eyebrow: 'Possibles',
        title: 'Ce que vous pouvez me confier.',
        intro: 'Un visage seul, un couple, une famille, un animal aimé, un cadeau ou un hommage. Chaque demande commence avec vos références, puis le format, la technique et le budget se précisent ensemble.',
        offerings: [
            {
                title: 'À partir d’un visage',
                text: 'Je pars d’une ou plusieurs photos pour créer un portrait expressif, pas une copie mécanique.',
            },
            {
                title: 'À partir d’un lien',
                text: 'Couple, famille, enfant ou animal : la composition s’adapte au nombre de sujets et au format choisi.',
            },
            {
                title: 'À partir d’une intention',
                text: 'Pour un cadeau ou un hommage, vous pouvez préciser le contexte, la date souhaitée et ce qui doit rester important.',
            },
        ],
        usageTags: ['Famille', 'Couple', 'Enfant', 'Animal', 'Cadeau', 'Hommage'],
        techniquesLabel: 'Fusain, graphite, encre, aquarelle, acrylique ou pastel — la technique se précise ensuite selon la demande.',
    },

    examples: {
        eyebrow: 'Fragments',
        title: 'Quelques commandes déjà réalisées.',
        intro: 'Portraits personnels, cadeaux, hommages et animaux : des exemples pour imaginer le format et le rendu possibles.',
        items: [
            { src: '/images/commandes/co-001.jpg', alt: 'Portrait sur commande en noir et blanc', label: 'Portrait confié' },
            { src: '/images/commandes/co-002.jpg', alt: 'Portrait cadeau réalisé à partir d’une photo', label: 'Visage offert' },
            { src: '/images/commandes/co-003.jpg', alt: 'Portrait hommage à partir d’un souvenir', label: 'Hommage discret' },
            { src: '/images/commandes/co-004.jpg', alt: 'Portrait expressif au regard marqué', label: 'Portrait expressif' },
            { src: '/images/commandes/co-005.jpg', alt: 'Portrait d’animal sur commande', label: 'Animal aimé' },
            { src: '/images/commandes/co-006.jpg', alt: 'Portrait de groupe sur mesure', label: 'Mémoire de famille' },
        ],
    },

    process: {
        eyebrow: 'Processus',
        title: 'Un déroulé clair, sans rigidité.',
        intro: 'La commande reste humaine et cadrée : échange, proposition, création, envoi.',
        items: [
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
        frameEyebrow: 'Cadre',
        frameTitle: 'Une structure simple, au service de la création.',
        frameText: 'Format, technique, nombre de visages et délai se définissent ensemble. Le cadre sert la pièce — il ne fige jamais ce qui doit rester vivant.',
    },

    pricing: {
        eyebrow: 'Repères',
        title: 'Repères tarifaires',
        intro: 'Ces repères concernent les portraits au fusain et au graphite. Pour les autres techniques, les groupes ou les demandes particulières, le devis se construit ensuite sur mesure.',
        items: [
            { format: 'A4', dimensions: '21 × 29,7 cm', basePrice: '80 €', extraFacePrice: '+ 60 € / visage supplémentaire' },
            { format: 'A3', dimensions: '29,7 × 42 cm', basePrice: '100 €', extraFacePrice: '+ 80 € / visage supplémentaire' },
            { format: 'A2', dimensions: '42 × 59,4 cm', basePrice: '120 €', extraFacePrice: '+ 100 € / visage supplémentaire' },
        ],
        tableTitle: 'Fusain & graphite',
        tableSubtitle: 'Des repères pour un premier visage, puis un supplément par visage ajouté.',
        baseRowLabel: '1 visage',
        extraRowLabel: 'Visage supplémentaire',
        practicalEyebrow: 'À savoir',
        practicalTitle: 'Le reste se construit au plus juste.',
        practicalInfos: [
            'Prix indiqués hors livraison.',
            'Expédition en France : entre 5 € et 15 € selon le format.',
            'Un acompte de 50 % permet de valider la commande.',
            'Le cadre peut être ajouté en supplément.',
        ],
    },

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
        fields: {
            firstNameLabel: 'Prénom',
            firstNamePlaceholder: 'Votre prénom',
            emailLabel: 'Email',
            emailPlaceholder: 'votre@email.com',
            requestTypeLabel: 'Type de demande',
            requestTypePlaceholder: 'Choisir',
            formatLabel: 'Format envisagé',
            formatPlaceholder: 'Choisir',
            facesCountLabel: 'Nombre de visages',
            facesCountPlaceholder: '1, 2, 3...',
            techniqueLabel: 'Technique souhaitée',
            techniquePlaceholder: 'Choisir',
            messageLabel: 'Message',
            messagePlaceholder: 'Parlez-moi du visage, du contexte, d’un cadeau, d’un hommage, du délai souhaité ou simplement de ce qui compte dans cette demande.',
            preformEyebrow: 'Avant d’écrire',
            preformTitle: 'Quelques repères pour commencer.',
            closingText: 'Vous n’avez pas besoin de tout formuler parfaitement. Quelques éléments concrets suffisent pour commencer.',
            footerText: 'Je reviendrai vers vous avec attention pour préciser la suite, le cadre et la proposition la plus juste.',
        },
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
};
