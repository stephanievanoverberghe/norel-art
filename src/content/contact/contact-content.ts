import type { ContactPageContent } from '@/domain/contact/types';

export const contactPageContent: ContactPageContent = {
    intro: {
        eyebrow: 'Contact',
        title: 'Parlons de votre projet artistique',
        description: "Achat d'oeuvre, commande sur mesure, fresque ou question precise : le formulaire qualifie mieux votre demande pour repondre plus justement.",
    },
    asideParagraphs: [
        'Un message clair permet de comprendre le contexte, le budget, le delai et le type de piece que vous imaginez.',
        "Pour une oeuvre existante, indiquez son titre. Pour une commande, racontez l'intention. Pour une fresque, precisez le lieu et la surface.",
    ],
    form: {
        budgetLabel: 'Budget envisage',
        budgetPlaceholder: 'Ex. 150 EUR, 500 EUR, a definir',
        cityLabel: 'Ville / lieu',
        cityPlaceholder: 'Ville, region ou lieu du projet',
        fullNameLabel: 'Nom complet',
        fullNamePlaceholder: 'Votre nom',
        emailLabel: 'Email',
        emailPlaceholder: 'votre@email.com',
        phoneLabel: 'Telephone',
        phonePlaceholder: 'Optionnel, utile pour un projet urgent',
        requestTypeLabel: 'Type de demande',
        requestTypePlaceholder: 'Choisir',
        requestTypeOptions: [
            { value: 'achat', label: "Achat d'oeuvre" },
            { value: 'commande', label: 'Commande sur mesure' },
            { value: 'fresque', label: 'Fresque murale' },
            { value: 'compte', label: 'Compte, commande ou favori' },
            { value: 'autre', label: 'Autre question' },
        ],
        timelineLabel: 'Delai souhaite',
        timelinePlaceholder: 'Ex. ce mois-ci, cadeau, pas presse',
        messageLabel: 'Message',
        messagePlaceholder: "Titre de l'oeuvre, intention, format, contexte, surface, ambiance, contrainte particuliere...",
        submitLabel: 'Envoyer la demande',
    },
};
