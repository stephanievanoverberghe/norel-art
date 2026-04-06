import type { Metadata } from 'next';
import { ContactForm } from '@/components/marketing/ContactForm';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Container } from '@/ui/Container';

export const metadata: Metadata = {
    title: 'Fresques murales',
    description: 'Concevez une fresque murale artistique pour transformer un espace professionnel ou privé.',
};

export default function FresquesPage() {
    return (
        <>
            <PageIntro
                eyebrow="Décision"
                title="Créer une fresque qui donne une identité forte à un lieu"
                description="Pour hôtels, restaurants, bureaux, commerces ou espaces privés : chaque projet de fresque est conçu sur mesure."
            />
            <section className="pb-16">
                <Container className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-4 text-sm text-white/75">
                        <p>Analyse du lieu, direction artistique, maquette et réalisation sur site. Chaque étape reste claire et rapide côté client.</p>
                        <p>Le style peut aller d’une présence abstraite organique à une narration plus figurative selon l’ambiance recherchée.</p>
                    </div>
                    <ContactForm />
                </Container>
            </section>
        </>
    );
}
