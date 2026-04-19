import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';

interface FresquesSectionProps {
    id?: string;
    children: ReactNode;
    className?: string;
}

export function FresquesSection({ id, children, className }: FresquesSectionProps) {
    return (
        <section id={id} className={cn('relative overflow-hidden bg-(--bg-primary) py-18 sm:py-24 lg:py-28', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-16 h-28 w-[24rem] -translate-x-1/2 rounded-full bg-(--accent)/8 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-16 top-28 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-white/4 blur-3xl" />

            <Container className="relative z-10">{children}</Container>
        </section>
    );
}
