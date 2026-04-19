import { ContactForm } from '@/components/marketing/ContactForm';
import { MarketingPageIntro } from '@/components/marketing/shared/MarketingPageIntro';
import type { ContactPageContent } from '@/domain/contact/types';
import { Container } from '@/ui/Container';

interface ContactPageProps {
    content: ContactPageContent;
}

export function ContactPage({ content }: ContactPageProps) {
    return (
        <>
            <MarketingPageIntro eyebrow={content.intro.eyebrow} title={content.intro.title} description={content.intro.description} />
            <section className="pb-16">
                <Container className="grid gap-8 lg:grid-cols-2">
                    <div className="hidden lg:block" aria-hidden="true" />
                    <ContactForm content={content.form} />
                </Container>
            </section>
        </>
    );
}
