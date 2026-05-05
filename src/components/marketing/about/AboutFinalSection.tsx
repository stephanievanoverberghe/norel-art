import Link from 'next/link';

import type { AboutFinalCtaContent } from '@/domain/about/types';
import { MarketingSecondaryLink } from '@/components/marketing/shared/MarketingSecondaryLink';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

import { SplitLines } from './shared/SplitLines';
import { aboutSectionStyles } from './shared/about-styles';

interface AboutFinalSectionProps {
    content: AboutFinalCtaContent;
    className?: string;
}

export function AboutFinalSection({ content, className }: AboutFinalSectionProps) {
    return (
        <section aria-label="Continuer" className={cn(aboutSectionStyles.section, aboutSectionStyles.pageBackground, className)}>
            <Container className="relative z-10">
                <div className="mx-auto max-w-4xl overflow-hidden rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-6 py-12 text-center sm:px-8 sm:py-14 lg:px-14 lg:py-16">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/36">{content.eyebrow}</p>

                    <Heading level={2} className="mx-auto mt-4 max-w-[12ch] text-white">
                        <SplitLines lines={content.heading.lines} />
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-6 max-w-2xl text-white/70">
                        <SplitLines lines={content.bodyLines} />
                    </Text>

                    <div className="mt-9 grid gap-3 sm:mx-auto sm:max-w-md sm:grid-cols-2">
                        <Link href={content.primaryAction.href} className="block">
                            <Button className="min-h-12 w-full rounded-full px-6">{content.primaryAction.label}</Button>
                        </Link>

                        <MarketingSecondaryLink href={content.secondaryAction.href} className="w-full border-white/16 bg-white/4 hover:border-white/24 hover:bg-white/8">
                            {content.secondaryAction.label}
                        </MarketingSecondaryLink>
                    </div>
                </div>
            </Container>
        </section>
    );
}
