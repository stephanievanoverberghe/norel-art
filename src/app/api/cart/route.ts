import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getCurrentSession } from '@/server/auth/session';
import {
    addCartItem,
    CART_SESSION_COOKIE,
    createCartSessionId,
    getActiveCart,
    getCartCookieOptions,
    removeCartItem,
    updateCartItemQuantity,
    type CartOwner,
} from '@/server/cart/cart';

const addCartItemSchema = z.object({
    variantId: z.string().min(1),
    quantity: z.number().int().min(1).max(99).default(1),
});

const updateCartItemSchema = z.object({
    cartItemId: z.string().min(1),
    quantity: z.number().int().min(0).max(99),
});

const removeCartItemSchema = z.object({
    cartItemId: z.string().min(1),
});

async function getCartOwner(ensureSession = false): Promise<{ owner: CartOwner; sessionId?: string; shouldSetCookie: boolean }> {
    const session = await getCurrentSession();
    const cookieStore = await cookies();
    const existingSessionId = cookieStore.get(CART_SESSION_COOKIE)?.value;

    if (session?.user?.id) {
        return {
            owner: { userId: session.user.id },
            shouldSetCookie: false,
        };
    }

    if (existingSessionId) {
        return {
            owner: { sessionId: existingSessionId },
            sessionId: existingSessionId,
            shouldSetCookie: false,
        };
    }

    if (!ensureSession) {
        return {
            owner: {},
            shouldSetCookie: false,
        };
    }

    const sessionId = createCartSessionId();

    return {
        owner: { sessionId },
        sessionId,
        shouldSetCookie: true,
    };
}

function withCartCookie(payload: unknown, sessionId?: string, shouldSetCookie = false, status = 200) {
    const response = NextResponse.json(payload, { status });

    if (sessionId && shouldSetCookie) {
        response.cookies.set(CART_SESSION_COOKIE, sessionId, getCartCookieOptions());
    }

    return response;
}

export async function GET() {
    const { owner } = await getCartOwner();
    const cart = await getActiveCart(owner);

    return NextResponse.json({ cart });
}

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const parsed = addCartItemSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ message: 'Article invalide.' }, { status: 400 });
    }

    const { owner, sessionId, shouldSetCookie } = await getCartOwner(true);

    try {
        const cart = await addCartItem(owner, parsed.data.variantId, parsed.data.quantity);
        return withCartCookie({ cart }, sessionId, shouldSetCookie, 201);
    } catch {
        return NextResponse.json({ message: 'Cette œuvre n’est pas disponible à l’achat.' }, { status: 409 });
    }
}

export async function PATCH(request: Request) {
    const body = await request.json().catch(() => null);
    const parsed = updateCartItemSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ message: 'Quantite invalide.' }, { status: 400 });
    }

    const { owner } = await getCartOwner();
    const cart = await updateCartItemQuantity(owner, parsed.data.cartItemId, parsed.data.quantity);

    return NextResponse.json({ cart });
}

export async function DELETE(request: Request) {
    const body = await request.json().catch(() => null);
    const parsed = removeCartItemSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ message: 'Article invalide.' }, { status: 400 });
    }

    const { owner } = await getCartOwner();
    const cart = await removeCartItem(owner, parsed.data.cartItemId);

    return NextResponse.json({ cart });
}
