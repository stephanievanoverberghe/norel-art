import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { FavoriteToggle } from '@/components/favorites/FavoriteToggle';
import { formatArtworkPrice, getAvailabilityLabel } from '@/domain/artworks/presentation';
import type { Artwork } from '@/domain/artworks/types';
import { cn } from '@/lib/utils/cn';

interface OeuvresArtworkCardProps {
    artwork: Artwork;
    isFavorite?: boolean;
}

const availabilityTone: Record<Artwork['availability'], string> = {
    available: 'border-emerald-200/20 bg-emerald-300/12 text-emerald-50',
    reserved: 'border-(--premium)/24 bg-(--premium)/12 text-white',
    sold: 'border-white/10 bg-black/42 text-white/58',
};

export function OeuvresArtworkCard({ artwork, isFavorite = false }: OeuvresArtworkCardProps) {
    return (
        <article className="group relative overflow-hidden rounded-md border border-white/10 bg-[#08131f]/72 transition hover:-translate-y-0.5 hover:border-white/18 hover:bg-[#0b1828]/82">
            <Link href={`/oeuvres/${artwork.slug}`} className="block">
                <div className="relative aspect-4/5 overflow-hidden">
                    <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    />
                    {artwork.availability === 'sold' ? <div className="absolute inset-0 bg-black/58 grayscale-[0.38]" /> : null}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.22)_54%,rgba(0,0,0,0.78)_100%)]" />

                    <div className="absolute right-3 top-3 z-20">
                        <span className={cn('rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.08em] backdrop-blur-md', availabilityTone[artwork.availability])}>
                            {getAvailabilityLabel(artwork.availability)}
                        </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/58">{artwork.collection}</p>
                        <h3 className="mt-2 text-xl font-semibold leading-tight text-white">{artwork.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/68">{artwork.excerpt}</p>
                    </div>
                </div>
            </Link>

            <div className="grid gap-3 border-t border-white/8 px-4 py-4 sm:px-5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/34">{artwork.technique}</p>
                        <p className="mt-1 text-sm font-semibold text-white">{formatArtworkPrice(artwork.priceEur)}</p>
                    </div>
                    <Link href={`/oeuvres/${artwork.slug}`} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-white/20 hover:bg-white/9 hover:text-white" aria-label={`Voir ${artwork.title}`}>
                        <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>

            <div className="absolute left-3 top-3 z-30">
                <FavoriteToggle artworkId={artwork.id} initialIsFavorite={isFavorite} label="" className="h-10 min-h-10 w-10 px-0" />
            </div>
        </article>
    );
}
