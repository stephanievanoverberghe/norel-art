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
    const handleScrollToGallery = () => {
        const target = document.getElementById('selection-oeuvres');

        if (!target) return;

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <section className={cn('relative min-h-screen overflow-hidden', className)}>
            <div className="absolute inset-0">
                <Image src="/images/hero/norel-hero.jpg" alt="Portrait artistique Norel Art" fill priority className="object-cover object-center" sizes="100vw" />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,26,0.24)_0%,rgba(8,16,26,0.52)_42%,rgba(8,16,26,0.9)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(8,16,26,0.52)_0%,rgba(8,16,26,0)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(158,0,49,0.16),transparent_40%)]" />

            <Container className="relative flex min-h-screen items-end pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-48">
                <div className="max-w-3xl">
                    <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-white/55 sm:mb-6">Norel Art</p>

                    <Heading level={1} className="max-w-4xl text-(--text-primary) drop-shadow-[0_8px_26px_rgba(0,0,0,0.35)]">
                        Entre. Regarde.
                        <br />
                        Tu verras,
                        <br />
                        ce n’est pas que toi
                        <br />
                        que tu regardes.
                    </Heading>

                    <Text variant="muted" className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:mt-8 sm:text-lg">
                        Des visages, des silences, des traces.
                        <br />
                        Des œuvres à ressentir avant même de les nommer.
                    </Text>

                    <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
                        <Button onClick={handleScrollToGallery} className="rounded-full px-6 py-3">
                            Voir ce regard
                        </Button>

                        <Link
                            href="/commandes"
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/4 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/10"
                        >
                            Me confier un visage
                        </Link>
                    </div>
                </div>
            </Container>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-8 sm:pb-10">
                <div className="flex flex-col items-center gap-3 text-white/45">
                    <span className="text-[10px] uppercase tracking-[0.28em]">Descendre</span>
                    <span className="relative block h-12 w-px overflow-hidden bg-white/15">
                        <span className="absolute left-0 top-0 h-5 w-px animate-[heroScroll_2.2s_ease-in-out_infinite] bg-white/70" />
                    </span>
                </div>
            </div>
        </section>
    );
}
