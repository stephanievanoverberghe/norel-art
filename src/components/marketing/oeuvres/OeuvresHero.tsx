'use client';

import Image from 'next/image';

import { marketingPageSpacing } from '@/layout/marketing/page-spacing';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface OeuvresHeroProps {
    className?: string;
}

export function OeuvresHero({ className }: OeuvresHeroProps) {
    return (
         <section aria-label="Galerie des œuvres" className={cn(`relative overflow-hidden pb-16 sm:pb-20 lg:pb-24 ${marketingPageSpacing.editorialOffset}`, className)}>
            <div className="absolute inset-0">
                <Image src="/images/oeuvres/oeuvres-hero.jpg" alt="Galerie d'œuvres Norel Art" fill priority sizes="100vw" className="object-cover object-center" />
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(106deg,rgba(3,9,17,0.72)_4%,rgba(3,9,17,0.42)_40%,rgba(3,9,17,0.62)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_16%,rgba(132,16,54,0.22),transparent_48%)]" />
            <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(4,10,18,0.45)_0%,rgba(4,10,18,0)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,rgba(4,10,18,0)_0%,rgba(4,10,18,0.55)_60%,#060C15_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(70%_120%_at_50%_100%,rgba(130,15,56,0.16),transparent_70%)]" />

            <Container className="relative z-10">
                <div className="max-w-2xl">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/50">Galerie</p>

                    <Heading level={1} className="mt-4 text-white">
                        Des présences.
                        <br />À laisser venir.
                    </Heading>

                    <Text variant="muted" className="mt-5 max-w-lg text-white/75 sm:text-lg">
                        Originaux, impressions, fragments. Chaque œuvre ne se comprend pas immédiatement. Elle se laisse approcher.
                    </Text>
                </div>
            </Container>
        </section>
    );
}
