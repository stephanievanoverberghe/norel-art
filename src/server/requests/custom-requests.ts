import 'server-only';

import type { CustomRequestStatus, CustomRequestType, Prisma } from '@prisma/client';

import { prisma } from '@/server/db/prisma';

const adminCustomRequestInclude = {
    user: {
        select: {
            email: true,
            id: true,
            name: true,
        },
    },
} satisfies Prisma.CustomRequestInclude;

export type AdminCustomRequest = Prisma.CustomRequestGetPayload<{
    include: typeof adminCustomRequestInclude;
}>;

export interface PublicCustomRequestInput {
    budget?: string | null;
    email: string;
    location?: string | null;
    message: string;
    metadata?: Prisma.InputJsonValue;
    name: string;
    phone?: string | null;
    type: CustomRequestType;
}

function cleanNullable(value?: string | null) {
    return value?.trim() || null;
}

function cleanPublicCustomRequestInput(input: PublicCustomRequestInput) {
    const email = input.email.trim().toLowerCase();
    const message = input.message.trim();
    const name = input.name.trim();

    if (!name) throw new Error('Request name is required');
    if (!email) throw new Error('Request email is required');
    if (!message) throw new Error('Request message is required');

    return {
        budget: cleanNullable(input.budget),
        email,
        location: cleanNullable(input.location),
        message,
        metadata: input.metadata ?? {},
        name,
        phone: cleanNullable(input.phone),
        type: input.type,
    };
}

export async function createPublicCustomRequest(input: PublicCustomRequestInput, userId?: string | null) {
    const cleaned = cleanPublicCustomRequestInput(input);

    return prisma.customRequest.create({
        data: {
            budget: cleaned.budget,
            email: cleaned.email,
            location: cleaned.location,
            message: cleaned.message,
            metadata: cleaned.metadata,
            name: cleaned.name,
            phone: cleaned.phone,
            status: 'NEW',
            type: cleaned.type,
            userId: userId ?? null,
        },
    });
}

export async function getAdminCustomRequests(): Promise<AdminCustomRequest[]> {
    return prisma.customRequest.findMany({
        include: adminCustomRequestInclude,
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function getAdminCustomRequestStats() {
    const [total, fresh, inReview, quoteSent, accepted, closed, mural, customArtwork, contact] = await prisma.$transaction([
        prisma.customRequest.count(),
        prisma.customRequest.count({
            where: {
                status: 'NEW',
            },
        }),
        prisma.customRequest.count({
            where: {
                status: 'IN_REVIEW',
            },
        }),
        prisma.customRequest.count({
            where: {
                status: 'QUOTE_SENT',
            },
        }),
        prisma.customRequest.count({
            where: {
                status: 'ACCEPTED',
            },
        }),
        prisma.customRequest.count({
            where: {
                status: 'CLOSED',
            },
        }),
        prisma.customRequest.count({
            where: {
                type: 'MURAL',
            },
        }),
        prisma.customRequest.count({
            where: {
                type: 'CUSTOM_ARTWORK',
            },
        }),
        prisma.customRequest.count({
            where: {
                type: 'CONTACT',
            },
        }),
    ]);

    return {
        accepted,
        closed,
        contact,
        customArtwork,
        fresh,
        inReview,
        mural,
        open: fresh + inReview + quoteSent,
        quoteSent,
        total,
    };
}

export async function updateAdminCustomRequestStatus(requestId: string, status: CustomRequestStatus): Promise<AdminCustomRequest> {
    return prisma.customRequest.update({
        where: {
            id: requestId,
        },
        data: {
            status,
        },
        include: adminCustomRequestInclude,
    });
}
