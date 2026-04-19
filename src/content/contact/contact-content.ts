import type { ContactPageContent } from '@/domain/contact/types';

export const contactPageContent: ContactPageContent = {
    intro: {
        eyebrow: 'Contact',
        title: 'Parlons de votre projet artistique',
        description: 'Achat d’œuvre, demande de commande, projet mural ou simple question : chaque message reçoit une réponse personnalisée.',
    },
    asideParagraphs: [],
    form: {
        fullNameLabel: 'Nom complet',
        fullNamePlaceholder: 'Votre nom',
        emailLabel: 'Email',
        emailPlaceholder: 'votre@email.com',
        requestTypeLabel: 'Type de demande',
        requestTypePlaceholder: 'Choisir',
        requestTypeOptions: [
            { value: 'commande', label: 'Commande sur mesure' },
            { value: 'fresque', label: 'Fresque murale' },
            { value: 'achat', label: 'Achat d’œuvre' },
            { value: 'autre', label: 'Autre question' },
        ],
        messageLabel: 'Message',
        messagePlaceholder: 'Parlez-moi de votre besoin, de votre intention ou du contexte du projet.',
        submitLabel: 'Envoyer la demande',
    },
};
