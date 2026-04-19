import type { FresquesPageContent } from '@/domain/fresques/types';

export const fresquesPageContent: FresquesPageContent = {
    intro: {
        eyebrow: 'Décision',
        title: 'Créer une fresque qui donne une identité forte à un lieu',
        description: 'Pour hôtels, restaurants, bureaux, commerces ou espaces privés : chaque projet de fresque est conçu sur mesure.',
    },
    asideParagraphs: [
        'Analyse du lieu, direction artistique, maquette et réalisation sur site. Chaque étape reste claire et rapide côté client.',
        'Le style peut aller d’une présence abstraite organique à une narration plus figurative selon l’ambiance recherchée.',
    ],
    form: {
        fullNameLabel: 'Nom complet',
        fullNamePlaceholder: 'Votre nom',
        emailLabel: 'Email',
        emailPlaceholder: 'votre@email.com',
        requestTypeLabel: 'Type de demande',
        requestTypePlaceholder: 'Choisir',
        requestTypeOptions: [
            { value: 'fresque-interieure', label: 'Fresque intérieure' },
            { value: 'fresque-exterieure', label: 'Fresque extérieure' },
            { value: 'signaletique-artistique', label: 'Signalétique artistique' },
            { value: 'autre', label: 'Autre demande murale' },
        ],
        messageLabel: 'Message',
        messagePlaceholder: 'Décrivez le lieu, l’ambiance recherchée, les dimensions approximatives et le calendrier souhaité.',
        submitLabel: 'Envoyer la demande',
    },
};
