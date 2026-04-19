import { artworks } from '@/content/artworks/artworks';
import type { Artwork } from '@/domain/artworks/types';
import type { OeuvresCategoryFilter, OeuvresCollectionFilter, OeuvresTypeFilter } from '@/domain/oeuvres/types';

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

export function getRelatedArtworks(currentArtwork: Artwork, pool: Artwork[] = artworks, limit = 3): Artwork[] {
    const sameCategory = pool.filter((item) => item.id !== currentArtwork.id && item.category === currentArtwork.category);

    const sameCollection = pool.filter((item) => item.id !== currentArtwork.id && item.collection === currentArtwork.collection && item.category !== currentArtwork.category);

    const fallback = pool.filter((item) => item.id !== currentArtwork.id);

    return [...sameCategory, ...sameCollection, ...fallback].filter((item, index, array) => array.findIndex((artwork) => artwork.id === item.id) === index).slice(0, limit);
}

interface ArtworkFilters {
    category?: OeuvresCategoryFilter;
    collection?: OeuvresCollectionFilter;
    type?: OeuvresTypeFilter;
}

export function filterArtworks(pool: Artwork[], filters: ArtworkFilters): Artwork[] {
    return pool.filter((artwork) => {
        const categoryMatches = !filters.category || filters.category === 'all' || artwork.category === filters.category;
        const collectionMatches = !filters.collection || filters.collection === 'all' || artwork.collection === filters.collection;
        const typeMatches = !filters.type || filters.type === 'all' || artwork.type === filters.type;

        return categoryMatches && collectionMatches && typeMatches;
    });
}
