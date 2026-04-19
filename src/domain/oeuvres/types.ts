import type { ArtworkCategory } from '@/domain/artworks/categories';
import type { ArtworkType } from '@/domain/artworks/types';

export interface OeuvresHeroContent {
    eyebrow: string;
    title: string;
    description: string;
}

export interface OeuvresFiltersContent {
    eyebrow: string;
    title: string;
    description: string;
    categoriesLabel: string;
    collectionsLabel: string;
    typesLabel: string;
    resetLabel: string;
    allLabel: string;
    typeOptions: ReadonlyArray<{
        label: string;
        value: ArtworkType | 'all';
    }>;
}

export interface OeuvresGridContent {
    eyebrow: string;
    countLabel: (count: number) => string;
    emptyEyebrow: string;
    emptyDescription: string;
}

export interface OeuvresPageContent {
    hero: OeuvresHeroContent;
    filters: OeuvresFiltersContent;
    grid: OeuvresGridContent;
}

export type OeuvresCategoryFilter = ArtworkCategory | 'all';
export type OeuvresCollectionFilter = string | 'all';
export type OeuvresTypeFilter = ArtworkType | 'all';
