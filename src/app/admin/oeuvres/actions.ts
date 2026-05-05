'use server';

import type { ArtworkAvailability, ArtworkStatus, VariantType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { AdminArtworkInput } from '@/server/artworks/admin-artworks';
import { createAdminArtwork, updateAdminArtwork } from '@/server/artworks/admin-artworks';
import { getCurrentSession } from '@/server/auth/session';
import { isAdminRole } from '@/server/permissions/roles';

const allowedStatuses: ArtworkStatus[] = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];
const allowedAvailabilities: ArtworkAvailability[] = ['AVAILABLE', 'RESERVED', 'SOLD'];
const allowedVariantTypes: VariantType[] = ['ORIGINAL', 'PRINT'];

function getString(formData: FormData, key: string) {
    return String(formData.get(key) ?? '').trim();
}

function getOptionalNumber(formData: FormData, key: string) {
    const value = getString(formData, key);
    if (!value) return null;

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function getTags(formData: FormData) {
    return getString(formData, 'tags')
        .split(/[\n,]/)
        .map((tag) => tag.trim())
        .filter(Boolean);
}

function getPriceCents(formData: FormData) {
    const euros = Number(getString(formData, 'priceEur') || 0);
    if (!Number.isFinite(euros) || euros < 0) return 0;

    return Math.round(euros * 100);
}

function getArtworkInput(formData: FormData): AdminArtworkInput {
    const status = getString(formData, 'status') as ArtworkStatus;
    const availability = getString(formData, 'availability') as ArtworkAvailability;
    const variantType = getString(formData, 'variantType') as VariantType;

    if (!allowedStatuses.includes(status)) {
        throw new Error('Invalid artwork status');
    }

    if (!allowedAvailabilities.includes(availability)) {
        throw new Error('Invalid artwork availability');
    }

    if (!allowedVariantTypes.includes(variantType)) {
        throw new Error('Invalid variant type');
    }

    return {
        availability,
        categoryId: getString(formData, 'categoryId'),
        collectionId: getString(formData, 'collectionId'),
        contextImagePublicId: getString(formData, 'contextImagePublicId'),
        contextImageUrl: getString(formData, 'contextImageUrl'),
        detailImagePublicId: getString(formData, 'detailImagePublicId'),
        detailImageUrl: getString(formData, 'detailImageUrl'),
        dimensions: getString(formData, 'dimensions'),
        editionLabel: getString(formData, 'editionLabel'),
        editionSize: getOptionalNumber(formData, 'editionSize'),
        excerpt: getString(formData, 'excerpt'),
        frameImagePublicId: getString(formData, 'frameImagePublicId'),
        frameImageUrl: getString(formData, 'frameImageUrl'),
        mainImageAlt: getString(formData, 'mainImageAlt'),
        mainImagePublicId: getString(formData, 'mainImagePublicId'),
        mainImageUrl: getString(formData, 'mainImageUrl'),
        maxPerOrder: getOptionalNumber(formData, 'maxPerOrder'),
        priceCents: getPriceCents(formData),
        sku: getString(formData, 'sku'),
        slug: getString(formData, 'slug'),
        status,
        stock: Math.max(0, Math.floor(getOptionalNumber(formData, 'stock') ?? 0)),
        story: getString(formData, 'story'),
        support: getString(formData, 'support'),
        tags: getTags(formData),
        technique: getString(formData, 'technique'),
        title: getString(formData, 'title'),
        variantTitle: getString(formData, 'variantTitle'),
        variantType,
        videoThumbnailUrl: getString(formData, 'videoThumbnailUrl'),
        videoTitle: getString(formData, 'videoTitle'),
        videoUrl: getString(formData, 'videoUrl'),
    };
}

async function assertAdminAccess() {
    const session = await getCurrentSession();

    if (!isAdminRole(session?.user?.role)) {
        throw new Error('Admin access required');
    }
}

function revalidateArtworkPaths(slug?: string) {
    revalidatePath('/');
    revalidatePath('/oeuvres');
    revalidatePath('/admin');
    revalidatePath('/admin/oeuvres');

    if (slug) {
        revalidatePath(`/oeuvres/${slug}`);
    }
}

export async function createArtworkAction(formData: FormData) {
    await assertAdminAccess();
    const artwork = await createAdminArtwork(getArtworkInput(formData));

    revalidateArtworkPaths(artwork.slug);
    redirect(`/admin/oeuvres/${artwork.id}`);
}

export async function updateArtworkAction(artworkId: string, previousSlug: string, formData: FormData) {
    await assertAdminAccess();
    const artwork = await updateAdminArtwork(artworkId, getArtworkInput(formData));

    revalidateArtworkPaths(previousSlug);
    revalidateArtworkPaths(artwork.slug);
    redirect(`/admin/oeuvres/${artwork.id}`);
}
