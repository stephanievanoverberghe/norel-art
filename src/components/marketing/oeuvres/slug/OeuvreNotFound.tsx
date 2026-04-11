import Link from 'next/link';

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
        <section
            aria-label="Œuvre introuvable"
            className={cn(
                // 💥 FULL HEIGHT + CENTER
                'relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-(--bg-primary)',
                className,
            )}
        >
            {/* ambiance */}
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-md -translate-x-1/2 -translate-y-1/2 bg-(--accent)/10 blur-3xl" />

            <Container className="relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">Absence</p>

                    <Heading level={1} className="mt-4 text-white">
                        Ce regard n’est plus là.
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-6 max-w-xl text-white/70">
                        Peut-être a-t-il déjà trouvé sa place.
                        <br />
                        Ou peut-être n’était-il pas destiné à apparaître ici.
                    </Text>

                    <Text variant="muted" className="mx-auto mt-4 max-w-xl text-white/60">
                        D’autres présences attendent.
                    </Text>

                    {/* CTA */}
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link href="/oeuvres" className="block">
                            <Button className="min-h-12 w-full rounded-full px-6 sm:w-auto">Retour à la galerie</Button>
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/3 px-6 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/10 sm:w-auto"
                        >
                            Revenir à l’accueil
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
