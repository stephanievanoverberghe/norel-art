import 'server-only';

import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function getStripeClient(): Stripe {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey || secretKey.includes('replace')) {
        throw new Error('STRIPE_SECRET_KEY is not configured.');
    }

    stripeClient ??= new Stripe(secretKey);

    return stripeClient;
}

export function getStripeWebhookSecret(): string {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret || webhookSecret.includes('replace')) {
        throw new Error('STRIPE_WEBHOOK_SECRET is not configured.');
    }

    return webhookSecret;
}
