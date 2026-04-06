import type { Metadata } from 'next';
import { Container } from '@/ui/Container';
import { PageIntro } from '@/components/marketing/PageIntro';

export const metadata: Metadata = {
    title: 'Mentions légales',
    description: 'Informations légales relatives au site Norel Art.',
};

export default function MentionsLegalesPage() {
    return (
        <>
            <PageIntro eyebrow="Légal" title="Mentions légales" description="Informations légales et éditeur du site." />
            <section className="pb-16">
                <Container className="space-y-5 text-sm text-white/75">
                    <p>
                        <strong>Éditeur :</strong> Norel Art · Entreprise individuelle.
                    </p>
                    <p>
                        <strong>Contact :</strong> atelier@norel-art.fr
                    </p>
                    <p>
                        <strong>Hébergement :</strong> Hébergeur à compléter lors de la mise en ligne.
                    </p>
                    <p>
                        <strong>Propriété intellectuelle :</strong> les contenus visuels et textuels du site sont protégés.
                    </p>
                </Container>
            </section>
        </>
    );
}
