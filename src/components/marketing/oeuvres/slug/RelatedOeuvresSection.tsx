import Link from 'next/link';

import { getRelatedArtworks } from '@/application/artworks';
import type { Artwork } from '@/domain/artworks/types';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

import { OeuvresArtworkCard } from '../OeuvresArtworkCard';

interface RelatedOeuvresSectionProps {
    artwork: Artwork;
    artworks: Artwork[];
    className?: string;
}

export function RelatedOeuvresSection({ artwork, artworks, className }: RelatedOeuvresSectionProps) {
    const relatedArtworks = getRelatedArtworks(artwork, artworks, 4);

    if (relatedArtworks.length === 0) return null;

    return (
        <section aria-label="Œuvres liées" className={cn('relative overflow-hidden bg-(--bg-primary) py-16 sm:py-20 lg:py-24', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-10 h-24 w-[20rem] -translate-x-1/2 bg-(--accent)/6 blur-3xl" />

            <Container className="relative z-10">
                <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">Continuer</p>

                        <Heading level={2} className="mt-4 text-white">
                            D’autres présences à approcher.
                        </Heading>

                        <Text variant="muted" className="mt-4 text-white/70">
                            Des œuvres voisines, par la matière, le regard ou la tension.
                        </Text>
                    </div>

                    <Link href="/oeuvres" className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-300 hover:text-white">
                        Revenir à la galerie
                        <span className="h-px w-6 bg-white/40 transition-all duration-300 hover:w-10" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
                    {relatedArtworks.map((relatedArtwork) => (
                        <OeuvresArtworkCard key={relatedArtwork.id} artwork={relatedArtwork} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
