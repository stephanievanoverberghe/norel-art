'use client';

import { ArrowUpRight, Palette } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { MarketingSecondaryLink } from '@/components/marketing/shared/MarketingSecondaryLink';
import type { Artwork } from '@/domain/artworks/types';
import type { HomeHeroContent } from '@/domain/home/types';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface HomeHeroProps {
    content: HomeHeroContent;
    featuredArtworks?: Artwork[];
    artworkCount?: number;
    className?: string;
}

const availabilityLabel: Record<Artwork['availability'], string> = {
    available: 'Disponible',
    reserved: 'Réservée',
    sold: 'Vendue',
};

const heroMarketLinks = [
    { href: '/oeuvres?type=original', label: 'Peintures' },
    { href: '/oeuvres?type=print', label: 'Affiches' },
    { href: '/commandes', label: 'Portraits' },
] as const;

function formatPrice(price: number) {
    return `${price.toLocaleString('fr-FR')} €`;
}

function HeroArtworkCard({ artwork, compact = false }: { artwork: Artwork; compact?: boolean }) {
    return (
        <Link
            href={`/oeuvres/${artwork.slug}`}
            className={cn('group relative block overflow-hidden rounded-md border border-white/10 bg-white/[0.035]', compact ? 'min-h-48' : 'min-h-[28rem]')}
        >
            <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                sizes={compact ? '15rem' : '28rem'}
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.02)_0%,rgba(4,10,18,0.2)_48%,rgba(4,10,18,0.88)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{artwork.collection}</p>
                <h2 className={cn('mt-2 font-semibold text-white', compact ? 'text-base' : 'text-2xl')}>{artwork.title}</h2>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-sm">
                    <span className="font-semibold text-white">{formatPrice(artwork.priceEur)}</span>
                    <span className="text-white/56">{availabilityLabel[artwork.availability]}</span>
                </div>
            </div>
        </Link>
    );
}

export function HomeHero({ content, featuredArtworks = [], artworkCount = 0, className }: HomeHeroProps) {
    const [mainArtwork, secondArtwork, thirdArtwork] = featuredArtworks;

    const handleScrollToReveal = () => {
        const target = document.getElementById(content.scrollTargetId);

        if (!target) return;

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className={cn('marketing-section marketing-bg-night overflow-hidden', className)} aria-label="Boutique Norel Art">
            <div className="absolute inset-0">
                <Image src={content.image.src} alt={content.image.alt} fill priority className="object-cover object-[58%_center]" sizes={content.image.sizes} />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,8,16,0.96)_0%,rgba(3,8,16,0.82)_44%,rgba(3,8,16,0.5)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(48rem_30rem_at_16%_30%,rgba(91,30,51,0.22),transparent_72%),linear-gradient(72deg,rgba(158,0,49,0.11)_0%,rgba(158,0,49,0)_44%),linear-gradient(142deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.035)_72%,rgba(255,255,255,0)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(5,10,18,0.82)_0%,rgba(5,10,18,0)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,rgba(5,10,18,0)_0%,rgba(5,10,18,0.78)_76%,#050A12_100%)]" />

            <Container className="relative z-10 pt-28 pb-12 sm:pt-36 sm:pb-18 lg:pt-38 lg:pb-20">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(27rem,0.82fr)] lg:items-end xl:gap-12">
                    <div className="max-w-3xl">
                        <div className="mb-5 flex flex-wrap items-center gap-3">
                            <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-white/12 bg-white/7 px-3 text-[10px] uppercase tracking-[0.2em] text-white/72 backdrop-blur-md">
                                <Palette size={13} className="text-(--accent)" />
                                {content.eyebrow}
                            </span>
                            {artworkCount > 0 ? <span className="text-xs font-medium text-white/52">{artworkCount} pièces disponibles</span> : null}
                        </div>

                        <Heading
                            level={1}
                            className="max-w-[15ch] text-4xl leading-[0.95] text-white drop-shadow-[0_18px_44px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem]"
                        >
                            {content.titleLines.map((line) => (
                                <span key={line} className="block">
                                    {line}
                                </span>
                            ))}
                        </Heading>

                        <Text variant="muted" className="mt-5 max-w-xl text-sm leading-6 text-white/76 sm:text-lg sm:leading-8">
                            {content.description}
                        </Text>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Button onClick={handleScrollToReveal} className="min-h-12 rounded-full px-7">
                                {content.primaryCtaLabel}
                            </Button>

                            <MarketingSecondaryLink href={content.secondaryCtaHref} className="bg-white/6 px-7">
                                {content.secondaryCtaLabel}
                            </MarketingSecondaryLink>
                        </div>

                        <div className="mt-7 grid max-w-xl grid-cols-3 gap-2">
                            {heroMarketLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="min-h-12 rounded-md border border-white/10 bg-white/[0.045] px-2 py-3 text-center text-[11px] font-medium leading-4 whitespace-nowrap text-white/62 transition hover:border-white/18 hover:bg-white/[0.07] hover:text-white sm:px-3 sm:text-xs"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {mainArtwork ? (
                        <aside className="hidden md:grid grid-cols-[minmax(0,1fr)_minmax(12rem,0.62fr)] gap-3 lg:pb-1">
                            <HeroArtworkCard artwork={mainArtwork} />
                            <div className="grid gap-3">
                                {secondArtwork ? <HeroArtworkCard artwork={secondArtwork} compact /> : null}
                                {thirdArtwork ? (
                                    <Link
                                        href="/oeuvres"
                                        className="group relative flex min-h-44 flex-col justify-end overflow-hidden rounded-md border border-white/10 bg-[#07111d]/78 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur-2xl"
                                    >
                                        <div className="absolute inset-0 bg-[radial-gradient(20rem_16rem_at_80%_0%,rgba(158,0,49,0.18),transparent_72%)]" />
                                        <p className="relative text-[10px] uppercase tracking-[0.22em] text-white/42">Dans la galerie</p>
                                        <h2 className="relative mt-2 text-lg font-semibold text-white">{thirdArtwork.title}</h2>
                                        <span className="relative mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/66 transition group-hover:text-white">
                                            Voir toutes les œuvres
                                            <ArrowUpRight size={15} />
                                        </span>
                                    </Link>
                                ) : null}
                            </div>
                        </aside>
                    ) : null}
                </div>
            </Container>
        </section>
    );
}
