import 'server-only';

import { randomUUID } from 'node:crypto';

import type { Prisma } from '@prisma/client';

import type { Artwork } from '@/domain/artworks/types';
import { artworkRecordInclude, mapArtworkRecord } from '@/server/catalog/artworks';
import { prisma } from '@/server/db/prisma';

export const CART_SESSION_COOKIE = 'norel_cart_session';

const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export interface CartOwner {
    userId?: string;
    sessionId?: string;
}

export interface CartViewItem {
    id: string;
    variantId: string;
    artwork: Artwork;
    variantTitle: string;
    quantity: number;
    unitPriceCents: number;
    totalPriceCents: number;
    stock: number;
    maxPerOrder?: number | null;
}

export interface CartView {
    id: string;
    items: CartViewItem[];
    subtotalCents: number;
    totalQuantity: number;
    currency: 'EUR';
}

const cartInclude = {
    items: {
        include: {
            variant: {
                include: {
                    artwork: {
                        include: artworkRecordInclude,
                    },
                },
            },
        },
        orderBy: {
            createdAt: 'asc',
        },
    },
} satisfies Prisma.CartInclude;

type CartRecord = Prisma.CartGetPayload<{
    include: typeof cartInclude;
}>;

function getCartLimit(stock: number, maxPerOrder?: number | null): number {
    return Math.max(0, Math.min(stock, maxPerOrder ?? stock));
}

function mapCartRecord(cart: CartRecord): CartView {
    const items = cart.items.map((item) => {
        const variant = item.variant;
        const unitPriceCents = variant.priceCents;

        return {
            id: item.id,
            variantId: variant.id,
            artwork: mapArtworkRecord(variant.artwork),
            variantTitle: variant.title,
            quantity: item.quantity,
            unitPriceCents,
            totalPriceCents: unitPriceCents * item.quantity,
            stock: variant.stock,
            maxPerOrder: variant.maxPerOrder,
        };
    });

    return {
        id: cart.id,
        items,
        subtotalCents: items.reduce((sum, item) => sum + item.totalPriceCents, 0),
        totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
        currency: cart.currency as 'EUR',
    };
}

function getCartWhere(owner: CartOwner): Prisma.CartWhereInput {
    if (owner.userId) {
        return {
            userId: owner.userId,
            status: 'ACTIVE',
        };
    }

    if (owner.sessionId) {
        return {
            sessionId: owner.sessionId,
            status: 'ACTIVE',
        };
    }

    return {
        id: '__missing_cart_owner__',
    };
}

export function createCartSessionId(): string {
    return randomUUID();
}

export function getCartCookieOptions() {
    return {
        httpOnly: true,
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: CART_COOKIE_MAX_AGE,
    };
}

export async function getActiveCart(owner: CartOwner): Promise<CartView | null> {
    if (!owner.userId && !owner.sessionId) {
        return null;
    }

    const cart = await prisma.cart.findFirst({
        where: getCartWhere(owner),
        include: cartInclude,
        orderBy: {
            updatedAt: 'desc',
        },
    });

    return cart ? mapCartRecord(cart) : null;
}

async function getOrCreateActiveCart(owner: CartOwner): Promise<CartRecord> {
    const existingCart = await prisma.cart.findFirst({
        where: getCartWhere(owner),
        include: cartInclude,
        orderBy: {
            updatedAt: 'desc',
        },
    });

    if (existingCart) {
        return existingCart;
    }

    return prisma.cart.create({
        data: {
            userId: owner.userId,
            sessionId: owner.userId ? null : owner.sessionId,
            status: 'ACTIVE',
            expiresAt: owner.userId ? null : new Date(Date.now() + CART_COOKIE_MAX_AGE * 1000),
        },
        include: cartInclude,
    });
}

export async function addCartItem(owner: CartOwner, variantId: string, quantity: number): Promise<CartView> {
    const variant = await prisma.productVariant.findUnique({
        where: { id: variantId },
        include: {
            artwork: true,
        },
    });

    if (!variant || !variant.isActive || variant.stock <= 0 || variant.artwork.status !== 'PUBLISHED' || variant.artwork.availability !== 'AVAILABLE') {
        throw new Error('Variant is not available for purchase.');
    }

    const cart = await getOrCreateActiveCart(owner);
    const limit = getCartLimit(variant.stock, variant.maxPerOrder);

    if (limit <= 0) {
        throw new Error('Variant is out of stock.');
    }

    const existingItem = await prisma.cartItem.findUnique({
        where: {
            cartId_variantId: {
                cartId: cart.id,
                variantId,
            },
        },
    });

    if (existingItem) {
        await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: {
                quantity: Math.min(limit, existingItem.quantity + quantity),
            },
        });
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                variantId,
                quantity: Math.min(limit, quantity),
            },
        });
    }

    const updatedCart = await prisma.cart.findUniqueOrThrow({
        where: { id: cart.id },
        include: cartInclude,
    });

    return mapCartRecord(updatedCart);
}

export async function updateCartItemQuantity(owner: CartOwner, cartItemId: string, quantity: number): Promise<CartView | null> {
    const cart = await prisma.cart.findFirst({
        where: getCartWhere(owner),
        include: cartInclude,
    });

    if (!cart) {
        return null;
    }

    const item = cart.items.find((cartItem) => cartItem.id === cartItemId);

    if (!item) {
        return mapCartRecord(cart);
    }

    const limit = getCartLimit(item.variant.stock, item.variant.maxPerOrder);

    if (quantity <= 0 || limit <= 0) {
        await prisma.cartItem.delete({
            where: { id: cartItemId },
        });
    } else {
        await prisma.cartItem.update({
            where: { id: cartItemId },
            data: {
                quantity: Math.min(limit, quantity),
            },
        });
    }

    const updatedCart = await prisma.cart.findUniqueOrThrow({
        where: { id: cart.id },
        include: cartInclude,
    });

    return mapCartRecord(updatedCart);
}

export async function removeCartItem(owner: CartOwner, cartItemId: string): Promise<CartView | null> {
    return updateCartItemQuantity(owner, cartItemId, 0);
}
