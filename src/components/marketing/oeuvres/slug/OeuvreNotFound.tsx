import Link from 'next/link';

import { MarketingSecondaryLink } from '@/components/marketing/shared/MarketingSecondaryLink';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface OeuvreNotFoundProps {
    className?: string;
}

export function OeuvreNotFound({ className }: OeuvreNotFoundProps) {
    return (
        <section aria-label="Œuvre introuvable" className={cn('marketing-section marketing-bg-ash flex min-h-[calc(100vh-80px)] items-center justify-center', className)}>
            <Container className="relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">Œuvre introuvable</p>

                    <Heading level={1} className="mt-4 text-white">
                        Cette œuvre n’est pas disponible ici.
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-6 max-w-xl text-white/70">
                        Le lien est peut-être ancien, ou la fiche a été retirée de la galerie.
                    </Text>

                    <Text variant="muted" className="mx-auto mt-4 max-w-xl text-white/60">
                        Vous pouvez revenir aux œuvres disponibles.
                    </Text>

                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link href="/oeuvres" className="block">
                            <Button className="min-h-12 w-full rounded-full px-6 sm:w-auto">Retour à la galerie</Button>
                        </Link>

                        <MarketingSecondaryLink href="/" className="sm:w-auto">
                            Revenir à l’accueil
                        </MarketingSecondaryLink>
                    </div>
                </div>
            </Container>
        </section>
    );
}
