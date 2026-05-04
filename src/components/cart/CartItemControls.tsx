'use client';

import { useState } from 'react';
import { Loader2, Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CartItemControlsProps {
    cartItemId: string;
    quantity: number;
    maxQuantity: number;
}

export function CartItemControls({ cartItemId, quantity, maxQuantity }: CartItemControlsProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    async function updateQuantity(nextQuantity: number) {
        if (isPending) return;

        setIsPending(true);

        await fetch('/api/cart', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cartItemId,
                quantity: Math.max(0, Math.min(maxQuantity, nextQuantity)),
            }),
        });

        setIsPending(false);
        router.refresh();
    }

    async function removeItem() {
        if (isPending) return;

        setIsPending(true);

        await fetch('/api/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartItemId }),
        });

        setIsPending(false);
        router.refresh();
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            <div className="inline-grid h-10 grid-cols-[2.5rem_2.75rem_2.5rem] overflow-hidden rounded-full border border-white/12 bg-white/[0.04]">
                <button
                    type="button"
                    onClick={() => updateQuantity(quantity - 1)}
                    disabled={isPending || quantity <= 1}
                    className="inline-flex items-center justify-center text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-35"
                    aria-label="Diminuer la quantite"
                >
                    <Minus size={15} />
                </button>
                <span className="inline-flex items-center justify-center border-x border-white/12 text-sm text-white">{isPending ? <Loader2 size={15} className="animate-spin" /> : quantity}</span>
                <button
                    type="button"
                    onClick={() => updateQuantity(quantity + 1)}
                    disabled={isPending || quantity >= maxQuantity}
                    className="inline-flex items-center justify-center text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-35"
                    aria-label="Augmenter la quantite"
                >
                    <Plus size={15} />
                </button>
            </div>

            <button
                type="button"
                onClick={removeItem}
                disabled={isPending}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/64 transition hover:border-red-200/35 hover:bg-red-300/10 hover:text-red-100 disabled:opacity-40"
                aria-label="Retirer du panier"
                title="Retirer du panier"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}
