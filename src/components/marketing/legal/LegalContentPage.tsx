import { MarketingPageIntro } from '@/components/marketing/shared//MarketingPageIntro';
import type { LegalPageContent } from '@/domain/legal/types';
import { Container } from '@/ui/Container';

interface LegalContentPageProps {
    content: LegalPageContent;
}

export function LegalContentPage({ content }: LegalContentPageProps) {
    return (
        <>
            <MarketingPageIntro eyebrow={content.intro.eyebrow} title={content.intro.title} description={content.intro.description} />
            <section className="pb-16">
                <Container className="space-y-5 text-sm text-white/75">
                    {content.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </Container>
            </section>
        </>
    );
}
