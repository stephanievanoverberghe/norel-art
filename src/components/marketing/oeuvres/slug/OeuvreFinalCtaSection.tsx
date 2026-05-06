import Link from 'next/link';

import { MarketingSecondaryLink } from '@/components/marketing/shared/MarketingSecondaryLink';
import { getAvailabilityLabel } from '@/domain/artworks/presentation';
import type { Artwork } from '@/domain/artworks/types';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface OeuvreFinalCtaSectionProps {
    artwork: Artwork;
    className?: string;
}

export function OeuvreFinalCtaSection({ artwork, className }: OeuvreFinalCtaSectionProps) {
    const isAvailable = artwork.availability === 'available';

    return (
        <section aria-label="Action sur l’œuvre" className={cn('marketing-section marketing-bg-signature py-16 sm:py-20 lg:py-24', className)}>
            <Container className="relative z-10">
                <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-white/10 bg-white/3 px-6 py-10 text-center sm:px-8 sm:py-12 lg:px-12">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">Disponibilité</p>

                    <Heading level={2} className="mt-4 text-white">
                        {isAvailable ? 'Cette œuvre est disponible.' : 'Cette œuvre n’est plus disponible.'}
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-5 max-w-2xl text-white/70">
                        <span className="text-white/86">{artwork.title}</span> est actuellement {getAvailabilityLabel(artwork.availability).toLowerCase()}.
                        <br />
                        Vous pouvez contacter l’atelier à propos de cette pièce, ou demander une commande dans le même esprit.
                    </Text>

                    <div className="mt-8 grid gap-3 sm:mx-auto sm:max-w-md sm:grid-cols-2">
                        <Link href="/contact" className="block">
                            <Button className="min-h-12 w-full rounded-full px-6">{isAvailable ? 'Contacter pour cette œuvre' : 'Demander une pièce proche'}</Button>
                        </Link>

                        <MarketingSecondaryLink href="/commandes" className="w-full">
                            Commander un portrait
                        </MarketingSecondaryLink>
                    </div>
                </div>
            </Container>
        </section>
    );
}
