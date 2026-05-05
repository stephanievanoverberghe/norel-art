'use server';

import type { UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { getCurrentSession } from '@/server/auth/session';
import { isAdminRole } from '@/server/permissions/roles';
import { updateAdminUserRole } from '@/server/users/admin-users';

const allowedRoles: UserRole[] = ['USER', 'ADMIN'];

export async function updateUserRoleAction(userId: string, formData: FormData) {
    const session = await getCurrentSession();
    const actorUserId = session?.user?.id;

    if (!isAdminRole(session?.user?.role) || !actorUserId) {
        throw new Error('Admin access required');
    }

    const role = String(formData.get('role')) as UserRole;

    if (!allowedRoles.includes(role)) {
        throw new Error('Invalid user role');
    }

    await updateAdminUserRole(userId, role, actorUserId);
    revalidatePath('/admin/utilisateurs');
    revalidatePath(`/admin/utilisateurs/${userId}`);
}
