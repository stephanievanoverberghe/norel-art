'use client';

import { useState } from 'react';
import { Loader2, LockKeyhole } from 'lucide-react';

interface CheckoutButtonProps {
    disabled?: boolean;
}

export function CheckoutButton({ disabled = false }: CheckoutButtonProps) {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function startCheckout() {
        if (disabled || isPending) {
            return;
        }

        setIsPending(true);
        setError(null);

        const response = await fetch('/api/checkout', {
            method: 'POST',
        });

        const payload = (await response.json().catch(() => null)) as { url?: string; message?: string } | null;

        if (!response.ok || !payload?.url) {
            setError(payload?.message ?? 'Checkout indisponible pour le moment.');
            setIsPending(false);
            return;
        }

        window.location.assign(payload.url);
    }

    return (
        <div className="mt-6">
            <button
                type="button"
                onClick={startCheckout}
                disabled={disabled || isPending}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-(--accent) px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-wait disabled:opacity-55"
            >
                {isPending ? <Loader2 size={18} className="animate-spin" /> : <LockKeyhole size={18} />}
                Payer avec Stripe
            </button>
            {error ? <p className="mt-3 text-sm leading-6 text-red-200">{error}</p> : null}
        </div>
    );
}
