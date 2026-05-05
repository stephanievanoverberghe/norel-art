'use server';

import type { CustomRequestStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { getCurrentSession } from '@/server/auth/session';
import { isAdminRole } from '@/server/permissions/roles';
import { updateAdminCustomRequestStatus } from '@/server/requests/custom-requests';

const allowedStatuses: CustomRequestStatus[] = ['NEW', 'IN_REVIEW', 'QUOTE_SENT', 'ACCEPTED', 'CLOSED'];

async function assertAdminAccess() {
    const session = await getCurrentSession();

    if (!isAdminRole(session?.user?.role)) {
        throw new Error('Admin access required');
    }
}

export async function updateCustomRequestStatusAction(requestId: string, formData: FormData) {
    await assertAdminAccess();

    const status = String(formData.get('status') ?? '') as CustomRequestStatus;

    if (!allowedStatuses.includes(status)) {
        throw new Error('Invalid request status');
    }

    await updateAdminCustomRequestStatus(requestId, status);
    revalidatePath('/admin');
    revalidatePath('/admin/analytics');
    revalidatePath('/admin/demandes');
}
