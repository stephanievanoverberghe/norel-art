import 'server-only';

import type { Prisma, UserRole } from '@prisma/client';

import { prisma } from '@/server/db/prisma';

const adminUserListInclude = {
    profile: true,
    _count: {
        select: {
            addresses: true,
            favorites: true,
            orders: true,
            requests: true,
        },
    },
} satisfies Prisma.UserInclude;

const adminUserDetailInclude = {
    profile: true,
    addresses: {
        orderBy: {
            createdAt: 'desc',
        },
    },
    orders: {
        take: 8,
        orderBy: {
            createdAt: 'desc',
        },
    },
    favorites: {
        take: 8,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            artwork: {
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    images: {
                        take: 1,
                        orderBy: {
                            position: 'asc',
                        },
                    },
                },
            },
        },
    },
    _count: {
        select: {
            addresses: true,
            favorites: true,
            orders: true,
            requests: true,
        },
    },
} satisfies Prisma.UserInclude;

export type AdminUserListItem = Prisma.UserGetPayload<{
    include: typeof adminUserListInclude;
}>;

export type AdminUserDetail = Prisma.UserGetPayload<{
    include: typeof adminUserDetailInclude;
}>;

export async function getAdminUsers(): Promise<AdminUserListItem[]> {
    return prisma.user.findMany({
        include: adminUserListInclude,
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function getAdminUserById(userId: string): Promise<AdminUserDetail | null> {
    return prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: adminUserDetailInclude,
    });
}

export async function getAdminUserStats() {
    const [total, admins, buyers, withFavorites] = await prisma.$transaction([
        prisma.user.count(),
        prisma.user.count({
            where: {
                role: 'ADMIN',
            },
        }),
        prisma.user.count({
            where: {
                orders: {
                    some: {},
                },
            },
        }),
        prisma.user.count({
            where: {
                favorites: {
                    some: {},
                },
            },
        }),
    ]);

    return {
        total,
        admins,
        buyers,
        customers: total - admins,
        withFavorites,
    };
}

export async function updateAdminUserRole(userId: string, role: UserRole, actorUserId?: string): Promise<void> {
    if (actorUserId === userId) {
        throw new Error('You cannot change your own admin role');
    }

    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            role,
        },
    });
}
