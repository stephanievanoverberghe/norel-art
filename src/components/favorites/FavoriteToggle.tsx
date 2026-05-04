'use client';

import { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils/cn';

interface FavoriteToggleProps {
    artworkId: string;
    initialIsFavorite?: boolean;
    label?: string;
    className?: string;
}

export function FavoriteToggle({ artworkId, initialIsFavorite = false, label, className }: FavoriteToggleProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
    const [isPending, setIsPending] = useState(false);

    async function toggleFavorite() {
        if (isPending) return;

        const nextValue = !isFavorite;
        setIsFavorite(nextValue);
        setIsPending(true);

        const response = await fetch('/api/favorites', {
            method: nextValue ? 'POST' : 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ artworkId }),
        });

        if (response.status === 401) {
            setIsFavorite(!nextValue);
            setIsPending(false);
            router.push(`/connexion?callbackUrl=${encodeURIComponent(pathname)}`);
            return;
        }

        if (!response.ok) {
            setIsFavorite(!nextValue);
            setIsPending(false);
            return;
        }

        setIsPending(false);
        router.refresh();
    }

    const accessibleLabel = isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris';
    const visibleLabel = label ?? (isFavorite ? 'Dans mes favoris' : 'Ajouter aux favoris');

    return (
        <button
            type="button"
            onClick={toggleFavorite}
            disabled={isPending}
            aria-pressed={isFavorite}
            aria-label={accessibleLabel}
            title={accessibleLabel}
            className={cn(
                'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/14 bg-black/38 px-4 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:border-white/30 hover:bg-black/52 disabled:cursor-wait disabled:opacity-70',
                isFavorite && 'border-(--accent)/50 bg-(--accent)/45',
                className,
            )}
        >
            {isPending ? <Loader2 size={17} className="animate-spin" /> : <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} />}
            {label !== '' ? <span>{visibleLabel}</span> : null}
        </button>
    );
}
