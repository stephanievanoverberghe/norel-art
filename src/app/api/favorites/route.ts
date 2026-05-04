import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getCurrentSession } from '@/server/auth/session';
import { prisma } from '@/server/db/prisma';

const favoriteSchema = z.object({
    artworkId: z.string().min(1),
});

async function getValidatedFavoriteRequest(request: Request) {
    const session = await getCurrentSession();

    if (!session?.user?.id) {
        return {
            error: NextResponse.json({ message: 'Connexion requise.' }, { status: 401 }),
        };
    }

    const body = await request.json().catch(() => null);
    const parsed = favoriteSchema.safeParse(body);

    if (!parsed.success) {
        return {
            error: NextResponse.json({ message: 'Oeuvre invalide.' }, { status: 400 }),
        };
    }

    return {
        userId: session.user.id,
        artworkId: parsed.data.artworkId,
    };
}

export async function POST(request: Request) {
    const validated = await getValidatedFavoriteRequest(request);

    if ('error' in validated) {
        return validated.error;
    }

    const artwork = await prisma.artwork.findUnique({
        where: { id: validated.artworkId },
        select: { id: true },
    });

    if (!artwork) {
        return NextResponse.json({ message: 'Oeuvre introuvable.' }, { status: 404 });
    }

    await prisma.favorite.upsert({
        where: {
            userId_artworkId: {
                userId: validated.userId,
                artworkId: validated.artworkId,
            },
        },
        update: {},
        create: {
            userId: validated.userId,
            artworkId: validated.artworkId,
        },
    });

    return NextResponse.json({ isFavorite: true });
}

export async function DELETE(request: Request) {
    const validated = await getValidatedFavoriteRequest(request);

    if ('error' in validated) {
        return validated.error;
    }

    await prisma.favorite.deleteMany({
        where: {
            userId: validated.userId,
            artworkId: validated.artworkId,
        },
    });

    return NextResponse.json({ isFavorite: false });
}
