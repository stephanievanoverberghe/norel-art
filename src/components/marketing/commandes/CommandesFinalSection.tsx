import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import type { CommandesFinalContent } from '@/domain/commandes/types';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface CommandesFinalSectionProps {
    content: CommandesFinalContent;
    className?: string;
}

export function CommandesFinalSection({ content, className }: CommandesFinalSectionProps) {
    return (
        <section aria-label="Continuer" className={cn('relative overflow-hidden bg-(--bg-primary) py-16 sm:py-20 lg:py-24', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-104 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--accent)/10 blur-3xl" />

            <Container className="relative z-10">
                <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-white/10 bg-white/4 px-6 py-10 text-center sm:px-8 sm:py-12 lg:px-12">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/38">Continuer</p>

                    <Heading level={2} className="mx-auto mt-4 max-w-[12ch] whitespace-pre-line text-white">
                        {content.title}
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-5 max-w-2xl text-white/70">
                        {content.text}
                    </Text>

                    <div className="mt-8">
                        <Link href={content.href} className="inline-flex">
                            <Button className="min-h-12 rounded-full px-6">{content.cta}</Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
