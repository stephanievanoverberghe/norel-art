import Link from 'next/link';

import type { Artwork } from '@/domain/artworks/types';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface OeuvreStorySectionProps {
    artwork: Artwork;
    className?: string;
}

export function OeuvreStorySection({ artwork, className }: OeuvreStorySectionProps) {
    return (
        <section aria-label={`Histoire de l’œuvre ${artwork.title}`} className={cn('marketing-section marketing-bg-atelier py-16 sm:py-20 lg:py-24', className)}>
            <Container className="relative z-10">
                <div className="mx-auto max-w-3xl">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">Détails de l’œuvre</p>

                    <Heading level={2} className="mt-4 text-white">
                        {artwork.title}
                    </Heading>

                    <div className="mt-6 space-y-4">
                        <Text variant="muted" className="text-white/74">
                            {artwork.story}
                        </Text>

                        <Text variant="muted" className="text-white/68">
                            {artwork.technique} sur {artwork.support.toLowerCase()}.
                            <br />
                            Format {artwork.dimensions}.
                        </Text>
                    </div>

                    <div className="mt-8 h-px w-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0)_100%)]" />

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link href="/contact" className="inline-flex text-sm text-white/74 transition-colors duration-300 hover:text-white">
                            Écrire à propos de cette œuvre
                        </Link>

                        <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

                        <Link href="/oeuvres" className="inline-flex text-sm text-white/52 transition-colors duration-300 hover:text-white/74">
                            Revenir aux autres œuvres
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
