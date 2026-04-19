import Link from 'next/link';

import { MarketingSecondaryLink } from '@/components/marketing/shared/MarketingSecondaryLink';
import type { HomeFinalCtaContent } from '@/domain/home/types';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface HomeFinalCtaSectionProps {
    content: HomeFinalCtaContent;
    className?: string;
}

export function HomeFinalCtaSection({ content, className }: HomeFinalCtaSectionProps) {
    return (
        <section aria-label="Dernier appel à l’action" className={cn('relative overflow-hidden bg-(--bg-primary) py-20 sm:py-24 lg:py-28', className)}>
            <Container className="relative z-10">
                <div className="mx-auto max-w-3xl rounded-4xl border border-white/10 bg-white/3 px-6 py-10 text-center sm:px-8 sm:py-12 lg:px-12 lg:py-14">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">{content.eyebrow}</p>

                    <Heading level={2} className="mt-4 text-white">
                        {content.title}
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-5 max-w-2xl text-white/70">
                        {content.description}
                    </Text>

                    <div className="mt-8 grid gap-3 sm:mx-auto sm:max-w-md sm:grid-cols-2">
                        <Link href={content.primaryCtaHref} className="block">
                            <Button className="min-h-12 w-full rounded-full px-6">{content.primaryCtaLabel}</Button>
                        </Link>

                        <MarketingSecondaryLink href={content.secondaryCtaHref} className="w-full">
                            {content.secondaryCtaLabel}
                        </MarketingSecondaryLink>
                    </div>
                </div>
            </Container>
        </section>
    );
}
