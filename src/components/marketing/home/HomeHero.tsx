'use client';

import Image from 'next/image';

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

export function HomeHero({ content, className }: HomeHeroProps) {
    const handleScrollToReveal = () => {
        const target = document.getElementById(content.scrollTargetId);

        if (!target) return;

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className={cn('relative min-h-screen overflow-hidden', className)} aria-label="Entrée dans l'univers Norel Art">
            <div className="absolute inset-0">
                <Image src={content.image.src} alt={content.image.alt} fill priority className="object-cover object-center" sizes={content.image.sizes} />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(106deg,rgba(3,9,17,0.72)_4%,rgba(3,9,17,0.42)_40%,rgba(3,9,17,0.62)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_16%,rgba(132,16,54,0.22),transparent_48%)]" />
            <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(4,10,18,0.45)_0%,rgba(4,10,18,0)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,rgba(4,10,18,0)_0%,rgba(4,10,18,0.55)_60%,#060C15_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(70%_120%_at_50%_100%,rgba(130,15,56,0.16),transparent_70%)]" />

            <Container className="relative z-10 flex min-h-screen items-end pb-28 pt-32 sm:pt-40 lg:pb-32 lg:pt-48">
                <div className="max-w-2xl pb-4 sm:pb-6">
                    <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-white/58 sm:mb-8">{content.eyebrow}</p>

                    <Heading level={1} className="text-(--text-primary) drop-shadow-[0_12px_34px_rgba(0,0,0,0.44)]">
                        {content.titleLines.map((line) => (
                            <span key={line} className="block">
                                {line}
                            </span>
                        ))}
                    </Heading>

                    <Text variant="muted" className="mt-6 max-w-lg text-base text-white/78 sm:mt-8 sm:text-lg">
                        {content.description}
                    </Text>

                    <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
                        <Button onClick={handleScrollToReveal} className="min-h-12 rounded-full px-7">
                            {content.primaryCtaLabel}
                        </Button>

                        <MarketingSecondaryLink href={content.secondaryCtaHref} className="bg-white/5 px-7">
                            {content.secondaryCtaLabel}
                        </MarketingSecondaryLink>
                    </div>
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
