import 'server-only';

import { randomUUID } from 'node:crypto';

import type { Prisma } from '@prisma/client';
import type Stripe from 'stripe';

import { prisma } from '@/server/db/prisma';

const checkoutCartInclude = {
    items: {
        include: {
            variant: {
                include: {
                    artwork: true,
                },
            },
        },
    },
} satisfies Prisma.CartInclude;

type CheckoutCart = Prisma.CartGetPayload<{
    include: typeof checkoutCartInclude;
}>;

function createOrderNumber(): string {
    return `NOREL-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomUUID().slice(0, 8).toUpperCase()}`;
}

function getStripeObjectId(value: string | { id: string } | null): string | null {
    if (!value) {
        return null;
    }

    return typeof value === 'string' ? value : value.id;
}

function getCartSubtotal(cart: CheckoutCart): number {
    return cart.items.reduce((sum, item) => sum + item.variant.priceCents * item.quantity, 0);
}

export async function createOrderFromCheckoutSession(session: Stripe.Checkout.Session, rawEventId: string) {
    const cartId = session.metadata?.cartId ?? session.client_reference_id;

    if (!cartId) {
        throw new Error('Missing cart id on Stripe checkout session.');
    }

    const existingOrder = await prisma.order.findUnique({
        where: {
            stripeCheckoutSessionId: session.id,
        },
        select: {
            id: true,
        },
    });

    if (existingOrder) {
        return existingOrder;
    }

    const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: checkoutCartInclude,
    });

    if (!cart || cart.items.length === 0) {
        throw new Error(`Cart ${cartId} not found or empty.`);
    }

    const email = session.customer_details?.email ?? session.customer_email;

    if (!email) {
        throw new Error('Missing customer email on Stripe checkout session.');
    }

    const paymentIntentId = getStripeObjectId(session.payment_intent);
    const shippingAddress = session.customer_details?.address;
    const subtotalCents = getCartSubtotal(cart);
    const totalCents = session.amount_total ?? subtotalCents;
    const shippingCents = Math.max(0, totalCents - subtotalCents);

    return prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
            data: {
                orderNumber: createOrderNumber(),
                userId: cart.userId,
                email,
                status: 'PAID',
                subtotalCents,
                shippingCents,
                totalCents,
                currency: (session.currency ?? cart.currency).toUpperCase(),
                stripeCheckoutSessionId: session.id,
                stripePaymentIntentId: paymentIntentId,
                customerName: session.customer_details?.name,
                shippingName: session.customer_details?.name,
                shippingLine1: shippingAddress?.line1,
                shippingLine2: shippingAddress?.line2,
                shippingPostalCode: shippingAddress?.postal_code,
                shippingCity: shippingAddress?.city,
                shippingCountry: shippingAddress?.country,
                paidAt: new Date(),
                items: {
                    create: cart.items.map((item) => ({
                        artworkId: item.variant.artworkId,
                        variantId: item.variantId,
                        title: item.variant.artwork.title,
                        variantTitle: item.variant.title,
                        quantity: item.quantity,
                        unitPriceCents: item.variant.priceCents,
                        totalPriceCents: item.variant.priceCents * item.quantity,
                    })),
                },
            },
            select: {
                id: true,
            },
        });

        await tx.payment.create({
            data: {
                orderId: order.id,
                status: 'SUCCEEDED',
                amountCents: totalCents,
                currency: (session.currency ?? cart.currency).toUpperCase(),
                providerPaymentIntentId: paymentIntentId,
                rawEventId,
            },
        });

        for (const item of cart.items) {
            await tx.productVariant.update({
                where: { id: item.variantId },
                data: {
                    stock: {
                        decrement: item.quantity,
                    },
                },
            });
        }

        await tx.cart.update({
            where: { id: cart.id },
            data: {
                status: 'CONVERTED',
            },
        });

        return order;
    });
}
