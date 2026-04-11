import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface SectionIntroProps {
    eyebrow: string;
    title: ReactNode;
    description?: ReactNode;
    centered?: boolean;
    className?: string;
}

export function SectionIntro({ eyebrow, title, description, centered = false, className }: SectionIntroProps) {
    return (
        <div className={cn('max-w-2xl', centered && 'mx-auto text-center', className)}>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">{eyebrow}</p>

            <Heading level={2} className="mt-4 text-white">
                {title}
            </Heading>

            {description ? (
                <Text variant="muted" className={cn('mt-5 text-white/70', centered && 'mx-auto max-w-xl')}>
                    {description}
                </Text>
            ) : null}
        </div>
    );
}
