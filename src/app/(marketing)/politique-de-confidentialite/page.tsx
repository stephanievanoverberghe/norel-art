import type { Metadata } from 'next';

import { SimpleContentPage } from '@/components/marketing/SimpleContentPage';
import { legalPages } from '@/content/marketing/pages';

export const metadata: Metadata = {
    title: 'Politique de confidentialité',
    description: 'Politique de confidentialité de Norel Art.',
};

export default function ConfidentialitePage() {
    return (
        <SimpleContentPage eyebrow={legalPages.privacy.eyebrow} title={legalPages.privacy.title} description={legalPages.privacy.description}>
            <p>Les informations transmises via les formulaires sont utilisées uniquement pour répondre aux demandes.</p>
            <p>Les données ne sont pas revendues et sont conservées pendant une durée limitée au suivi client.</p>
            <p>Vous pouvez demander modification ou suppression de vos données via atelier@norel-art.fr.</p>
        </SimpleContentPage>
    );
}
