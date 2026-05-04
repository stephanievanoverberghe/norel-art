'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createAdminCategory, updateAdminCategory } from '@/server/categories/admin-categories';
import { getCurrentSession } from '@/server/auth/session';
import { isAdminRole } from '@/server/permissions/roles';

function getCategoryInput(formData: FormData) {
    return {
        name: String(formData.get('name') ?? ''),
        slug: String(formData.get('slug') ?? ''),
        description: String(formData.get('description') ?? ''),
    };
}

async function assertAdminAccess() {
    const session = await getCurrentSession();

    if (!isAdminRole(session?.user?.role)) {
        throw new Error('Admin access required');
    }
}

export async function createCategoryAction(formData: FormData) {
    await assertAdminAccess();
    const category = await createAdminCategory(getCategoryInput(formData));

    revalidatePath('/admin/categories');
    revalidatePath('/admin/oeuvres');
    redirect(`/admin/categories/${category.id}`);
}

export async function updateCategoryAction(categoryId: string, formData: FormData) {
    await assertAdminAccess();
    await updateAdminCategory(categoryId, getCategoryInput(formData));

    revalidatePath('/admin/categories');
    revalidatePath(`/admin/categories/${categoryId}`);
    revalidatePath('/admin/oeuvres');
    redirect(`/admin/categories/${categoryId}`);
}
