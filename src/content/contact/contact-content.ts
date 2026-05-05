import type { ContactPageContent } from '@/domain/contact/types';

export const contactPageContent: ContactPageContent = {
    intro: {
        eyebrow: 'Contact',
        title: 'Parlons de votre projet artistique',
        description: 'Achat d’œuvre, commande sur mesure, fresque ou question précise : le formulaire qualifie mieux votre demande pour répondre plus justement.',
    },
    asideParagraphs: [
        'Un message clair permet de comprendre le contexte, le budget, le délai et le type de pièce que vous imaginez.',
        'Pour une œuvre existante, indiquez son titre. Pour une commande, racontez l’intention. Pour une fresque, précisez le lieu et la surface.',
    ],
    form: {
        budgetLabel: 'Budget envisagé',
        budgetPlaceholder: 'Ex. 150 EUR, 500 EUR, à définir',
        cityLabel: 'Ville / lieu',
        cityPlaceholder: 'Ville, région ou lieu du projet',
        fullNameLabel: 'Nom complet',
        fullNamePlaceholder: 'Votre nom',
        emailLabel: 'Email',
        emailPlaceholder: 'votre@email.com',
        phoneLabel: 'Téléphone',
        phonePlaceholder: 'Optionnel, utile pour un projet urgent',
        requestTypeLabel: 'Type de demande',
        requestTypePlaceholder: 'Choisir',
        requestTypeOptions: [
            { value: 'achat', label: 'Achat d’œuvre' },
            { value: 'commande', label: 'Commande sur mesure' },
            { value: 'fresque', label: 'Fresque murale' },
            { value: 'compte', label: 'Compte, commande ou favori' },
            { value: 'autre', label: 'Autre question' },
        ],
        timelineLabel: 'Délai souhaité',
        timelinePlaceholder: 'Ex. ce mois-ci, cadeau, pas pressé',
        messageLabel: 'Message',
        messagePlaceholder: 'Titre de l’œuvre, intention, format, contexte, surface, ambiance, contrainte particulière...',
        submitLabel: 'Envoyer la demande',
    },
};
