import Image from 'next/image';
import Link from 'next/link';

import type { Artwork } from '@/domain/artworks/types';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';
import { cn } from '@/lib/utils/cn';

interface FeaturedRevealProps {
    artworks: Artwork[];
    className?: string;
}

const availabilityLabel: Record<Artwork['availability'], string> = {
    available: 'Disponible',
    reserved: 'Réservée',
    sold: 'Vendue',
};

export function FeaturedReveal({ artworks, className }: FeaturedRevealProps) {
    const [mainArtwork, leftArtwork, rightArtwork] = artworks;

    if (!mainArtwork) return null;

    return (
        <section
            id="selection-oeuvres"
            aria-label="Premières œuvres révélées"
            className={cn('relative overflow-hidden bg-[var(--bg-primary)] pb-24 pt-16 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24', className)}
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,#060C15_0%,rgba(6,12,21,0)_100%)]" />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.18)_50%,rgba(255,255,255,0)_100%)]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-8 h-36 w-[34rem] -translate-x-1/2 bg-[var(--accent)]/10 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute left-[-6rem] top-40 h-72 w-72 rounded-full bg-white/[0.025] blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-[-4rem] h-72 w-72 rounded-full bg-[var(--surface)]/18 blur-3xl" />

            <Container className="relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Première apparition</p>

                    <Heading level={2} className="mt-4 text-white">
                        Le regard vient avant le choix.
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-5 max-w-xl text-white/68">
                        Quelques présences pour entrer plus loin.
                    </Text>
                </div>

                <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
                    {leftArtwork && (
                        <article className="group relative lg:col-span-3 lg:pt-16">
                            <Link href={`/oeuvres/${leftArtwork.slug}`} className="block overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.03]">
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <Image
                                        src={leftArtwork.image}
                                        alt={leftArtwork.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 24vw"
                                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.02)_0%,rgba(4,10,18,0.08)_28%,rgba(4,10,18,0.88)_100%)]" />
                                </div>

                                <div className="absolute inset-x-0 bottom-0 flex min-h-[42%] flex-col justify-end p-5">
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/52">{leftArtwork.collection}</p>

                                    <h3 className="mt-3 text-xl text-white">{leftArtwork.title}</h3>

                                    <div className="mt-4 flex items-center justify-between text-xs text-white/72">
                                        <span>{leftArtwork.priceEur.toLocaleString('fr-FR')} €</span>
                                        <span>{availabilityLabel[leftArtwork.availability]}</span>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    )}

                    <article className="group relative lg:col-span-6">
                        <Link href={`/oeuvres/${mainArtwork.slug}`} className="block overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.03]">
                            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/14] lg:aspect-[4/5]">
                                <Image
                                    src={mainArtwork.image}
                                    alt={mainArtwork.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.02)_0%,rgba(4,10,18,0.1)_26%,rgba(4,10,18,0.84)_100%)]" />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                                <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-white/52">
                                    <span>{mainArtwork.collection}</span>
                                    <span className="h-1 w-1 rounded-full bg-white/25" />
                                    <span>{mainArtwork.technique}</span>
                                </div>

                                <Heading level={3} className="mt-4 max-w-2xl text-white sm:text-4xl">
                                    {mainArtwork.title}
                                </Heading>

                                <Text variant="muted" className="mt-4 max-w-2xl text-white/72">
                                    {mainArtwork.story}
                                </Text>

                                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
                                    <span>{mainArtwork.priceEur.toLocaleString('fr-FR')} €</span>
                                    <span className="text-white/35">—</span>
                                    <span>{availabilityLabel[mainArtwork.availability]}</span>
                                    <span className="text-white/35">—</span>
                                    <span className="text-white/68">Voir cette présence</span>
                                </div>
                            </div>
                        </Link>
                    </article>

                    {rightArtwork && (
                        <article className="group relative lg:col-span-3 lg:pt-28">
                            <Link href={`/oeuvres/${rightArtwork.slug}`} className="block overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.03]">
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <Image
                                        src={rightArtwork.image}
                                        alt={rightArtwork.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 24vw"
                                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.02)_0%,rgba(4,10,18,0.1)_30%,rgba(4,10,18,0.9)_100%)]" />
                                </div>

                                <div className="absolute inset-x-0 bottom-0 flex min-h-[42%] flex-col justify-end p-5">
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/52">{rightArtwork.collection}</p>

                                    <h3 className="mt-3 text-xl text-white">{rightArtwork.title}</h3>

                                    <div className="mt-4 flex items-center justify-between text-xs text-white/72">
                                        <span>{rightArtwork.priceEur.toLocaleString('fr-FR')} €</span>
                                        <span>{availabilityLabel[rightArtwork.availability]}</span>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    )}
                </div>

                <div className="mt-14 flex flex-col items-center gap-4 text-center">
                    <Text variant="small" className="max-w-xl text-white/54">
                        Originaux, impressions signées, fragments à accueillir ou à prolonger autrement.
                    </Text>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link href="/oeuvres" className="inline-flex">
                            <Button className="min-h-12 rounded-full px-7">Explorer les œuvres</Button>
                        </Link>

                        <Link
                            href="/commandes"
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-7 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/[0.1]"
                        >
                            Me confier un visage
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
