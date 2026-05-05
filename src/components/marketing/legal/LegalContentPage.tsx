import { MarketingPageIntro } from '@/components/marketing/shared/MarketingPageIntro';
import type { LegalPageContent } from '@/domain/legal/types';
import { Container } from '@/ui/Container';

interface LegalContentPageProps {
    content: LegalPageContent;
}

export function LegalContentPage({ content }: LegalContentPageProps) {
    return (
        <>
            <MarketingPageIntro eyebrow={content.intro.eyebrow} title={content.intro.title} description={content.intro.description} />
            <section className="relative bg-(--bg-primary) pb-16 sm:pb-20 lg:pb-24">
                <Container>
                    <div className="mx-auto max-w-4xl rounded-md border border-white/10 bg-[#08131f]/78 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-7">
                        <div className="space-y-5 text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
                            {content.paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
