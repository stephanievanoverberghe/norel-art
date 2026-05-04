import 'server-only';

import type { Artwork } from '@/domain/artworks/types';
import { artworkRecordInclude, mapArtworkRecord } from '@/server/catalog/artworks';
import { prisma } from '@/server/db/prisma';

interface FavoriteArtworkItem {
    id: string;
    artwork: Artwork;
    createdAt: string;
}

export async function getFavoriteArtworkIds(userId: string): Promise<string[]> {
    const favorites = await prisma.favorite.findMany({
        where: { userId },
        select: {
            artworkId: true,
        },
    });

    return favorites.map((favorite) => favorite.artworkId);
}

export async function getFavoriteArtworks(userId: string): Promise<FavoriteArtworkItem[]> {
    const favorites = await prisma.favorite.findMany({
        where: { userId },
        include: {
            artwork: {
                include: artworkRecordInclude,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return favorites.map((favorite) => ({
        id: favorite.id,
        artwork: mapArtworkRecord(favorite.artwork),
        createdAt: favorite.createdAt.toISOString(),
    }));
}
