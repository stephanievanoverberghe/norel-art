import type { Metadata } from 'next';
import { LeadCapturePage } from '@/components/marketing/LeadCapturePage';
import { leadCapturePages } from '@/content/marketing/pages';

export const metadata: Metadata = {
    title: 'Commandes sur mesure',
    description: 'Demandez une œuvre personnalisée pensée pour votre histoire et votre espace.',
};

export default function CommandesPage() {
    return (
        <LeadCapturePage
            eyebrow={leadCapturePages.commandes.eyebrow}
            title={leadCapturePages.commandes.title}
            description={leadCapturePages.commandes.description}
            aside={
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
            }
        />
    );
}
