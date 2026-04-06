import type { Metadata } from 'next';
import { ContactForm } from '@/components/marketing/ContactForm';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Container } from '@/ui/Container';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Contactez Norel Art pour un achat, une commande personnalisée ou un projet de fresque.',
};

export default function ContactPage() {
    return (
        <>
            <PageIntro
                eyebrow="Contact"
                title="Parlons de votre projet artistique"
                description="Achat d’œuvre, demande de commande, projet mural ou simple question : chaque message reçoit une réponse personnalisée."
            />
            <section className="pb-16">
                <Container className="max-w-3xl">
                    <ContactForm />
                </Container>
            </section>
        </>
    );
}
