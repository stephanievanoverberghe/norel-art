'use client';

import { Heart, SlidersHorizontal, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { OeuvresHeroContent } from '@/domain/oeuvres/types';
import { marketingPageSpacing } from '@/layout/marketing/page-spacing';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface OeuvresHeroProps {
    content: OeuvresHeroContent;
    className?: string;
}

const galleryPromises = [
    { label: 'Filtrer', icon: SlidersHorizontal },
    { label: 'Favoris', icon: Heart },
    { label: 'Acheter', icon: ShoppingBag },
] as const;

export function OeuvresHero({ content, className }: OeuvresHeroProps) {
    return (
        <section aria-label="Galerie des œuvres" className={cn(`marketing-section marketing-bg-night pb-14 sm:pb-18 lg:pb-22 ${marketingPageSpacing.editorialOffset}`, className)}>
            <div className="absolute inset-0">
                <Image src="/images/oeuvres/oeuvres-hero.jpg" alt="Galerie d’œuvres Norel Art" fill priority sizes="100vw" className="object-cover object-center" />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(102deg,rgba(3,8,16,0.9)_0%,rgba(3,8,16,0.66)_48%,rgba(3,8,16,0.34)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(72deg,rgba(158,0,49,0.16)_0%,rgba(158,0,49,0)_42%),linear-gradient(142deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_68%,rgba(255,255,255,0)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(5,10,18,0.72)_0%,rgba(5,10,18,0)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,rgba(5,10,18,0)_0%,rgba(5,10,18,0.72)_70%,#050A12_100%)]" />

            <Container className="relative z-10">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.55fr)] lg:items-end">
                    <div className="max-w-3xl">
                        <p className="text-[11px] uppercase tracking-[0.32em] text-white/56">{content.eyebrow}</p>

                        <Heading level={1} className="mt-4 max-w-[11ch] text-[clamp(3.8rem,9vw,7.6rem)] leading-[0.86] text-white">
                            {content.title}
                        </Heading>

                        <Text variant="muted" className="mt-6 max-w-xl text-white/76 sm:text-lg">
                            {content.description}
                        </Text>
                    </div>

                    <aside className="border-t border-white/12 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.26em] text-white/42">
                            <ShoppingBag size={15} className="text-(--accent)" />
                            Boutique en ligne
                        </div>
                        <div className="mt-5 grid gap-3">
                            {galleryPromises.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div key={item.label} className="flex items-center gap-3 text-sm text-white/68">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/72">
                                            <Icon size={16} />
                                        </span>
                                        {item.label}
                                    </div>
                                );
                            })}
                        </div>
                        <Link href="/mon-compte/favoris" className="mt-6 inline-flex text-sm font-medium text-white/72 transition hover:text-white">
                            Retrouver mes favoris
                        </Link>
                    </aside>
                </div>
            </Container>
        </section>
    );
}
