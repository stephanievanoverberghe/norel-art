'use server';

import { revalidatePath } from 'next/cache';

import type { OrderStatus } from '@/domain/ecommerce';
import { getCurrentSession } from '@/server/auth/session';
import { isAdminRole } from '@/server/permissions/roles';
import { updateAdminOrderStatus } from '@/server/orders/admin-orders';

const allowedStatuses: OrderStatus[] = ['PENDING', 'PAID', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];

export async function updateOrderStatusAction(orderId: string, orderNumber: string, formData: FormData) {
    const session = await getCurrentSession();

    if (!isAdminRole(session?.user?.role)) {
        throw new Error('Admin access required');
    }

    const status = String(formData.get('status')) as OrderStatus;

    if (!allowedStatuses.includes(status)) {
        throw new Error('Invalid order status');
    }

    await updateAdminOrderStatus(orderId, status);
    revalidatePath('/admin/commandes');
    revalidatePath(`/admin/commandes/${orderNumber}`);
}
