import { artworks } from '@/content/artworks/artworks';
import type { Artwork, ArtworkType } from '@/domain/artworks/types';

export function getFeaturedArtworks(): Artwork[] {
    return artworks.filter((artwork) => artwork.highlighted);
}

export function getHomeRevealArtworks(limit = 4): Artwork[] {
    const featured = getFeaturedArtworks();

    if (featured.length >= limit) {
        return featured.slice(0, limit);
    }

    const remaining = artworks.filter((artwork) => !featured.some((item) => item.id === artwork.id));

    return [...featured, ...remaining].slice(0, limit);
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
    return artworks.find((artwork) => artwork.slug === slug);
}

export function getRelatedArtworks(currentArtwork: Artwork, limit = 3): Artwork[] {
    return artworks.filter((artwork) => artwork.id !== currentArtwork.id && artwork.category === currentArtwork.category).slice(0, limit);
}

export interface ArtworkFilters {
    category?: string;
    type?: ArtworkType;
}

export function filterArtworks(filters: ArtworkFilters): Artwork[] {
    return artworks.filter((artwork) => {
        const categoryMatches = filters.category ? artwork.category === filters.category : true;
        const typeMatches = filters.type ? artwork.type === filters.type : true;

        return categoryMatches && typeMatches;
    });
}
