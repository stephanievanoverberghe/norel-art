import type { ReactNode } from 'react';

import { ContactForm } from '@/components/marketing/ContactForm';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Container } from '@/ui/Container';

interface LeadCapturePageProps {
    eyebrow: string;
    title: string;
    description: string;
    aside: ReactNode;
}

export function LeadCapturePage({ eyebrow, title, description, aside }: LeadCapturePageProps) {
    return (
        <>
            <PageIntro eyebrow={eyebrow} title={title} description={description} />
            <section className="pb-16">
                <Container className="grid gap-8 lg:grid-cols-2">
                    {aside}
                    <ContactForm />
                </Container>
            </section>
        </>
    );
}
