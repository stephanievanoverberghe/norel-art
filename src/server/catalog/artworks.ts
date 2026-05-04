import 'server-only';

import type { Prisma } from '@prisma/client';

import { artworks as fallbackArtworks, artworkCategories as fallbackCategories, artworkCollections as fallbackCollections } from '@/domain/artworks/data';
import type { ArtworkCategory } from '@/domain/artworks/categories';
import type { Artwork, ArtworkAvailability, ArtworkType } from '@/domain/artworks/types';
import { prisma } from '@/server/db/prisma';

export const artworkRecordInclude = {
    category: true,
    collection: true,
    images: {
        orderBy: {
            position: 'asc',
        },
    },
    variants: {
        orderBy: {
            createdAt: 'asc',
        },
    },
} satisfies Prisma.ArtworkInclude;

export type ArtworkRecord = Prisma.ArtworkGetPayload<{
    include: typeof artworkRecordInclude;
}>;

interface ArtworkCatalog {
    artworks: Artwork[];
    categories: readonly ArtworkCategory[];
    collections: readonly string[];
}

interface ArtworkDetail {
    artwork?: Artwork;
    artworks: Artwork[];
}

const fallbackCatalog: ArtworkCatalog = {
    artworks: fallbackArtworks,
    categories: fallbackCategories,
    collections: fallbackCollections,
};

const availabilityMap: Record<ArtworkRecord['availability'], ArtworkAvailability> = {
    AVAILABLE: 'available',
    RESERVED: 'reserved',
    SOLD: 'sold',
};

const typeMap: Record<ArtworkRecord['variants'][number]['type'], ArtworkType> = {
    ORIGINAL: 'original',
    PRINT: 'print',
};

function uniqueValues<T extends string>(values: T[]): T[] {
    return [...new Set(values)].filter(Boolean);
}

export function mapArtworkRecord(record: ArtworkRecord): Artwork {
    const activeVariant = record.variants.find((variant) => variant.isActive) ?? record.variants[0];
    const mainImage = record.images.find((image) => image.kind === 'MAIN') ?? record.images[0];
    const imageUrl = mainImage?.url ?? '/images/oeuvres/oeuvres-hero.jpg';
    const gallery = record.images.map((image) => image.url).filter((url) => url !== imageUrl);

    return {
        id: record.id,
        slug: record.slug,
        title: record.title,
        excerpt: record.excerpt,
        story: record.story,
        image: imageUrl,
        gallery,
        category: record.category.name as ArtworkCategory,
        collection: record.collection?.name ?? 'Collection libre',
        type: activeVariant ? typeMap[activeVariant.type] : 'original',
        technique: record.technique ?? 'Technique mixte',
        support: record.support ?? 'Support sur demande',
        dimensions: record.dimensions ?? 'Dimensions sur demande',
        priceEur: activeVariant ? activeVariant.priceCents / 100 : 0,
        availability: availabilityMap[record.availability],
        tags: record.tags,
    };
}

function createCatalog(artworks: Artwork[]): ArtworkCatalog {
    if (artworks.length === 0) {
        return fallbackCatalog;
    }

    return {
        artworks,
        categories: uniqueValues(artworks.map((artwork) => artwork.category)) as ArtworkCategory[],
        collections: uniqueValues(artworks.map((artwork) => artwork.collection)),
    };
}

async function getPublishedArtworkRecords(): Promise<ArtworkRecord[]> {
    return prisma.artwork.findMany({
        where: {
            status: 'PUBLISHED',
        },
        include: artworkRecordInclude,
        orderBy: [
            {
                publishedAt: 'desc',
            },
            {
                createdAt: 'desc',
            },
        ],
    });
}

export async function getPublishedArtworkCatalog(): Promise<ArtworkCatalog> {
    try {
        const records = await getPublishedArtworkRecords();
        return createCatalog(records.map(mapArtworkRecord));
    } catch (error) {
        console.warn('Unable to load artwork catalog from database. Falling back to static content.', error);
        return fallbackCatalog;
    }
}

export async function getPublishedArtworkDetail(slug: string): Promise<ArtworkDetail> {
    try {
        const records = await getPublishedArtworkRecords();
        const artworks = records.map(mapArtworkRecord);

        if (artworks.length === 0) {
            return {
                artwork: fallbackArtworks.find((item) => item.slug === slug),
                artworks: fallbackArtworks,
            };
        }

        return {
            artwork: artworks.find((item) => item.slug === slug),
            artworks,
        };
    } catch (error) {
        console.warn('Unable to load artwork detail from database. Falling back to static content.', error);

        return {
            artwork: fallbackArtworks.find((item) => item.slug === slug),
            artworks: fallbackArtworks,
        };
    }
}
