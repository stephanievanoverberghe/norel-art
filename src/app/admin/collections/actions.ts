'use server';

import type { CollectionStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { AdminCollectionInput } from '@/server/collections/admin-collections';
import { createAdminCollection, updateAdminCollection } from '@/server/collections/admin-collections';
import { getCurrentSession } from '@/server/auth/session';
import { isAdminRole } from '@/server/permissions/roles';

const allowedStatuses: CollectionStatus[] = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

function getString(formData: FormData, key: string) {
    return String(formData.get(key) ?? '').trim();
}

function getNumber(formData: FormData, key: string) {
    const value = Number(getString(formData, key));
    return Number.isFinite(value) ? value : 0;
}

function getCollectionInput(formData: FormData): AdminCollectionInput {
    const status = getString(formData, 'status') as CollectionStatus;

    if (!allowedStatuses.includes(status)) {
        throw new Error('Invalid collection status');
    }

    return {
        description: getString(formData, 'description'),
        eyebrow: getString(formData, 'eyebrow'),
        heroImageAlt: getString(formData, 'heroImageAlt'),
        heroImagePublicId: getString(formData, 'heroImagePublicId'),
        heroImageUrl: getString(formData, 'heroImageUrl'),
        isFeatured: formData.get('isFeatured') === 'on',
        name: getString(formData, 'name'),
        position: getNumber(formData, 'position'),
        seoDescription: getString(formData, 'seoDescription'),
        seoTitle: getString(formData, 'seoTitle'),
        slug: getString(formData, 'slug'),
        status,
    };
}

async function assertAdminAccess() {
    const session = await getCurrentSession();

    if (!isAdminRole(session?.user?.role)) {
        throw new Error('Admin access required');
    }
}

function revalidateCollectionPaths(slug?: string) {
    revalidatePath('/');
    revalidatePath('/oeuvres');
    revalidatePath('/admin');
    revalidatePath('/admin/collections');
    revalidatePath('/admin/oeuvres');

    if (slug) {
        revalidatePath(`/collections/${slug}`);
    }
}

export async function createCollectionAction(formData: FormData) {
    await assertAdminAccess();
    const collection = await createAdminCollection(getCollectionInput(formData));

    revalidateCollectionPaths(collection.slug);
    redirect(`/admin/collections/${collection.id}`);
}

export async function updateCollectionAction(collectionId: string, previousSlug: string, formData: FormData) {
    await assertAdminAccess();
    const collection = await updateAdminCollection(collectionId, getCollectionInput(formData));

    revalidateCollectionPaths(previousSlug);
    revalidateCollectionPaths(collection.slug);
    redirect(`/admin/collections/${collection.id}`);
}
