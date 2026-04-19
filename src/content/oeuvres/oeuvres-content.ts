import type { OeuvresPageContent } from '@/domain/oeuvres/types';

export const oeuvresContent: OeuvresPageContent = {
    hero: {
        eyebrow: 'Galerie',
        title: `Des présences.
À laisser venir.`,
        description: 'Originaux, impressions, fragments. Chaque œuvre ne se comprend pas immédiatement. Elle se laisse approcher.',
    },
    filters: {
        eyebrow: 'Explorer',
        title: 'La galerie',
        description: 'Approcher les œuvres par leur nature, leur série ou leur présence.',
        categoriesLabel: 'Catégories',
        collectionsLabel: 'Collections',
        typesLabel: 'Type',
        resetLabel: 'Réinitialiser les filtres',
        allLabel: 'Toutes',
        typeOptions: [
            { label: 'Toutes', value: 'all' },
            { label: 'Originaux', value: 'original' },
            { label: 'Impressions', value: 'print' },
        ],
    },
    grid: {
        eyebrow: 'Sélection',
        countLabel: (count: number) => `${count} présences à approcher`,
        emptyEyebrow: 'Aucune œuvre affichée',
        emptyDescription: 'Ajustez les filtres pour explorer une autre sélection.',
    },
};
