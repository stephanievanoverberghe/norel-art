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

export async function getAdminDashboardData() {
    const since30Days = daysAgo(30);

    const [
        revenue,
        revenue30d,
        totalOrders,
        orders30d,
        pendingOrders,
        preparingOrders,
        totalUsers,
        users30d,
        buyers,
        totalArtworks,
        publishedArtworks,
        draftArtworks,
        favorites,
        activeCarts,
        openRequests,
        recentOrders,
        recentUsers,
        lowStockVariants,
        artworkEvents30d,
        topArtworkPool,
    ] = await prisma.$transaction([
        prisma.order.aggregate({
            _sum: {
                totalCents: true,
            },
            where: {
                status: {
                    in: paidOrderStatuses,
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
        prisma.order.count(),
        prisma.order.count({
            where: {
                createdAt: {
                    gte: since30Days,
                },
            },
        }),
        prisma.order.count({
            where: {
                status: 'PENDING',
            },
        }),
        prisma.order.count({
            where: {
                status: 'PREPARING',
            },
        }),
        prisma.user.count(),
        prisma.user.count({
            where: {
                createdAt: {
                    gte: since30Days,
                },
            },
        }),
        prisma.user.count({
            where: {
                orders: {
                    some: {},
                },
            },
        }),
        prisma.artwork.count(),
        prisma.artwork.count({
            where: {
                status: 'PUBLISHED',
            },
        }),
        prisma.artwork.count({
            where: {
                status: 'DRAFT',
            },
        }),
        prisma.favorite.count(),
        prisma.cart.count({
            where: {
                status: 'ACTIVE',
            },
        }),
        prisma.customRequest.count({
            where: {
                status: {
                    in: ['NEW', 'IN_REVIEW', 'QUOTE_SENT'],
                },
            },
        }),
        prisma.order.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                orderNumber: true,
                email: true,
                status: true,
                totalCents: true,
                currency: true,
                createdAt: true,
            },
        }),
        prisma.user.findMany({
            take: 5,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                _count: {
                    select: {
                        orders: true,
                        favorites: true,
                    },
                },
            },
        }),
        prisma.productVariant.findMany({
            take: 6,
            where: {
                isActive: true,
                stock: {
                    lte: 3,
                },
            },
            orderBy: {
                stock: 'asc',
            },
            select: {
                id: true,
                title: true,
                stock: true,
                sku: true,
                artwork: {
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                    },
                },
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
        prisma.artwork.findMany({
            take: 50,
            orderBy: {
                updatedAt: 'desc',
            },
            select: {
                id: true,
                slug: true,
                title: true,
                status: true,
                availability: true,
                category: {
                    select: {
                        name: true,
                    },
                },
                _count: {
                    select: {
                        favorites: true,
                        orderItems: true,
                        cartEvents: true,
                    },
                },
            },
        }),
    ]);

    const eventsByType = Object.fromEntries(artworkEvents30d.map((event) => [event.type, getGroupCount(event._count)]));
    const viewEvents = eventsByType.VIEW ?? 0;
    const purchaseEvents = eventsByType.PURCHASE ?? 0;
    const conversionRate = viewEvents > 0 ? (purchaseEvents / viewEvents) * 100 : buyers > 0 && totalUsers > 0 ? (buyers / totalUsers) * 100 : 0;

    const topArtworks = topArtworkPool
        .map((artwork) => ({
            ...artwork,
            score: artwork._count.orderItems * 8 + artwork._count.favorites * 3 + artwork._count.cartEvents,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    return {
        overview: {
            revenueCents: revenue._sum.totalCents ?? 0,
            revenue30dCents: revenue30d._sum.totalCents ?? 0,
            totalOrders,
            orders30d,
            pendingOrders,
            preparingOrders,
            totalUsers,
            users30d,
            buyers,
            totalArtworks,
            publishedArtworks,
            draftArtworks,
            favorites,
            activeCarts,
            openRequests,
            conversionRate,
        },
        eventsByType,
        lowStockVariants,
        recentOrders,
        recentUsers,
        topArtworks,
    };
}
