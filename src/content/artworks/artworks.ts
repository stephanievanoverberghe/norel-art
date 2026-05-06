import rawCatalogueArtworks from '@/content/artworks/catalogue-artworks.json';
import type { ArtworkCategory } from '@/domain/artworks/categories';
import type { Artwork, ArtworkAvailability, ArtworkType } from '@/domain/artworks/types';

interface CatalogueArtworkEntry {
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
    tags: string[];
}

const catalogueArtworks = rawCatalogueArtworks as CatalogueArtworkEntry[];
const highlightedSlugs = new Set(['alchemy', 'ange-rouge', 'apnee']);

export const artworkCollections = Array.from(new Set(catalogueArtworks.map((artwork) => artwork.collection)));

export const artworks: Artwork[] = catalogueArtworks.map((artwork) => ({
    id: artwork.id,
    slug: artwork.slug,
    title: artwork.title,
    excerpt: artwork.excerpt,
    story: artwork.story,
    image: artwork.image,
    gallery: artwork.gallery ?? [],
    category: artwork.category,
    collection: artwork.collection,
    type: artwork.type,
    technique: artwork.technique,
    support: artwork.support,
    dimensions: artwork.dimensions,
    priceEur: artwork.priceEur,
    availability: artwork.availability,
    highlighted: highlightedSlugs.has(artwork.slug),
    tags: artwork.tags,
}));
