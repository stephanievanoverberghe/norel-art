import 'server-only';

import type { Prisma } from '@prisma/client';

import type { OrderStatus } from '@/domain/ecommerce';
import { prisma } from '@/server/db/prisma';

const adminOrderListInclude = {
    items: {
        select: {
            id: true,
            title: true,
            quantity: true,
        },
    },
    payments: {
        orderBy: {
            createdAt: 'desc',
        },
        take: 1,
    },
} satisfies Prisma.OrderInclude;

const adminOrderDetailInclude = {
    user: {
        select: {
            id: true,
            name: true,
            email: true,
        },
    },
    items: {
        include: {
            artwork: {
                include: {
                    images: {
                        orderBy: {
                            position: 'asc',
                        },
                    },
                },
            },
            certificate: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    },
    payments: {
        orderBy: {
            createdAt: 'desc',
        },
    },
} satisfies Prisma.OrderInclude;

export type AdminOrderListItem = Prisma.OrderGetPayload<{
    include: typeof adminOrderListInclude;
}>;

export type AdminOrderDetail = Prisma.OrderGetPayload<{
    include: typeof adminOrderDetailInclude;
}>;

export async function getAdminOrders(): Promise<AdminOrderListItem[]> {
    return prisma.order.findMany({
        include: adminOrderListInclude,
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function getAdminOrderByNumber(orderNumber: string): Promise<AdminOrderDetail | null> {
    return prisma.order.findUnique({
        where: { orderNumber },
        include: adminOrderDetailInclude,
    });
}

export async function getAdminOrderStats() {
    const [total, paid, preparing, shipped] = await prisma.$transaction([
        prisma.order.count(),
        prisma.order.count({ where: { status: 'PAID' } }),
        prisma.order.count({ where: { status: 'PREPARING' } }),
        prisma.order.count({ where: { status: 'SHIPPED' } }),
    ]);

    return {
        total,
        paid,
        preparing,
        shipped,
    };
}

export async function updateAdminOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    await prisma.order.update({
        where: { id: orderId },
        data: {
            status,
            shippedAt: status === 'SHIPPED' ? new Date() : undefined,
        },
    });
}
