import 'server-only';

import type { OrderStatus } from '@prisma/client';

import { prisma } from '@/server/db/prisma';

const paidOrderStatuses: OrderStatus[] = ['PAID', 'PREPARING', 'SHIPPED', 'DELIVERED'];

function daysAgo(days: number) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
}

function getGroupCount(value: unknown) {
    if (value && typeof value === 'object' && '_all' in value) {
        return Number((value as { _all?: number })._all ?? 0);
    }

    return 0;
}

export async function getAdminAnalyticsData() {
    const since30Days = daysAgo(30);

    const [ordersByStatus, eventsByType, categories, revenue30d, users30d, favorites30d, activeCarts, requests30d] = await prisma.$transaction([
        prisma.order.groupBy({
            by: ['status'],
            _count: {
                _all: true,
            },
            orderBy: {
                status: 'asc',
            },
            _sum: {
                totalCents: true,
            },
        }),
        prisma.artworkEvent.groupBy({
            by: ['type'],
            _count: {
                _all: true,
            },
            orderBy: {
                type: 'asc',
            },
            where: {
                createdAt: {
                    gte: since30Days,
                },
            },
        }),
        prisma.category.findMany({
            orderBy: {
                name: 'asc',
            },
            select: {
                id: true,
                name: true,
                slug: true,
                artworks: {
                    select: {
                        id: true,
                        title: true,
                        _count: {
                            select: {
                                favorites: true,
                                orderItems: true,
                            },
                        },
                    },
                },
            },
        }),
        prisma.order.aggregate({
            _sum: {
                totalCents: true,
            },
            where: {
                status: {
                    in: paidOrderStatuses,
                },
                createdAt: {
                    gte: since30Days,
                },
            },
        }),
        prisma.user.count({
            where: {
                createdAt: {
                    gte: since30Days,
                },
            },
        }),
        prisma.favorite.count({
            where: {
                createdAt: {
                    gte: since30Days,
                },
            },
        }),
        prisma.cart.count({
            where: {
                status: 'ACTIVE',
            },
        }),
        prisma.customRequest.count({
            where: {
                createdAt: {
                    gte: since30Days,
                },
            },
        }),
    ]);

    const categoryPerformance = categories
        .map((category) => {
            const favorites = category.artworks.reduce((sum, artwork) => sum + artwork._count.favorites, 0);
            const purchases = category.artworks.reduce((sum, artwork) => sum + artwork._count.orderItems, 0);

            return {
                id: category.id,
                name: category.name,
                slug: category.slug,
                artworkCount: category.artworks.length,
                favorites,
                purchases,
                score: purchases * 8 + favorites * 3 + category.artworks.length,
            };
        })
        .sort((a, b) => b.score - a.score);

    return {
        ordersByStatus: ordersByStatus.map((row) => ({
            status: row.status,
            count: getGroupCount(row._count),
            totalCents: row._sum?.totalCents ?? 0,
        })),
        eventsByType: eventsByType.map((row) => ({
            type: row.type,
            count: getGroupCount(row._count),
        })),
        categoryPerformance,
        acquisition: {
            revenue30dCents: revenue30d._sum.totalCents ?? 0,
            users30d,
            favorites30d,
            activeCarts,
            requests30d,
        },
    };
}
