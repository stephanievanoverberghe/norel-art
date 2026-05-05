import { marketingPageSpacing } from '@/layout/marketing/page-spacing';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface MarketingPageIntroProps {
    eyebrow: string;
    title: string;
    description: string;
    withHeaderOffset?: boolean;
}

export function MarketingPageIntro({ eyebrow, title, description, withHeaderOffset = true }: MarketingPageIntroProps) {
    return (
        <section className={cn('marketing-section marketing-bg-intro py-12 sm:py-16', withHeaderOffset && marketingPageSpacing.editorialOffset)}>
            <Container className="relative z-10">
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">{eyebrow}</p>
                <Heading level={2} className="mt-4">
                    {title}
                </Heading>
                <Text className="mt-5 max-w-3xl text-white/75">{description}</Text>
            </Container>
        </section>
    );
}
