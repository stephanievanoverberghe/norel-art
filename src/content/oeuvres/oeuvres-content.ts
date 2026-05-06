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
        categoriesLabel: 'Catégories',
        collectionsLabel: 'Collections',
        typesLabel: 'Type',
        resetLabel: 'Réinitialiser les filtres',
        allLabel: 'Toutes',
        typeOptions: [
            { label: 'Toutes', value: 'all' },
            { label: 'Peintures', value: 'original' },
            { label: 'Affiches', value: 'print' },
        ],
    },
    grid: {
        eyebrow: 'Sélection',
        countLabel: 'œuvres affichées',
        emptyEyebrow: 'Aucune œuvre affichée',
        emptyDescription: 'Ajustez les filtres pour explorer une autre sélection.',
    },
};
