import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface FinalCtaSectionProps {
    className?: string;
}

export function FinalCtaSection({ className }: FinalCtaSectionProps) {
    return (
        <section aria-label="Dernier appel à l’action" className={cn('relative overflow-hidden bg-(--bg-primary) py-20 sm:py-24 lg:py-28', className)}>
            <Container className="relative z-10">
                <div className="mx-auto max-w-3xl rounded-4xl border border-white/10 bg-white/3 px-6 py-10 text-center sm:px-8 sm:py-12 lg:px-12 lg:py-14">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">Continuer</p>

                    <Heading level={2} className="mt-4 text-white">
                        Peut-être qu’un regard est resté.
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-5 max-w-2xl text-white/70">
                        Tu peux continuer l’exploration, accueillir une œuvre, ou simplement écrire. Le plus important est peut-être déjà là : quelque chose a bougé.
                    </Text>

                    <div className="mt-8 grid gap-3 sm:mx-auto sm:max-w-md sm:grid-cols-2">
                        <Link href="/oeuvres" className="block">
                            <Button className="min-h-12 w-full rounded-full px-6">Voir les œuvres</Button>
                        </Link>

                        <Link
                            href="/contact"
                            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/3 px-6 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/10"
                        >
                            M’écrire un mot
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
