import type { ReactNode } from 'react';

import { PageIntro } from '@/components/marketing/PageIntro';
import { Container } from '@/ui/Container';

interface SimpleContentPageProps {
    eyebrow: string;
    title: string;
    description: string;
    children: ReactNode;
}

export function SimpleContentPage({ eyebrow, title, description, children }: SimpleContentPageProps) {
    return (
        <>
            <PageIntro eyebrow={eyebrow} title={title} description={description} />
            <section className="pb-16">
                <Container className="space-y-5 text-sm text-white/75">{children}</Container>
            </section>
        </>
    );
}
