import Image from 'next/image';
import Link from 'next/link';

import { FavoriteToggle } from '@/components/favorites/FavoriteToggle';
import { SnakeBorder } from '@/components/shared/SnakeBorder';
import { formatArtworkPrice, getAvailabilityLabel } from '@/domain/artworks/presentation';
import type { Artwork } from '@/domain/artworks/types';
import { cn } from '@/lib/utils/cn';

interface OeuvresArtworkCardProps {
    artwork: Artwork;
    isFavorite?: boolean;
}

const availabilityTone: Record<Artwork['availability'], string> = {
    available: 'bg-white/20 text-white',
    reserved: 'bg-(--accent)/40 text-white',
    sold: 'bg-black/40 text-white/70',
};

export function OeuvresArtworkCard({ artwork, isFavorite = false }: OeuvresArtworkCardProps) {
    return (
        <article className="group relative">
            <Link href={`/oeuvres/${artwork.slug}`} className="relative block overflow-hidden rounded-[1.75rem] border border-white/10">
                <SnakeBorder />
                <div className="relative aspect-4/5 overflow-hidden">
                    <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    {artwork.availability === 'sold' && <div className="absolute inset-0 bg-black/70 grayscale-[0.5]" />}
                    <div className="absolute right-3 top-3 z-20">
                        <span className={cn('rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.08em] backdrop-blur-md', availabilityTone[artwork.availability])}>
                            {getAvailabilityLabel(artwork.availability)}
                        </span>
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_55%,rgba(0,0,0,0.8)_100%)]" />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/70" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:hidden">
                    <h3 className="text-base text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]">{artwork.title}</h3>

                    <div className="mt-1 text-sm text-white/90">{formatArtworkPrice(artwork.priceEur)}</div>
                </div>
                <div className="absolute inset-x-0 bottom-0 hidden p-5 sm:block">
                    <h3 className="text-xl text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.5)] transition-opacity duration-300 group-hover:opacity-0">{artwork.title}</h3>
                </div>
                <div className="absolute inset-0 hidden flex-col justify-end p-5 opacity-0 transition-all duration-500 group-hover:opacity-100 sm:flex">
                    <div className="max-w-[90%] translate-y-6 transition-transform duration-500 group-hover:translate-y-0">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/80">
                            {artwork.collection} · {artwork.technique}
                        </div>
                        <h3 className="mt-3 text-xl text-white">{artwork.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm text-white/80">{artwork.excerpt}</p>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-sm text-white">{formatArtworkPrice(artwork.priceEur)}</span>
                        </div>
                        <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/80">
                            <span>Voir l’œuvre</span>
                            <span className="h-px w-6 bg-white/50 transition-all duration-300 group-hover:w-10" />
                        </div>
                    </div>
                </div>
            </Link>
            <div className="absolute left-3 top-3 z-30">
                <FavoriteToggle artworkId={artwork.id} initialIsFavorite={isFavorite} label="" className="h-10 min-h-10 w-10 px-0" />
            </div>
        </article>
    );
}
