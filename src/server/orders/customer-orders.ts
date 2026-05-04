import 'server-only';

import type { Prisma } from '@prisma/client';

import { prisma } from '@/server/db/prisma';

const customerOrderListInclude = {
    items: {
        select: {
            id: true,
            title: true,
            quantity: true,
        },
    },
} satisfies Prisma.OrderInclude;

const customerOrderDetailInclude = {
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

export type CustomerOrderListItem = Prisma.OrderGetPayload<{
    include: typeof customerOrderListInclude;
}>;

export type CustomerOrderDetail = Prisma.OrderGetPayload<{
    include: typeof customerOrderDetailInclude;
}>;

export async function getCustomerOrders(userId: string): Promise<CustomerOrderListItem[]> {
    return prisma.order.findMany({
        where: { userId },
        include: customerOrderListInclude,
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function getCustomerOrderByNumber(userId: string, orderNumber: string): Promise<CustomerOrderDetail | null> {
    return prisma.order.findFirst({
        where: {
            userId,
            orderNumber,
        },
        include: customerOrderDetailInclude,
    });
}
