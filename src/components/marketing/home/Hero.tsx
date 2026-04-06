'use client';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface HeroProps {
    className?: string;
}

export function Hero({ className }: HeroProps) {
    const handleScrollToReveal = () => {
        const target = document.getElementById('selection-oeuvres');

        if (!target) return;

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <section className={cn('relative min-h-screen overflow-hidden', className)} aria-label="Entrée dans l'univers Norel Art">
            <div className="absolute inset-0">
                <Image src="/images/hero/norel-hero.jpg" alt="Regard intense dans une atmosphère sombre" fill priority className="object-cover object-center" sizes="100vw" />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(106deg,rgba(3,9,17,0.94)_4%,rgba(3,9,17,0.68)_40%,rgba(3,9,17,0.84)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_16%,rgba(132,16,54,0.32),transparent_42%)]" />
            <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(4,10,18,0.7)_0%,rgba(4,10,18,0)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,rgba(4,10,18,0)_0%,rgba(4,10,18,0.78)_56%,#060C15_100%)]" />

            <Container className="relative flex min-h-screen items-end pb-28 pt-36 sm:pt-44 lg:pb-32 lg:pt-52">
                <div className="max-w-2xl">
                    <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-white/58 sm:mb-8">Norel Art · Peinture et illustration</p>

                    <Heading level={1} className="text-(--text-primary) drop-shadow-[0_12px_34px_rgba(0,0,0,0.44)]">
                        Un regard.
                        <br />
                        Un silence.
                        <br />
                        Tu entres.
                    </Heading>

                    <Text variant="muted" className="mt-6 max-w-lg text-base text-white/78 sm:mt-8 sm:text-lg">
                        Œuvres originales, impressions signées, commandes et fresques murales. Ici, on ressent d&apos;abord. On choisit ensuite.
                    </Text>

                    <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
                        <Button onClick={handleScrollToReveal} className="min-h-12 rounded-full px-7">
                            Ouvrir la sélection
                        </Button>

                        <Link
                            href="/commandes"
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/10"
                        >
                            Parler d&apos;une commande
                        </Link>
                    </div>
                </div>
            </Container>

            <div className="pointer-events-none absolute inset-x-0 bottom-14 z-10 flex justify-center">
                <div className="flex flex-col items-center gap-2 text-white/45">
                    <span className="text-[10px] uppercase tracking-[0.28em]">Descendre</span>
                    <span className="relative block h-12 w-px overflow-hidden bg-white/15">
                        <span className="absolute left-0 top-0 h-5 w-px animate-[heroScroll_2.2s_ease-in-out_infinite] bg-white/75" />
                    </span>
                </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(70%_100%_at_50%_100%,rgba(130,15,56,0.24),transparent_70%)]" />
        </section>
    );
}
