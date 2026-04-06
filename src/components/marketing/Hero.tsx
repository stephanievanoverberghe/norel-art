'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Section } from '@/ui/Section';
import { Text } from '@/ui/Text';
import { cn } from '@/lib/utils/cn';

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
        <Section as="section" className={cn('relative min-h-screen overflow-hidden py-0', className)}>
            <div className="absolute inset-0">
                <Image src="/images/hero/norel-hero.jpg" alt="Portrait artistique Norel Art" fill priority className="object-cover object-center" />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,27,42,0.28)_0%,rgba(13,27,42,0.44)_30%,rgba(13,27,42,0.78)_68%,rgba(13,27,42,0.96)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(158,0,49,0.18),transparent_38%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(13,27,42,0)_0%,rgba(13,27,42,0.92)_100%)]" />

            <div aria-hidden="true" className="absolute left-1/2 top-[20%] h-40 w-40 -translate-x-1/2 rounded-full border border-white/10 bg-white/5 blur-3xl" />
            <div aria-hidden="true" className="absolute right-[12%] top-[18%] h-52 w-52 rounded-full bg-[var(--accent)]/10 blur-3xl" />
            <div aria-hidden="true" className="absolute left-[8%] bottom-[18%] h-44 w-44 rounded-full bg-[var(--surface)]/20 blur-3xl" />

            <Container className="relative flex min-h-screen items-end pb-20 pt-36 sm:pb-24 sm:pt-40 lg:pb-28">
                <div className="max-w-3xl">
                    <p className="mb-4 text-[11px] uppercase tracking-[0.32em] text-white/50 sm:mb-6">Norel Art</p>

                    <Heading level={1} className="max-w-4xl text-[var(--text-primary)] drop-shadow-[0_6px_30px_rgba(0,0,0,0.28)]">
                        Entre. Regarde.
                        <br />
                        Tu verras,
                        <br />
                        ce n’est pas que toi
                        <br />
                        que tu regardes.
                    </Heading>

                    <Text variant="muted" className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:mt-8 sm:text-lg">
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
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/[0.08]"
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
                        <span className="absolute left-0 top-0 h-5 w-px bg-white/70 animate-[heroScroll_2.2s_ease-in-out_infinite]" />
                    </span>
                </div>
            </div>

            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(13,27,42,0)_0%,rgba(13,27,42,1)_100%)]" />
        </Section>
    );
}
