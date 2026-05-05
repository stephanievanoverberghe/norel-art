import 'server-only';

import type { CollectionStatus, Prisma } from '@prisma/client';

import { slugify } from '@/lib/utils/slugify';
import { prisma } from '@/server/db/prisma';

const adminCollectionInclude = {
    artworks: {
        orderBy: {
            updatedAt: 'desc',
        },
        select: {
            availability: true,
            id: true,
            images: {
                orderBy: {
                    position: 'asc',
                },
                take: 1,
            },
            slug: true,
            status: true,
            title: true,
        },
        take: 6,
    },
    _count: {
        select: {
            artworks: true,
            waitlistEntries: true,
        },
    },
} satisfies Prisma.CollectionInclude;

export type AdminCollection = Prisma.CollectionGetPayload<{
    include: typeof adminCollectionInclude;
}>;

export interface AdminCollectionInput {
    description?: string | null;
    eyebrow?: string | null;
    heroImageAlt?: string | null;
    heroImagePublicId?: string | null;
    heroImageUrl?: string | null;
    isFeatured: boolean;
    name: string;
    position: number;
    seoDescription?: string | null;
    seoTitle?: string | null;
    slug?: string | null;
    status: CollectionStatus;
}

function cleanNullable(value?: string | null) {
    return value?.trim() || null;
}

function cleanCollectionInput(input: AdminCollectionInput) {
    const name = input.name.trim();

    if (!name) {
        throw new Error('Collection name is required');
    }

    return {
        description: cleanNullable(input.description),
        eyebrow: cleanNullable(input.eyebrow),
        heroImageAlt: cleanNullable(input.heroImageAlt),
        heroImagePublicId: cleanNullable(input.heroImagePublicId),
        heroImageUrl: cleanNullable(input.heroImageUrl),
        isFeatured: input.isFeatured,
        name,
        position: Number.isFinite(input.position) ? Math.max(0, Math.floor(input.position)) : 0,
        requestedSlug: cleanNullable(input.slug),
        seoDescription: cleanNullable(input.seoDescription),
        seoTitle: cleanNullable(input.seoTitle),
        status: input.status,
    };
}

async function getUniqueCollectionSlug(name: string, requestedSlug?: string | null, ignoredCollectionId?: string) {
    const baseSlug = slugify(requestedSlug || name) || 'collection';
    let candidate = baseSlug;
    let suffix = 2;

    while (true) {
        const where: Prisma.CollectionWhereInput = { slug: candidate };

        if (ignoredCollectionId) {
            where.NOT = { id: ignoredCollectionId };
        }

        const existing = await prisma.collection.findFirst({
            where,
            select: {
                id: true,
            },
        });

        if (!existing) return candidate;

        candidate = `${baseSlug}-${suffix}`;
        suffix += 1;
    }
}

function getPublishedAt(status: CollectionStatus, currentPublishedAt?: Date | null) {
    if (status !== 'PUBLISHED') return null;

    return currentPublishedAt ?? new Date();
}

export async function getAdminCollections(): Promise<AdminCollection[]> {
    return prisma.collection.findMany({
        include: adminCollectionInclude,
        orderBy: [
            {
                position: 'asc',
            },
            {
                updatedAt: 'desc',
            },
        ],
    });
}

export async function getAdminCollectionOptions() {
    return prisma.collection.findMany({
        orderBy: [
            {
                position: 'asc',
            },
            {
                name: 'asc',
            },
        ],
        select: {
            id: true,
            name: true,
            slug: true,
            status: true,
        },
    });
}

export async function getAdminCollectionById(collectionId: string): Promise<AdminCollection | null> {
    return prisma.collection.findUnique({
        where: {
            id: collectionId,
        },
        include: adminCollectionInclude,
    });
}

export async function getAdminCollectionStats() {
    const [total, published, featured, linkedArtworks, waitlistEntries] = await prisma.$transaction([
        prisma.collection.count(),
        prisma.collection.count({
            where: {
                status: 'PUBLISHED',
            },
        }),
        prisma.collection.count({
            where: {
                isFeatured: true,
            },
        }),
        prisma.artwork.count({
            where: {
                collectionId: {
                    not: null,
                },
            },
        }),
        prisma.waitlistEntry.count({
            where: {
                collectionId: {
                    not: null,
                },
            },
        }),
    ]);

    return {
        draft: total - published,
        featured,
        linkedArtworks,
        published,
        total,
        waitlistEntries,
    };
}

export async function createAdminCollection(input: AdminCollectionInput): Promise<AdminCollection> {
    const cleaned = cleanCollectionInput(input);
    const slug = await getUniqueCollectionSlug(cleaned.name, cleaned.requestedSlug);

    return prisma.collection.create({
        data: {
            description: cleaned.description,
            eyebrow: cleaned.eyebrow,
            heroImageAlt: cleaned.heroImageAlt,
            heroImagePublicId: cleaned.heroImagePublicId,
            heroImageUrl: cleaned.heroImageUrl,
            isFeatured: cleaned.isFeatured,
            name: cleaned.name,
            position: cleaned.position,
            publishedAt: getPublishedAt(cleaned.status),
            seoDescription: cleaned.seoDescription,
            seoTitle: cleaned.seoTitle,
            slug,
            status: cleaned.status,
        },
        include: adminCollectionInclude,
    });
}

export async function updateAdminCollection(collectionId: string, input: AdminCollectionInput): Promise<AdminCollection> {
    const existing = await getAdminCollectionById(collectionId);
    if (!existing) throw new Error('Collection not found');

    const cleaned = cleanCollectionInput(input);
    const slug = await getUniqueCollectionSlug(cleaned.name, cleaned.requestedSlug, collectionId);

    return prisma.collection.update({
        where: {
            id: collectionId,
        },
        data: {
            description: cleaned.description,
            eyebrow: cleaned.eyebrow,
            heroImageAlt: cleaned.heroImageAlt,
            heroImagePublicId: cleaned.heroImagePublicId,
            heroImageUrl: cleaned.heroImageUrl,
            isFeatured: cleaned.isFeatured,
            name: cleaned.name,
            position: cleaned.position,
            publishedAt: getPublishedAt(cleaned.status, existing.publishedAt),
            seoDescription: cleaned.seoDescription,
            seoTitle: cleaned.seoTitle,
            slug,
            status: cleaned.status,
        },
        include: adminCollectionInclude,
    });
}
