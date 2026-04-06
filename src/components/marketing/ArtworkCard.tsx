import Link from 'next/link';
import type { Artwork } from '@/domain/artworks/types';
import { cn } from '@/lib/utils/cn';

interface ArtworkCardProps {
    artwork: Artwork;
    className?: string;
}

const availabilityLabel: Record<Artwork['availability'], string> = {
    available: 'Disponible',
    reserved: 'Réservée',
    sold: 'Vendue',
};

export function ArtworkCard({ artwork, className }: ArtworkCardProps) {
    return (
        <article className={cn('group rounded-3xl border border-white/10 bg-white/3 p-5 transition hover:border-white/20', className)}>
            <div className="h-52 rounded-2xl bg-[linear-gradient(140deg,var(--surface),var(--bg-primary))]" aria-hidden="true" />
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/55">{artwork.collection}</p>
            <h3 className="mt-2 text-2xl text-white">{artwork.title}</h3>
            <p className="mt-2 text-sm text-white/70">{artwork.excerpt}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-white/70">
                <span>{artwork.priceEur.toLocaleString('fr-FR')} €</span>
                <span>{availabilityLabel[artwork.availability]}</span>
            </div>
            <Link href={`/oeuvres/${artwork.slug}`} className="mt-5 inline-flex text-sm font-semibold text-white underline-offset-4 hover:underline">
                Voir le détail
            </Link>
        </article>
    );
}
