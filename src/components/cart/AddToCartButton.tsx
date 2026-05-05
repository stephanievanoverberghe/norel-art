'use client';

import { useState } from 'react';
import { Loader2, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/ui/Button';

interface AddToCartButtonProps {
    variantId?: string;
    disabled?: boolean;
    className?: string;
}

export function AddToCartButton({ variantId, disabled = false, className }: AddToCartButtonProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function addToCart() {
        if (!variantId || isPending || disabled) {
            return;
        }

        setIsPending(true);
        setError(null);

        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                variantId,
                quantity: 1,
            }),
        });

        if (!response.ok) {
            setError('Impossible d’ajouter cette œuvre au panier.');
            setIsPending(false);
            return;
        }

        router.push('/panier');
        router.refresh();
    }

    return (
        <div className={className}>
            <Button type="button" onClick={addToCart} disabled={disabled || !variantId || isPending} className="min-h-12 w-full rounded-full px-6">
                <span className="inline-flex items-center gap-2">
                    {isPending ? <Loader2 size={18} className="animate-spin" /> : <ShoppingBag size={18} />}
                    Ajouter au panier
                </span>
            </Button>
            {error ? <p className="mt-2 text-sm text-red-200">{error}</p> : null}
        </div>
    );
}
