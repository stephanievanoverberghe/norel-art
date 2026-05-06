import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';

interface CommandesSectionProps {
    id?: string;
    children: ReactNode;
    className?: string;
}

const backgroundById: Record<string, string> = {
    fragments: 'marketing-bg-ash',
    formulaire: 'marketing-bg-ember',
    possibles: 'marketing-bg-gallery',
    processus: 'marketing-bg-atelier',
    reperes: 'marketing-bg-slate',
};

export function CommandesSection({ id, children, className }: CommandesSectionProps) {
    const backgroundClassName = id ? (backgroundById[id] ?? 'marketing-bg-gallery') : 'marketing-bg-gallery';

    return (
        <section id={id} className={cn('marketing-section py-18 sm:py-24 lg:py-28', backgroundClassName, className)}>
            <Container className="relative z-10">{children}</Container>
        </section>
    );
}
