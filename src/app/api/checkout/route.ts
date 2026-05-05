import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { getCurrentSession } from '@/server/auth/session';
import { CART_SESSION_COOKIE, getActiveCart } from '@/server/cart/cart';
import { createStripeCheckoutSession } from '@/server/checkout/checkout';

export async function POST() {
    const session = await getCurrentSession();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(CART_SESSION_COOKIE)?.value;
    const cart = await getActiveCart({
        userId: session?.user?.id,
        sessionId,
    });

    try {
        const checkoutSession = await createStripeCheckoutSession(cart, session?.user?.email);

        if (!checkoutSession.url) {
            return NextResponse.json({ message: 'Impossible de créer la session Stripe.' }, { status: 502 });
        }

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Checkout unavailable.';
        const status = message.includes('STRIPE_SECRET_KEY') ? 503 : 400;

        return NextResponse.json({ message }, { status });
    }
}
