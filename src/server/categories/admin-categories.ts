import 'server-only';

import type { Prisma } from '@prisma/client';

import { slugify } from '@/lib/utils/slugify';
import { prisma } from '@/server/db/prisma';

const adminCategoryInclude = {
    _count: {
        select: {
            artworks: true,
        },
    },
} satisfies Prisma.CategoryInclude;

export type AdminCategory = Prisma.CategoryGetPayload<{
    include: typeof adminCategoryInclude;
}>;

export interface AdminCategoryInput {
    name: string;
    slug?: string;
    description?: string | null;
    imageUrl?: string | null;
    imageAlt?: string | null;
}

function cleanCategoryInput(input: AdminCategoryInput) {
    const name = input.name.trim();
    const description = input.description?.trim() || null;
    const imageUrl = input.imageUrl?.trim() || null;
    const imageAlt = input.imageAlt?.trim() || null;

    if (!name) {
        throw new Error('Category name is required');
    }

    return {
        name,
        description,
        imageAlt,
        imageUrl,
        requestedSlug: input.slug?.trim(),
    };
}

async function getUniqueCategorySlug(name: string, requestedSlug?: string, ignoredCategoryId?: string) {
    const baseSlug = slugify(requestedSlug || name) || 'categorie';
    let candidate = baseSlug;
    let suffix = 2;

    while (true) {
        const where: Prisma.CategoryWhereInput = { slug: candidate };

        if (ignoredCategoryId) {
            where.NOT = { id: ignoredCategoryId };
        }

        const existing = await prisma.category.findFirst({
            where,
            select: {
                id: true,
            },
        });

        if (!existing) {
            return candidate;
        }

        candidate = `${baseSlug}-${suffix}`;
        suffix += 1;
    }
}

export async function getAdminCategories(): Promise<AdminCategory[]> {
    return prisma.category.findMany({
        include: adminCategoryInclude,
        orderBy: {
            name: 'asc',
        },
    });
}

export async function getAdminCategoryById(categoryId: string): Promise<AdminCategory | null> {
    return prisma.category.findUnique({
        where: {
            id: categoryId,
        },
        include: adminCategoryInclude,
    });
}

export async function getAdminCategoryStats() {
    const [total, used, linkedArtworks] = await prisma.$transaction([
        prisma.category.count(),
        prisma.category.count({
            where: {
                artworks: {
                    some: {},
                },
            },
        }),
        prisma.artwork.count(),
    ]);

    return {
        total,
        used,
        empty: total - used,
        linkedArtworks,
    };
}

export async function createAdminCategory(input: AdminCategoryInput): Promise<AdminCategory> {
    const cleaned = cleanCategoryInput(input);
    const slug = await getUniqueCategorySlug(cleaned.name, cleaned.requestedSlug);

    return prisma.category.create({
        data: {
            name: cleaned.name,
            slug,
            description: cleaned.description,
            imageUrl: cleaned.imageUrl,
            imageAlt: cleaned.imageAlt,
        },
        include: adminCategoryInclude,
    });
}

export async function updateAdminCategory(categoryId: string, input: AdminCategoryInput): Promise<AdminCategory> {
    const cleaned = cleanCategoryInput(input);
    const slug = await getUniqueCategorySlug(cleaned.name, cleaned.requestedSlug, categoryId);

    return prisma.category.update({
        where: {
            id: categoryId,
        },
        data: {
            name: cleaned.name,
            slug,
            description: cleaned.description,
            imageUrl: cleaned.imageUrl,
            imageAlt: cleaned.imageAlt,
        },
        include: adminCategoryInclude,
    });
}
