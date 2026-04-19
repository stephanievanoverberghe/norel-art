import Image from 'next/image';
import Link from 'next/link';

import type { Artwork } from '@/domain/artworks/types';
import { cn } from '@/lib/utils/cn';
import { SnakeBorder } from '@/components/shared/SnakeBorder';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

import type { HomeFeaturedRevealContent } from '@/domain/home/types';

interface HomeFeaturedRevealSectionProps {
    content: HomeFeaturedRevealContent;
    artworks: Artwork[];
    className?: string;
}

const availabilityLabel: Record<Artwork['availability'], string> = {
    available: 'Disponible',
    reserved: 'Réservée',
    sold: 'Vendue',
};

const availabilityTone: Record<Artwork['availability'], string> = {
    available: 'bg-white/[0.12] text-white/86',
    reserved: 'bg-(--accent)/24 text-white',
    sold: 'bg-white/[0.08] text-white/55',
};

function formatPrice(price: number) {
    return `${price.toLocaleString('fr-FR')} €`;
}

function ArtworkMeta({ price, availability }: { price: number; availability: Artwork['availability'] }) {
    return (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="text-white/88">{formatPrice(price)}</span>
            <span className={cn('rounded-full px-2.5 py-1 text-[10px] tracking-[0.08em] sm:px-3 sm:text-xs', availabilityTone[availability])}>
                {availabilityLabel[availability]}
            </span>
        </div>
    );
}

export function HomeFeaturedRevealSection({ content, artworks, className }: HomeFeaturedRevealSectionProps) {
    const [mainArtwork, firstSatellite, secondSatellite] = artworks;

    if (!mainArtwork) return null;

    return (
        <section id={content.id} aria-label="Premières œuvres révélées" className={cn('relative overflow-hidden bg-(--bg-primary) py-16 sm:py-20 lg:py-24', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,#060C15_0%,rgba(6,12,21,0)_100%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-10 h-24 w-md -translate-x-1/2 bg-(--accent)/8 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-32 h-60 w-60 rounded-full bg-white/2 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-(--surface)/16 blur-3xl" />

            <Container className="relative z-10">
                <div className="grid gap-12 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:gap-16">
                    <div className="xl:pt-8">
                        <p className="text-[11px] uppercase tracking-[0.32em] text-white/42">{content.eyebrow}</p>

                        <Heading level={2} className="mt-4 max-w-sm text-white">
                            {content.title}
                        </Heading>

                        <Text variant="muted" className="mt-5 max-w-md text-white/70">
                            {content.description}
                        </Text>

                        <div className="mt-8 h-px w-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0)_100%)]" />

                        <div className="mt-8 space-y-3">
                            <Link href={content.ctaHref} className="block w-full sm:inline-flex sm:w-auto">
                                <Button className="min-h-12 w-full rounded-full px-6 sm:w-auto">{content.ctaLabel}</Button>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
                            <article className="group relative">
                                <Link href={`/oeuvres/${mainArtwork.slug}`} className="relative block overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/3">
                                    <SnakeBorder />
                                    <div className="relative aspect-4/5 overflow-hidden sm:aspect-16/12 lg:aspect-5/6">
                                        <Image
                                            src={mainArtwork.image}
                                            alt={mainArtwork.title}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 42vw"
                                            className="object-cover object-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.025]"
                                        />
                                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.02)_0%,rgba(4,10,18,0.14)_44%,rgba(4,10,18,0.84)_100%)]" />
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
                                        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/58">
                                            <span>{mainArtwork.collection}</span>
                                            <span className="h-1 w-1 rounded-full bg-white/30" />
                                            <span>{mainArtwork.technique}</span>
                                        </div>

                                        <Heading level={3} className="mt-3 max-w-xl text-white sm:text-3xl">
                                            {mainArtwork.title}
                                        </Heading>

                                        <Text variant="muted" className="mt-3 max-w-xl text-white/74 sm:text-base">
                                            {mainArtwork.excerpt}
                                        </Text>

                                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                                            <span className="text-white/88">{formatPrice(mainArtwork.priceEur)}</span>
                                            <span className={cn('rounded-full px-3 py-1 text-xs tracking-[0.08em]', availabilityTone[mainArtwork.availability])}>
                                                {availabilityLabel[mainArtwork.availability]}
                                            </span>
                                            <span className="text-white/66">Voir cette œuvre</span>
                                        </div>
                                    </div>
                                </Link>
                            </article>

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:pt-6">
                                {firstSatellite && (
                                    <article className="group relative lg:-ml-2">
                                        <Link
                                            href={`/oeuvres/${firstSatellite.slug}`}
                                            className="snake-border relative block overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/3"
                                        >
                                            <SnakeBorder />
                                            <div className="relative aspect-[4/4.7] overflow-hidden">
                                                <Image
                                                    src={firstSatellite.image}
                                                    alt={firstSatellite.title}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw"
                                                    className="object-cover object-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
                                                />
                                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.02)_0%,rgba(4,10,18,0.78)_100%)]" />
                                            </div>

                                            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">{firstSatellite.collection}</p>

                                                <h3 className="mt-2 text-lg text-white sm:text-xl">{firstSatellite.title}</h3>

                                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/72">{firstSatellite.excerpt}</p>

                                                <ArtworkMeta price={firstSatellite.priceEur} availability={firstSatellite.availability} />
                                            </div>
                                        </Link>
                                    </article>
                                )}

                                {secondSatellite && (
                                    <article className="group relative lg:ml-6">
                                        <Link
                                            href={`/oeuvres/${secondSatellite.slug}`}
                                            className="snake-border relative block overflow-hidden rounded-[1.4rem] border border-white/8 bg-white/3"
                                        >
                                            <SnakeBorder />
                                            <div className="relative aspect-4/3.5 overflow-hidden">
                                                <Image
                                                    src={secondSatellite.image}
                                                    alt={secondSatellite.title}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                                                    className="object-cover object-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
                                                />
                                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.02)_0%,rgba(4,10,18,0.82)_100%)]" />
                                            </div>

                                            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/55">{secondSatellite.collection}</p>

                                                <h3 className="mt-2 text-lg text-white sm:text-xl">{secondSatellite.title}</h3>

                                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/72">{secondSatellite.excerpt}</p>

                                                <ArtworkMeta price={secondSatellite.priceEur} availability={secondSatellite.availability} />
                                            </div>
                                        </Link>
                                    </article>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-6">
                            <Text variant="small" className="text-white/58">
                                {content.footerNote}
                            </Text>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
