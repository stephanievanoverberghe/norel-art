import type { ArtworkCategory } from '@/domain/artworks/categories';
import type { ArtworkAvailability, ArtworkType } from '@/domain/artworks/types';

export interface OeuvresHeroContent {
    eyebrow: string;
    title: string;
    description: string;
}

export interface OeuvresFiltersContent {
    eyebrow: string;
    title: string;
    description: string;
    searchLabel: string;
    searchPlaceholder: string;
    categoriesLabel: string;
    collectionsLabel: string;
    typesLabel: string;
    availabilityLabel: string;
    sortLabel: string;
    resetLabel: string;
    allLabel: string;
    typeOptions: ReadonlyArray<{
        label: string;
        value: ArtworkType | 'all';
    }>;
    availabilityOptions: ReadonlyArray<{
        label: string;
        value: ArtworkAvailability | 'all';
    }>;
    sortOptions: ReadonlyArray<{
        label: string;
        value: OeuvresSortOption;
    }>;
}

export interface OeuvresGridContent {
    eyebrow: string;
    countLabelSingular: string;
    countLabel: string;
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
export type OeuvresAvailabilityFilter = ArtworkAvailability | 'all';
export type OeuvresSortOption = 'featured' | 'price-asc' | 'price-desc' | 'title-asc';
