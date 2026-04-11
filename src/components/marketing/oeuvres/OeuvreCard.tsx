import Image from 'next/image';
import Link from 'next/link';

import type { Artwork } from '@/domain/artworks/types';
import { cn } from '@/lib/utils/cn';

interface OeuvreCardProps {
    artwork: Artwork;
}

const availabilityLabel: Record<Artwork['availability'], string> = {
    available: 'Disponible',
    reserved: 'Réservée',
    sold: 'Vendue',
};

const availabilityTone: Record<Artwork['availability'], string> = {
    available: 'bg-white/[0.12] text-white/88',
    reserved: 'bg-[color:var(--accent)]/24 text-white',
    sold: 'bg-white/[0.08] text-white/58',
};

function formatPrice(price: number) {
    return `${price.toLocaleString('fr-FR')} €`;
}

export function OeuvreCard({ artwork }: OeuvreCardProps) {
    return (
        <article className="group relative">
            <Link href={`/oeuvres/${artwork.slug}`} className="relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[3">
                <div className="relative aspect-4/5 overflow-hidden">
                    <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.02)_0%,rgba(4,10,18,0.16)_42%,rgba(4,10,18,0.86)_100%)]" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/55">
                        <span>{artwork.collection}</span>
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        <span>{artwork.technique}</span>
                    </div>

                    <h3 className="mt-3 text-xl text-white">{artwork.title}</h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/72">{artwork.excerpt}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                        <span className="text-white/88">{formatPrice(artwork.priceEur)}</span>

                        <span className={cn('rounded-full px-2.5 py-1 text-[10px] tracking-[0.08em] sm:px-3 sm:text-xs', availabilityTone[artwork.availability])}>
                            {availabilityLabel[artwork.availability]}
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
