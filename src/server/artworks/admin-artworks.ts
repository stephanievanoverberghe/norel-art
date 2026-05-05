import 'server-only';

import type { ArtworkAvailability, ArtworkStatus, ImageKind, Prisma, VariantType } from '@prisma/client';

import { slugify } from '@/lib/utils/slugify';
import { prisma } from '@/server/db/prisma';

const adminArtworkInclude = {
    category: true,
    collection: true,
    images: {
        orderBy: {
            position: 'asc',
        },
    },
    videos: {
        orderBy: {
            position: 'asc',
        },
    },
    variants: {
        orderBy: {
            createdAt: 'asc',
        },
    },
    _count: {
        select: {
            favorites: true,
            orderItems: true,
        },
    },
} satisfies Prisma.ArtworkInclude;

export type AdminArtwork = Prisma.ArtworkGetPayload<{
    include: typeof adminArtworkInclude;
}>;

export interface AdminArtworkInput {
    availability: ArtworkAvailability;
    categoryId: string;
    collectionId?: string | null;
    contextImagePublicId?: string | null;
    contextImageUrl?: string | null;
    detailImagePublicId?: string | null;
    detailImageUrl?: string | null;
    dimensions?: string | null;
    editionLabel?: string | null;
    editionSize?: number | null;
    excerpt: string;
    frameImagePublicId?: string | null;
    frameImageUrl?: string | null;
    mainImageAlt?: string | null;
    mainImagePublicId?: string | null;
    mainImageUrl?: string | null;
    maxPerOrder?: number | null;
    priceCents: number;
    sku?: string | null;
    slug?: string | null;
    status: ArtworkStatus;
    stock: number;
    story: string;
    support?: string | null;
    tags: string[];
    technique?: string | null;
    title: string;
    variantTitle: string;
    variantType: VariantType;
    videoThumbnailUrl?: string | null;
    videoTitle?: string | null;
    videoUrl?: string | null;
}

function cleanNullable(value?: string | null) {
    return value?.trim() || null;
}

function cleanArtworkInput(input: AdminArtworkInput) {
    const title = input.title.trim();
    const excerpt = input.excerpt.trim();
    const story = input.story.trim();
    const variantTitle = input.variantTitle.trim();

    if (!title) throw new Error('Artwork title is required');
    if (!excerpt) throw new Error('Artwork excerpt is required');
    if (!story) throw new Error('Artwork story is required');
    if (!input.categoryId) throw new Error('Artwork category is required');
    if (!variantTitle) throw new Error('Variant title is required');
    if (input.priceCents < 0) throw new Error('Artwork price must be positive');
    if (input.stock < 0) throw new Error('Artwork stock must be positive');

    return {
        ...input,
        collectionId: cleanNullable(input.collectionId),
        contextImagePublicId: cleanNullable(input.contextImagePublicId),
        contextImageUrl: cleanNullable(input.contextImageUrl),
        detailImagePublicId: cleanNullable(input.detailImagePublicId),
        detailImageUrl: cleanNullable(input.detailImageUrl),
        dimensions: cleanNullable(input.dimensions),
        editionLabel: cleanNullable(input.editionLabel),
        excerpt,
        frameImagePublicId: cleanNullable(input.frameImagePublicId),
        frameImageUrl: cleanNullable(input.frameImageUrl),
        mainImageAlt: cleanNullable(input.mainImageAlt),
        mainImagePublicId: cleanNullable(input.mainImagePublicId),
        mainImageUrl: cleanNullable(input.mainImageUrl),
        sku: cleanNullable(input.sku),
        slug: cleanNullable(input.slug),
        story,
        support: cleanNullable(input.support),
        technique: cleanNullable(input.technique),
        title,
        variantTitle,
        videoThumbnailUrl: cleanNullable(input.videoThumbnailUrl),
        videoTitle: cleanNullable(input.videoTitle),
        videoUrl: cleanNullable(input.videoUrl),
    };
}

async function getUniqueArtworkSlug(title: string, requestedSlug?: string | null, ignoredArtworkId?: string) {
    const baseSlug = slugify(requestedSlug || title) || 'oeuvre';
    let candidate = baseSlug;
    let suffix = 2;

    while (true) {
        const where: Prisma.ArtworkWhereInput = { slug: candidate };

        if (ignoredArtworkId) {
            where.NOT = { id: ignoredArtworkId };
        }

        const existing = await prisma.artwork.findFirst({
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

async function getUniqueSku(slug: string, requestedSku?: string | null, ignoredVariantId?: string) {
    const baseSku = (requestedSku || `NOREL-${slug}`).trim().toUpperCase().replace(/[^A-Z0-9-]+/g, '-');
    let candidate = baseSku;
    let suffix = 2;

    while (true) {
        const where: Prisma.ProductVariantWhereInput = { sku: candidate };

        if (ignoredVariantId) {
            where.NOT = { id: ignoredVariantId };
        }

        const existing = await prisma.productVariant.findFirst({
            where,
            select: {
                id: true,
            },
        });

        if (!existing) return candidate;

        candidate = `${baseSku}-${suffix}`;
        suffix += 1;
    }
}

function getImageInputs(input: ReturnType<typeof cleanArtworkInput>) {
    const images: Array<{ kind: ImageKind; publicId: string | null; url: string; alt: string; position: number }> = [];
    const mainAlt = input.mainImageAlt || input.title;

    if (input.mainImageUrl) images.push({ kind: 'MAIN', url: input.mainImageUrl, publicId: input.mainImagePublicId, alt: mainAlt, position: 0 });
    if (input.detailImageUrl) images.push({ kind: 'DETAIL', url: input.detailImageUrl, publicId: input.detailImagePublicId, alt: `${input.title} detail`, position: 1 });
    if (input.frameImageUrl) images.push({ kind: 'FRAME', url: input.frameImageUrl, publicId: input.frameImagePublicId, alt: `${input.title} encadree`, position: 2 });
    if (input.contextImageUrl) images.push({ kind: 'CONTEXT', url: input.contextImageUrl, publicId: input.contextImagePublicId, alt: `${input.title} en situation`, position: 3 });

    return images;
}

function extractYoutubeVideoId(value?: string | null) {
    const source = value?.trim();
    if (!source) return null;

    try {
        const url = new URL(source);

        if (url.hostname.includes('youtu.be')) return url.pathname.replace('/', '') || null;
        if (url.searchParams.get('v')) return url.searchParams.get('v');

        const parts = url.pathname.split('/').filter(Boolean);
        const embedIndex = parts.findIndex((part) => part === 'embed' || part === 'shorts');
        if (embedIndex >= 0) return parts[embedIndex + 1] ?? null;
    } catch {
        return source;
    }

    return null;
}

async function syncArtworkImages(artworkId: string, input: ReturnType<typeof cleanArtworkInput>, tx: Prisma.TransactionClient) {
    await tx.artworkImage.deleteMany({
        where: {
            artworkId,
        },
    });

    const images = getImageInputs(input);

    if (images.length === 0) return;

    await tx.artworkImage.createMany({
        data: images.map((image) => ({
            ...image,
            artworkId,
        })),
    });
}

async function syncArtworkVideo(artworkId: string, input: ReturnType<typeof cleanArtworkInput>, tx: Prisma.TransactionClient) {
    await tx.artworkVideo.deleteMany({
        where: {
            artworkId,
        },
    });

    const videoId = extractYoutubeVideoId(input.videoUrl);

    if (!videoId) return;

    await tx.artworkVideo.create({
        data: {
            artworkId,
            videoId,
            title: input.videoTitle || input.title,
            thumbnailUrl: input.videoThumbnailUrl,
            isFeatured: true,
        },
    });
}

export async function getAdminArtworks(): Promise<AdminArtwork[]> {
    return prisma.artwork.findMany({
        include: adminArtworkInclude,
        orderBy: {
            updatedAt: 'desc',
        },
    });
}

export async function getAdminArtworkById(artworkId: string): Promise<AdminArtwork | null> {
    return prisma.artwork.findUnique({
        where: {
            id: artworkId,
        },
        include: adminArtworkInclude,
    });
}

export async function createAdminArtwork(input: AdminArtworkInput): Promise<AdminArtwork> {
    const cleaned = cleanArtworkInput(input);
    const slug = await getUniqueArtworkSlug(cleaned.title, cleaned.slug);
    const sku = await getUniqueSku(slug, cleaned.sku);

    return prisma.$transaction(async (tx) => {
        const artwork = await tx.artwork.create({
            data: {
                title: cleaned.title,
                slug,
                excerpt: cleaned.excerpt,
                story: cleaned.story,
                technique: cleaned.technique,
                support: cleaned.support,
                dimensions: cleaned.dimensions,
                tags: cleaned.tags,
                status: cleaned.status,
                availability: cleaned.availability,
                categoryId: cleaned.categoryId,
                collectionId: cleaned.collectionId,
                publishedAt: cleaned.status === 'PUBLISHED' ? new Date() : null,
                variants: {
                    create: {
                        type: cleaned.variantType,
                        title: cleaned.variantTitle,
                        sku,
                        priceCents: cleaned.priceCents,
                        stock: cleaned.stock,
                        maxPerOrder: cleaned.maxPerOrder,
                        editionSize: cleaned.editionSize,
                        editionLabel: cleaned.editionLabel,
                        isActive: cleaned.status !== 'ARCHIVED',
                    },
                },
            },
            include: adminArtworkInclude,
        });

        await syncArtworkImages(artwork.id, cleaned, tx);
        await syncArtworkVideo(artwork.id, cleaned, tx);

        return tx.artwork.findUniqueOrThrow({
            where: {
                id: artwork.id,
            },
            include: adminArtworkInclude,
        });
    });
}

export async function updateAdminArtwork(artworkId: string, input: AdminArtworkInput): Promise<AdminArtwork> {
    const existing = await getAdminArtworkById(artworkId);
    if (!existing) throw new Error('Artwork not found');

    const cleaned = cleanArtworkInput(input);
    const slug = await getUniqueArtworkSlug(cleaned.title, cleaned.slug, artworkId);
    const variant = existing.variants[0];
    const sku = await getUniqueSku(slug, cleaned.sku, variant?.id);

    return prisma.$transaction(async (tx) => {
        const artwork = await tx.artwork.update({
            where: {
                id: artworkId,
            },
            data: {
                title: cleaned.title,
                slug,
                excerpt: cleaned.excerpt,
                story: cleaned.story,
                technique: cleaned.technique,
                support: cleaned.support,
                dimensions: cleaned.dimensions,
                tags: cleaned.tags,
                status: cleaned.status,
                availability: cleaned.availability,
                categoryId: cleaned.categoryId,
                collectionId: cleaned.collectionId,
                publishedAt: cleaned.status === 'PUBLISHED' ? existing.publishedAt ?? new Date() : null,
            },
        });

        if (variant) {
            await tx.productVariant.update({
                where: {
                    id: variant.id,
                },
                data: {
                    type: cleaned.variantType,
                    title: cleaned.variantTitle,
                    sku,
                    priceCents: cleaned.priceCents,
                    stock: cleaned.stock,
                    maxPerOrder: cleaned.maxPerOrder,
                    editionSize: cleaned.editionSize,
                    editionLabel: cleaned.editionLabel,
                    isActive: cleaned.status !== 'ARCHIVED',
                },
            });
        } else {
            await tx.productVariant.create({
                data: {
                    artworkId,
                    type: cleaned.variantType,
                    title: cleaned.variantTitle,
                    sku,
                    priceCents: cleaned.priceCents,
                    stock: cleaned.stock,
                    maxPerOrder: cleaned.maxPerOrder,
                    editionSize: cleaned.editionSize,
                    editionLabel: cleaned.editionLabel,
                    isActive: cleaned.status !== 'ARCHIVED',
                },
            });
        }

        await syncArtworkImages(artwork.id, cleaned, tx);
        await syncArtworkVideo(artwork.id, cleaned, tx);

        return tx.artwork.findUniqueOrThrow({
            where: {
                id: artwork.id,
            },
            include: adminArtworkInclude,
        });
    });
}
