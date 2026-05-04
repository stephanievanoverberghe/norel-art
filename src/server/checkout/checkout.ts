import 'server-only';

import type Stripe from 'stripe';

import type { CartView } from '@/server/cart/cart';
import { getStripeClient } from '@/server/stripe/client';

function getSiteUrl(): string {
    return (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000').replace(/\/$/, '');
}

function assertCheckoutableCart(cart: CartView | null): asserts cart is CartView {
    if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty.');
    }

    const hasUnavailableItem = cart.items.some((item) => item.stock <= 0 || item.quantity > item.stock);

    if (hasUnavailableItem) {
        throw new Error('Cart contains unavailable items.');
    }
}

export async function createStripeCheckoutSession(cart: CartView | null, customerEmail?: string | null): Promise<Stripe.Checkout.Session> {
    assertCheckoutableCart(cart);

    const stripe = getStripeClient();
    const siteUrl = getSiteUrl();
    const metadata = {
        cartId: cart.id,
    };

    return stripe.checkout.sessions.create({
        mode: 'payment',
        submit_type: 'pay',
        client_reference_id: cart.id,
        customer_email: customerEmail ?? undefined,
        billing_address_collection: 'auto',
        shipping_address_collection: {
            allowed_countries: ['FR', 'BE', 'CH', 'LU'],
        },
        success_url: `${siteUrl}/checkout/succes?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/checkout/annule`,
        metadata,
        payment_intent_data: {
            metadata,
        },
        line_items: cart.items.map((item) => ({
            quantity: item.quantity,
            price_data: {
                currency: item.artwork.purchasableVariant?.currency.toLowerCase() ?? cart.currency.toLowerCase(),
                unit_amount: item.unitPriceCents,
                product_data: {
                    name: item.artwork.title,
                    description: `${item.variantTitle} - ${item.artwork.dimensions}`,
                    metadata: {
                        artworkId: item.artwork.id,
                        variantId: item.variantId,
                    },
                },
            },
        })),
    });
}
