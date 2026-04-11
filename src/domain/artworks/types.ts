import type { ArtworkCategory } from '@/domain/artworks/categories';

export type ArtworkType = 'original' | 'print';
export type ArtworkAvailability = 'available' | 'reserved' | 'sold';

export interface Artwork {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    story: string;
    image: string;
    category: ArtworkCategory;
    collection: string;
    type: ArtworkType;
    technique: string;
    support: string;
    dimensions: string;
    priceEur: number;
    availability: ArtworkAvailability;
    highlighted?: boolean;
    tags: string[];
}
