import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';

interface FresquesSectionProps {
    id?: string;
    children: ReactNode;
    className?: string;
}

const backgroundById: Record<string, string> = {
    formulaire: 'marketing-bg-ember',
    fragments: 'marketing-bg-ash',
    intentions: 'marketing-bg-gallery',
    processus: 'marketing-bg-atelier',
    reperes: 'marketing-bg-vellum',
};

export function FresquesSection({ id, children, className }: FresquesSectionProps) {
    const backgroundClassName = id ? (backgroundById[id] ?? 'marketing-bg-gallery') : 'marketing-bg-gallery';

    return (
        <section id={id} className={cn('marketing-section py-18 sm:py-24 lg:py-28', backgroundClassName, className)}>
            <Container className="relative z-10">{children}</Container>
        </section>
    );
}
