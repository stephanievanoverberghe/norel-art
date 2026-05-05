import { cookies } from 'next/headers';

import { prisma } from '@/server/db/prisma';
import { getCurrentSession } from '@/server/auth/session';
import { CART_SESSION_COOKIE, getActiveCart } from '@/server/cart/cart';

import { HeaderClient, type HeaderViewer } from './HeaderClient';

interface HeaderProps {
    className?: string;
}

async function getHeaderData(): Promise<{ cartQuantity: number; favoriteCount: number; viewer: HeaderViewer | null }> {
    const session = await getCurrentSession();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(CART_SESSION_COOKIE)?.value;
    const userId = session?.user?.id;

    try {
        const [cart, favoriteCount] = await Promise.all([
            getActiveCart({
                userId,
                sessionId,
            }).catch(() => null),
            userId
                ? prisma.favorite.count({
                      where: {
                          userId,
                      },
                  })
                : Promise.resolve(0),
        ]);

        return {
            cartQuantity: cart?.totalQuantity ?? 0,
            favoriteCount,
            viewer: session?.user
                ? {
                      email: session.user.email ?? null,
                      name: session.user.name ?? null,
                      role: session.user.role,
                  }
                : null,
        };
    } catch (error) {
        console.warn('Unable to load header ecommerce state.', error);

        return {
            cartQuantity: 0,
            favoriteCount: 0,
            viewer: null,
        };
    }
}

export async function Header({ className }: HeaderProps) {
    const headerData = await getHeaderData();

    return <HeaderClient className={className} {...headerData} />;
}
