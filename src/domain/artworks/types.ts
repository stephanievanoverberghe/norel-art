import type { ArtworkCategory } from '@/domain/artworks/categories';

export type ArtworkType = 'original' | 'print';
export type ArtworkAvailability = 'available' | 'reserved' | 'sold';

export interface ArtworkPurchasableVariant {
    id: string;
    title: string;
    sku: string;
    type: ArtworkType;
    priceCents: number;
    currency: 'EUR';
    stock: number;
    maxPerOrder?: number | null;
    isActive: boolean;
}

export interface ArtworkVideo {
    id: string;
    isFeatured?: boolean;
    provider: 'YOUTUBE';
    thumbnailUrl?: string | null;
    title: string;
    videoId: string;
}

export interface Artwork {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    story: string;
    image: string;
    gallery?: string[];
    category: ArtworkCategory;
    collection: string;
    type: ArtworkType;
    technique: string;
    support: string;
    dimensions: string;
    priceEur: number;
    availability: ArtworkAvailability;
    purchasableVariant?: ArtworkPurchasableVariant;
    videos?: ArtworkVideo[];
    highlighted?: boolean;
    tags: string[];
}
