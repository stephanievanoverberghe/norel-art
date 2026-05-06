import type { OeuvresPageContent } from '@/domain/oeuvres/types';

export const oeuvresContent: OeuvresPageContent = {
    hero: {
        eyebrow: 'Galerie',
        title: `Peintures, affiches
et pièces disponibles.`,
        description: 'Parcourez les œuvres par type, catégorie ou collection. Les fiches indiquent les images, le format, la technique, le prix et la disponibilité.',
    },
    filters: {
        eyebrow: 'Explorer',
        title: 'La galerie',
        description: 'Filtrer les œuvres par catégorie, collection ou type pour trouver rapidement la pièce qui vous intéresse.',
        searchLabel: 'Recherche',
        searchPlaceholder: 'Titre, technique, collection...',
        categoriesLabel: 'Catégories',
        collectionsLabel: 'Collections',
        typesLabel: 'Type',
        availabilityLabel: 'Disponibilité',
        sortLabel: 'Trier',
        resetLabel: 'Réinitialiser les filtres',
        allLabel: 'Toutes',
        typeOptions: [
            { label: 'Toutes', value: 'all' },
            { label: 'Peintures', value: 'original' },
            { label: 'Affiches', value: 'print' },
        ],
        availabilityOptions: [
            { label: 'Toutes', value: 'all' },
            { label: 'Disponibles', value: 'available' },
            { label: 'Réservées', value: 'reserved' },
            { label: 'Vendues', value: 'sold' },
        ],
        sortOptions: [
            { label: 'Sélection', value: 'featured' },
            { label: 'Prix croissant', value: 'price-asc' },
            { label: 'Prix décroissant', value: 'price-desc' },
            { label: 'A à Z', value: 'title-asc' },
        ],
    },
    grid: {
        eyebrow: 'Sélection',
        countLabelSingular: 'œuvre affichée',
        countLabel: 'œuvres affichées',
        emptyEyebrow: 'Aucune œuvre affichée',
        emptyDescription: 'Ajustez les filtres pour explorer une autre sélection.',
    },
};
