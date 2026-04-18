import Image from 'next/image';
import Link from 'next/link';

import { MarketingSecondaryLink } from '@/components/marketing/shared/MarketingSecondaryLink';
import { formatArtworkPrice, getAvailabilityLabel, getArtworkTypeLabel } from '@/domain/artworks/presentation';
import type { Artwork } from '@/domain/artworks/types';
import { marketingPageSpacing } from '@/layout/marketing/page-spacing';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface OeuvreDetailHeroProps {
    artwork: Artwork;
    className?: string;
}

const availabilityTone: Record<Artwork['availability'], string> = {
    available: 'bg-white/15 text-white',
    reserved: 'bg-(--accent)/35 text-white',
    sold: 'bg-black/35 text-white/70',
};

export function OeuvreDetailHero({ artwork, className }: OeuvreDetailHeroProps) {
    const isAvailable = artwork.availability === 'available';

    return (
        <section
            aria-label={`Présentation de l’œuvre ${artwork.title}`}
            className={cn(`relative overflow-hidden bg-(--bg-primary) pb-12 sm:pb-14 lg:pb-16 ${marketingPageSpacing.immersiveOffset}`, className)}
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(6,12,21,0.72)_0%,rgba(6,12,21,0)_100%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-6 h-24 w-88 -translate-x-1/2 bg-(--accent)/8 blur-3xl" />

            <Container className="relative z-10">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.8fr)] lg:items-center lg:gap-10 xl:gap-14">
                    <div>
                        <div className="relative mx-auto max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-2 sm:p-3 lg:mx-0">
                            <div className="relative overflow-hidden rounded-[1.1rem]">
                                <div className="relative aspect-4/5 overflow-hidden sm:aspect-5/6">
                                    <Image src={artwork.image} alt={artwork.title} fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover object-center" />

                                    {artwork.availability === 'sold' && <div className="absolute inset-0 bg-black/15 grayscale-[0.15]" />}

                                    <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
                                        <span
                                            className={cn(
                                                'rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.08em] backdrop-blur-md',
                                                availabilityTone[artwork.availability],
                                            )}
                                        >
                                            {getAvailabilityLabel(artwork.availability)}
                                        </span>
                                    </div>

                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_72%,rgba(0,0,0,0.12)_100%)]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto flex w-full max-w-136 flex-col justify-center lg:mx-0">
                        <div className="mb-5">
                            <Link href="/oeuvres" className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-300 hover:text-white">
                                Retour à la galerie
                                <span className="h-px w-6 bg-white/40 transition-all duration-300 hover:w-10" />
                            </Link>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/48">
                            <span>{artwork.collection}</span>
                            <span className="h-1 w-1 rounded-full bg-white/26" />
                            <span>{artwork.category}</span>
                            <span className="h-1 w-1 rounded-full bg-white/26" />
                            <span>{artwork.technique}</span>
                        </div>

                        <Heading level={1} className="mt-4 text-white sm:text-5xl lg:text-[3rem]">
                            {artwork.title}
                        </Heading>

                        <Text variant="muted" className="mt-4 max-w-xl text-white/74">
                            {artwork.excerpt}
                        </Text>

                        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span className="text-lg text-white">{formatArtworkPrice(artwork.priceEur)}</span>
                            <span className="text-sm text-white/55">{artwork.dimensions}</span>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:max-w-sm">
                            {isAvailable ? (
                                <Link href="/contact" className="block">
                                    <Button className="min-h-12 w-full rounded-full px-6">Je la choisis</Button>
                                </Link>
                            ) : (
                                <MarketingSecondaryLink href="/contact" className="w-full">
                                    Ce regard m’appelle
                                </MarketingSecondaryLink>
                            )}

                            <MarketingSecondaryLink href="/commandes" className="w-full">
                                Me confier un visage
                            </MarketingSecondaryLink>
                        </div>

                        <div className="mt-8 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/42">Support</p>
                                <p className="mt-2 text-sm text-white/84">{artwork.support}</p>
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/42">Dimensions</p>
                                <p className="mt-2 text-sm text-white/84">{artwork.dimensions}</p>
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/42">Type</p>
                                <p className="mt-2 text-sm text-white/84">{getArtworkTypeLabel(artwork.type)}</p>
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/42">Technique</p>
                                <p className="mt-2 text-sm text-white/84">{artwork.technique}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
