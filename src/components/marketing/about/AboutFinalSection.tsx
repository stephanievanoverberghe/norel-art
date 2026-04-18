import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface AboutFinalSectionProps {
    className?: string;
}

export function AboutFinalSection({ className }: AboutFinalSectionProps) {
    return (
        <section aria-label="Continuer" className={cn('relative overflow-hidden bg-(--bg-primary) py-18 sm:py-24 lg:py-28', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--accent)/10 blur-3xl" />

            <Container className="relative z-10">
                <div className="mx-auto max-w-4xl overflow-hidden rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-6 py-12 text-center sm:px-8 sm:py-14 lg:px-14 lg:py-16">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/36">Continuer</p>

                    <Heading level={2} className="mx-auto mt-4 max-w-[12ch] text-white">
                        Et toi,
                        <br />
                        tu les vois ?
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-6 max-w-2xl text-white/70">
                        Tu peux entrer dans les œuvres.
                        <br />
                        Ou me confier un visage, une histoire, une présence à faire apparaître.
                    </Text>

                    <div className="mt-9 grid gap-3 sm:mx-auto sm:max-w-md sm:grid-cols-2">
                        <Link href="/oeuvres" className="block">
                            <Button className="min-h-12 w-full rounded-full px-6">Voir ce regard</Button>
                        </Link>

                        <Link
                            href="/commandes"
                            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/16 bg-white/4 px-6 text-sm font-medium text-white transition-all duration-300 hover:border-white/24 hover:bg-white/8"
                        >
                            Me confier un visage
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
