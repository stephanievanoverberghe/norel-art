import { ArrowUpRight, Ruler, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { FavoriteToggle } from '@/components/favorites/FavoriteToggle';
import { formatArtworkPrice, getAvailabilityLabel, getArtworkTypeLabel } from '@/domain/artworks/presentation';
import type { Artwork } from '@/domain/artworks/types';
import { cn } from '@/lib/utils/cn';

interface OeuvresArtworkCardProps {
    artwork: Artwork;
    isFavorite?: boolean;
}

const availabilityTone: Record<Artwork['availability'], string> = {
    available: 'border-emerald-200/20 bg-emerald-300/12 text-emerald-50',
    reserved: 'border-(--surface)/45 bg-(--surface)/28 text-white',
    sold: 'border-white/10 bg-black/42 text-white/58',
};

export function OeuvresArtworkCard({ artwork, isFavorite = false }: OeuvresArtworkCardProps) {
    const isAvailable = artwork.availability === 'available';

    return (
        <article className="group relative overflow-hidden rounded-md border border-white/10 bg-[#08131f]/78 transition duration-300 hover:-translate-y-0.5 hover:border-white/18 hover:bg-[#0b1828]/88">
            <div className="absolute left-3 top-3 z-30">
                <FavoriteToggle artworkId={artwork.id} initialIsFavorite={isFavorite} label="" className="h-10 min-h-10 w-10 px-0" />
            </div>

            <Link href={`/oeuvres/${artwork.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-black/20">
                    <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    />
                    {artwork.availability === 'sold' ? <div className="absolute inset-0 bg-black/58 grayscale-[0.38]" /> : null}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.14)_48%,rgba(0,0,0,0.8)_100%)]" />

                    <div className="absolute right-3 top-3 z-20 flex flex-col items-end gap-2">
                        <span className={cn('rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.08em] backdrop-blur-md', availabilityTone[artwork.availability])}>
                            {getAvailabilityLabel(artwork.availability)}
                        </span>
                        <span className="rounded-full border border-white/10 bg-black/38 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-white/68 backdrop-blur-md">
                            {getArtworkTypeLabel(artwork.type)}
                        </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/58">{artwork.collection}</p>
                        <h3 className="mt-2 text-2xl font-semibold leading-tight text-white">{artwork.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/68">{artwork.excerpt}</p>
                    </div>
                </div>
            </Link>

            <div className="grid gap-4 border-t border-white/8 px-4 py-4 sm:px-5">
                <div className="grid gap-3 text-sm text-white/60">
                    <div className="flex items-start gap-2">
                        <Ruler size={15} className="mt-0.5 shrink-0 text-white/34" />
                        <span className="line-clamp-1">{artwork.dimensions}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <ShoppingBag size={15} className="mt-0.5 shrink-0 text-white/34" />
                        <span className="line-clamp-1">{artwork.technique}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-white/8 pt-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/34">Prix</p>
                        <p className="mt-1 text-lg font-semibold text-white">{formatArtworkPrice(artwork.priceEur)}</p>
                    </div>
                    <Link
                        href={`/oeuvres/${artwork.slug}`}
                        className={cn(
                            'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition',
                            isAvailable ? 'border-white/12 bg-white/[0.06] text-white hover:border-white/24 hover:bg-white/[0.1]' : 'border-white/10 bg-white/[0.035] text-white/58 hover:text-white',
                        )}
                        aria-label={`Voir ${artwork.title}`}
                    >
                        Voir
                        <ArrowUpRight size={15} />
                    </Link>
                </div>
            </div>
        </article>
    );
}
