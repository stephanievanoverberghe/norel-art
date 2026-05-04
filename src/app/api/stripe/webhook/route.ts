import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { createOrderFromCheckoutSession } from '@/server/orders/stripe-order';
import { getStripeClient, getStripeWebhookSecret } from '@/server/stripe/client';

export const runtime = 'nodejs';

export async function POST(request: Request) {
    const stripe = getStripeClient();
    const webhookSecret = getStripeWebhookSecret();
    const signature = (await headers()).get('stripe-signature');
    const payload = await request.text();

    if (!signature) {
        return NextResponse.json({ message: 'Missing Stripe signature.' }, { status: 400 });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch {
        return NextResponse.json({ message: 'Invalid Stripe signature.' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        await createOrderFromCheckoutSession(event.data.object, event.id);
    }

    return NextResponse.json({ received: true });
}
