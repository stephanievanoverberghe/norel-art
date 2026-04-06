import type { Metadata } from 'next';
import { Container } from '@/ui/Container';
import { PageIntro } from '@/components/marketing/PageIntro';

export const metadata: Metadata = {
    title: 'Politique de confidentialité',
    description: 'Politique de confidentialité de Norel Art.',
};

export default function ConfidentialitePage() {
    return (
        <>
            <PageIntro eyebrow="Légal" title="Politique de confidentialité" description="Traitement des données personnelles collectées via les formulaires du site." />
            <section className="pb-16">
                <Container className="space-y-5 text-sm text-white/75">
                    <p>Les informations transmises via les formulaires sont utilisées uniquement pour répondre aux demandes.</p>
                    <p>Les données ne sont pas revendues et sont conservées pendant une durée limitée au suivi client.</p>
                    <p>Vous pouvez demander modification ou suppression de vos données via atelier@norel-art.fr.</p>
                </Container>
            </section>
        </>
    );
}
