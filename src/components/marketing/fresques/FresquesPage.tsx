import { ContactForm } from '@/components/marketing/ContactForm';
import { MarketingPageIntro } from '@/components/marketing/shared/MarketingPageIntro';
import type { FresquesPageContent } from '@/domain/fresques/types';
import { Container } from '@/ui/Container';

interface FresquesPageProps {
    content: FresquesPageContent;
}

export function FresquesPage({ content }: FresquesPageProps) {
    return (
        <>
            <MarketingPageIntro eyebrow={content.intro.eyebrow} title={content.intro.title} description={content.intro.description} />
            <section className="pb-16">
                <Container className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-4 text-sm text-white/75">
                        {content.asideParagraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                    <ContactForm content={content.form} />
                </Container>
            </section>
        </>
    );
}
