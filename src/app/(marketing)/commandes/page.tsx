import type { Metadata } from 'next';
import { ContactForm } from '@/components/marketing/ContactForm';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Container } from '@/ui/Container';

export const metadata: Metadata = {
    title: 'Commandes sur mesure',
    description: 'Demandez une œuvre personnalisée pensée pour votre histoire et votre espace.',
};

export default function CommandesPage() {
    return (
        <>
            <PageIntro
                eyebrow="Projection"
                title="Confier une œuvre sur mesure"
                description="Portrait, composition abstraite ou pièce dédiée à un lieu : la commande est pensée comme un dialogue."
            />
            <section className="pb-16">
                <Container className="grid gap-8 lg:grid-cols-2">
                    <ol className="space-y-4 text-sm text-white/75">
                        <li>
                            <strong>1. Intention :</strong> échange initial sur l’univers, les contraintes et le format.
                        </li>
                        <li>
                            <strong>2. Direction :</strong> proposition artistique, palette et budget estimatif.
                        </li>
                        <li>
                            <strong>3. Création :</strong> réalisation, ajustements légers et validation finale.
                        </li>
                    </ol>
                    <ContactForm />
                </Container>
            </section>
        </>
    );
}
