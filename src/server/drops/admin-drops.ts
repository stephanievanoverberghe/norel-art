import 'server-only';

import type { DropStatus, Prisma } from '@prisma/client';

import { slugify } from '@/lib/utils/slugify';
import { prisma } from '@/server/db/prisma';

const adminDropInclude = {
    artworks: {
        include: {
            artwork: {
                include: {
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
                },
            },
        },
        orderBy: {
            position: 'asc',
        },
    },
    _count: {
        select: {
            artworks: true,
            waitlistEntries: true,
        },
    },
} satisfies Prisma.DropInclude;

const adminDropArtworkOptionInclude = {
    category: true,
    collection: true,
    images: {
        orderBy: {
            position: 'asc',
        },
        take: 1,
    },
    variants: {
        orderBy: {
            createdAt: 'asc',
        },
        take: 1,
    },
} satisfies Prisma.ArtworkInclude;

export type AdminDrop = Prisma.DropGetPayload<{
    include: typeof adminDropInclude;
}>;

export type AdminDropArtworkOption = Prisma.ArtworkGetPayload<{
    include: typeof adminDropArtworkOptionInclude;
}>;

export interface AdminDropArtworkInput {
    artworkId: string;
    position: number;
}

export interface AdminDropInput {
    accessLabel?: string | null;
    artworkLinks: AdminDropArtworkInput[];
    description: string;
    endsAt?: Date | null;
    eyebrow?: string | null;
    heroImageAlt?: string | null;
    heroImagePublicId?: string | null;
    heroImageUrl?: string | null;
    isFeatured: boolean;
    seoDescription?: string | null;
    seoTitle?: string | null;
    slug?: string | null;
    startsAt: Date;
    status: DropStatus;
    title: string;
    waitlistEnabled: boolean;
}

function cleanNullable(value?: string | null) {
    return value?.trim() || null;
}

function cleanDate(value: Date, label: string) {
    if (Number.isNaN(value.getTime())) {
        throw new Error(`${label} is invalid`);
    }

    return value;
}

function cleanDropInput(input: AdminDropInput) {
    const title = input.title.trim();
    const description = input.description.trim();
    const startsAt = cleanDate(input.startsAt, 'Drop start date');
    const endsAt = input.endsAt ? cleanDate(input.endsAt, 'Drop end date') : null;

    if (!title) throw new Error('Drop title is required');
    if (!description) throw new Error('Drop description is required');
    if (endsAt && endsAt <= startsAt) throw new Error('Drop end date must be after start date');

    const artworkLinks = [...new Map(input.artworkLinks.filter((link) => link.artworkId).map((link) => [link.artworkId, link])).values()]
        .map((link) => ({
            artworkId: link.artworkId,
            position: Number.isFinite(link.position) ? Math.max(0, Math.floor(link.position)) : 0,
        }))
        .sort((first, second) => first.position - second.position);

    return {
        accessLabel: cleanNullable(input.accessLabel),
        artworkLinks,
        description,
        endsAt,
        eyebrow: cleanNullable(input.eyebrow),
        heroImageAlt: cleanNullable(input.heroImageAlt),
        heroImagePublicId: cleanNullable(input.heroImagePublicId),
        heroImageUrl: cleanNullable(input.heroImageUrl),
        isFeatured: input.isFeatured,
        requestedSlug: cleanNullable(input.slug),
        seoDescription: cleanNullable(input.seoDescription),
        seoTitle: cleanNullable(input.seoTitle),
        startsAt,
        status: input.status,
        title,
        waitlistEnabled: input.waitlistEnabled,
    };
}

async function getUniqueDropSlug(title: string, requestedSlug?: string | null, ignoredDropId?: string) {
    const baseSlug = slugify(requestedSlug || title) || 'drop';
    let candidate = baseSlug;
    let suffix = 2;

    while (true) {
        const where: Prisma.DropWhereInput = { slug: candidate };

        if (ignoredDropId) {
            where.NOT = { id: ignoredDropId };
        }

        const existing = await prisma.drop.findFirst({
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

async function syncDropArtworks(dropId: string, artworkLinks: AdminDropArtworkInput[], tx: Prisma.TransactionClient) {
    await tx.dropArtwork.deleteMany({
        where: {
            dropId,
        },
    });

    if (artworkLinks.length === 0) return;

    await tx.dropArtwork.createMany({
        data: artworkLinks.map((link) => ({
            artworkId: link.artworkId,
            dropId,
            position: link.position,
        })),
    });
}

export async function getAdminDrops(): Promise<AdminDrop[]> {
    return prisma.drop.findMany({
        include: adminDropInclude,
        orderBy: [
            {
                startsAt: 'desc',
            },
            {
                updatedAt: 'desc',
            },
        ],
    });
}

export async function getAdminDropById(dropId: string): Promise<AdminDrop | null> {
    return prisma.drop.findUnique({
        where: {
            id: dropId,
        },
        include: adminDropInclude,
    });
}

export async function getAdminDropArtworkOptions(): Promise<AdminDropArtworkOption[]> {
    return prisma.artwork.findMany({
        include: adminDropArtworkOptionInclude,
        orderBy: [
            {
                status: 'desc',
            },
            {
                updatedAt: 'desc',
            },
        ],
    });
}

export async function getAdminDropStats() {
    const [total, live, scheduled, draft, featured, waitlistEntries, linkedArtworks] = await prisma.$transaction([
        prisma.drop.count(),
        prisma.drop.count({
            where: {
                status: 'LIVE',
            },
        }),
        prisma.drop.count({
            where: {
                status: 'SCHEDULED',
            },
        }),
        prisma.drop.count({
            where: {
                status: 'DRAFT',
            },
        }),
        prisma.drop.count({
            where: {
                isFeatured: true,
            },
        }),
        prisma.waitlistEntry.count({
            where: {
                dropId: {
                    not: null,
                },
            },
        }),
        prisma.dropArtwork.count(),
    ]);

    return {
        draft,
        featured,
        linkedArtworks,
        live,
        scheduled,
        total,
        waitlistEntries,
    };
}

export async function createAdminDrop(input: AdminDropInput): Promise<AdminDrop> {
    const cleaned = cleanDropInput(input);
    const slug = await getUniqueDropSlug(cleaned.title, cleaned.requestedSlug);

    return prisma.$transaction(async (tx) => {
        const drop = await tx.drop.create({
            data: {
                accessLabel: cleaned.accessLabel,
                description: cleaned.description,
                endsAt: cleaned.endsAt,
                eyebrow: cleaned.eyebrow,
                heroImageAlt: cleaned.heroImageAlt,
                heroImagePublicId: cleaned.heroImagePublicId,
                heroImageUrl: cleaned.heroImageUrl,
                isFeatured: cleaned.isFeatured,
                seoDescription: cleaned.seoDescription,
                seoTitle: cleaned.seoTitle,
                slug,
                startsAt: cleaned.startsAt,
                status: cleaned.status,
                title: cleaned.title,
                waitlistEnabled: cleaned.waitlistEnabled,
            },
        });

        await syncDropArtworks(drop.id, cleaned.artworkLinks, tx);

        return tx.drop.findUniqueOrThrow({
            where: {
                id: drop.id,
            },
            include: adminDropInclude,
        });
    });
}

export async function updateAdminDrop(dropId: string, input: AdminDropInput): Promise<AdminDrop> {
    const existing = await getAdminDropById(dropId);
    if (!existing) throw new Error('Drop not found');

    const cleaned = cleanDropInput(input);
    const slug = await getUniqueDropSlug(cleaned.title, cleaned.requestedSlug, dropId);

    return prisma.$transaction(async (tx) => {
        const drop = await tx.drop.update({
            where: {
                id: existing.id,
            },
            data: {
                accessLabel: cleaned.accessLabel,
                description: cleaned.description,
                endsAt: cleaned.endsAt,
                eyebrow: cleaned.eyebrow,
                heroImageAlt: cleaned.heroImageAlt,
                heroImagePublicId: cleaned.heroImagePublicId,
                heroImageUrl: cleaned.heroImageUrl,
                isFeatured: cleaned.isFeatured,
                seoDescription: cleaned.seoDescription,
                seoTitle: cleaned.seoTitle,
                slug,
                startsAt: cleaned.startsAt,
                status: cleaned.status,
                title: cleaned.title,
                waitlistEnabled: cleaned.waitlistEnabled,
            },
        });

        await syncDropArtworks(drop.id, cleaned.artworkLinks, tx);

        return tx.drop.findUniqueOrThrow({
            where: {
                id: drop.id,
            },
            include: adminDropInclude,
        });
    });
}
