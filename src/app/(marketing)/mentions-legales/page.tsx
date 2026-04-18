import type { Metadata } from 'next';

import { SimpleContentPage } from '@/components/marketing/SimpleContentPage';
import { legalPages } from '@/content/marketing/pages';

export const metadata: Metadata = {
    title: 'Mentions légales',
    description: 'Informations légales relatives au site Norel Art.',
};

export default function MentionsLegalesPage() {
    return (
        <SimpleContentPage eyebrow={legalPages.legalNotice.eyebrow} title={legalPages.legalNotice.title} description={legalPages.legalNotice.description}>
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
        </SimpleContentPage>
    );
}
