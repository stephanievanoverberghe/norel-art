'use client';

import { ArrowUpRight, Heart, ShieldCheck, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { MarketingSecondaryLink } from '@/components/marketing/shared/MarketingSecondaryLink';
import type { HomeHeroContent } from '@/domain/home/types';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface HomeHeroProps {
    content: HomeHeroContent;
    className?: string;
}

const heroSignals = [
    { label: 'Favoris', value: 'Sauvegarder', icon: Heart },
    { label: 'Achat', value: 'Stripe', icon: ShoppingBag },
    { label: 'Pieces', value: 'Signees', icon: ShieldCheck },
] as const;

export function HomeHero({ content, className }: HomeHeroProps) {
    const handleScrollToReveal = () => {
        const target = document.getElementById(content.scrollTargetId);

        if (!target) return;

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className={cn('relative min-h-screen overflow-hidden bg-(--bg-deep)', className)} aria-label="Entree dans l'univers Norel Art">
            <div className="absolute inset-0">
                <Image src={content.image.src} alt={content.image.alt} fill priority className="object-cover object-center" sizes={content.image.sizes} />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(102deg,rgba(3,8,16,0.88)_0%,rgba(3,8,16,0.58)_46%,rgba(3,8,16,0.26)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_78%_18%,rgba(158,0,49,0.24),transparent_68%)]" />
            <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(5,10,18,0.74)_0%,rgba(5,10,18,0)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(180deg,rgba(5,10,18,0)_0%,rgba(5,10,18,0.76)_68%,#050A12_100%)]" />

            <Container className="relative z-10 flex min-h-screen items-end pb-24 pt-32 sm:pt-40 lg:pb-28 lg:pt-48">
                <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(23rem,0.55fr)] lg:items-end">
                    <div className="max-w-3xl pb-4">
                        <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-white/62">{content.eyebrow}</p>

                        <Heading level={1} className="max-w-[12ch] text-[clamp(4rem,10vw,8.5rem)] leading-[0.82] text-white drop-shadow-[0_18px_44px_rgba(0,0,0,0.5)]">
                            {content.titleLines.map((line) => (
                                <span key={line} className="block">
                                    {line}
                                </span>
                            ))}
                        </Heading>

                        <Text variant="muted" className="mt-7 max-w-xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
                            {content.description}
                        </Text>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Button onClick={handleScrollToReveal} className="min-h-12 rounded-full px-7">
                                {content.primaryCtaLabel}
                            </Button>

                            <MarketingSecondaryLink href={content.secondaryCtaHref} className="bg-white/6 px-7">
                                {content.secondaryCtaLabel}
                            </MarketingSecondaryLink>
                        </div>
                    </div>

                    <aside className="hidden lg:block">
                        <div className="border-l border-white/12 pl-6">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-white/44">Experience boutique</p>
                            <div className="mt-5 grid gap-3">
                                {heroSignals.map((signal) => {
                                    const Icon = signal.icon;

                                    return (
                                        <div key={signal.label} className="flex items-center justify-between gap-4 border-b border-white/8 pb-3">
                                            <span className="inline-flex items-center gap-3 text-sm text-white/68">
                                                <Icon size={16} className="text-(--premium)" />
                                                {signal.label}
                                            </span>
                                            <span className="text-sm font-medium text-white">{signal.value}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <Link href="/mon-compte" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/72 transition hover:text-white">
                                Espace collectionneur
                                <ArrowUpRight size={15} />
                            </Link>
                        </div>
                    </aside>
                </div>
            </Container>

            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center">
                <div className="flex flex-col items-center gap-2 text-white/50">
                    <span className="text-[10px] uppercase tracking-[0.28em]">Descendre</span>
                    <span className="relative block h-12 w-px overflow-hidden bg-white/15">
                        <span className="absolute left-0 top-0 h-5 w-px animate-[heroScroll_2.2s_ease-in-out_infinite] bg-white/75" />
                    </span>
                </div>
            </div>
        </section>
    );
}
