'use server';

import type { DropStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { AdminDropInput } from '@/server/drops/admin-drops';
import { createAdminDrop, updateAdminDrop } from '@/server/drops/admin-drops';
import { getCurrentSession } from '@/server/auth/session';
import { isAdminRole } from '@/server/permissions/roles';

const allowedStatuses: DropStatus[] = ['DRAFT', 'SCHEDULED', 'LIVE', 'ENDED'];

function getString(formData: FormData, key: string) {
    return String(formData.get(key) ?? '').trim();
}

function getNumber(formData: FormData, key: string) {
    const value = Number(getString(formData, key));
    return Number.isFinite(value) ? value : 0;
}

function getRequiredDate(formData: FormData, key: string) {
    const value = getString(formData, key);

    if (!value) {
        throw new Error(`${key} is required`);
    }

    return new Date(value);
}

function getOptionalDate(formData: FormData, key: string) {
    const value = getString(formData, key);
    return value ? new Date(value) : null;
}

function getArtworkLinks(formData: FormData) {
    return formData
        .getAll('artworkIds')
        .map((value) => String(value).trim())
        .filter(Boolean)
        .map((artworkId) => ({
            artworkId,
            position: getNumber(formData, `position-${artworkId}`),
        }));
}

function getDropInput(formData: FormData): AdminDropInput {
    const status = getString(formData, 'status') as DropStatus;

    if (!allowedStatuses.includes(status)) {
        throw new Error('Invalid drop status');
    }

    return {
        accessLabel: getString(formData, 'accessLabel'),
        artworkLinks: getArtworkLinks(formData),
        description: getString(formData, 'description'),
        endsAt: getOptionalDate(formData, 'endsAt'),
        eyebrow: getString(formData, 'eyebrow'),
        heroImageAlt: getString(formData, 'heroImageAlt'),
        heroImagePublicId: getString(formData, 'heroImagePublicId'),
        heroImageUrl: getString(formData, 'heroImageUrl'),
        isFeatured: formData.get('isFeatured') === 'on',
        seoDescription: getString(formData, 'seoDescription'),
        seoTitle: getString(formData, 'seoTitle'),
        slug: getString(formData, 'slug'),
        startsAt: getRequiredDate(formData, 'startsAt'),
        status,
        title: getString(formData, 'title'),
        waitlistEnabled: formData.get('waitlistEnabled') === 'on',
    };
}

async function assertAdminAccess() {
    const session = await getCurrentSession();

    if (!isAdminRole(session?.user?.role)) {
        throw new Error('Admin access required');
    }
}

function revalidateDropPaths(slug?: string) {
    revalidatePath('/');
    revalidatePath('/oeuvres');
    revalidatePath('/admin');
    revalidatePath('/admin/drops');
    revalidatePath('/admin/oeuvres');

    if (slug) {
        revalidatePath(`/drops/${slug}`);
    }
}

export async function createDropAction(formData: FormData) {
    await assertAdminAccess();
    const drop = await createAdminDrop(getDropInput(formData));

    revalidateDropPaths(drop.slug);
    redirect(`/admin/drops/${drop.id}`);
}

export async function updateDropAction(dropId: string, previousSlug: string, formData: FormData) {
    await assertAdminAccess();
    const drop = await updateAdminDrop(dropId, getDropInput(formData));

    revalidateDropPaths(previousSlug);
    revalidateDropPaths(drop.slug);
    redirect(`/admin/drops/${drop.id}`);
}
