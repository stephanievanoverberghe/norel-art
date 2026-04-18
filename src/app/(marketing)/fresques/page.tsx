import type { Metadata } from 'next';

import { LeadCapturePage } from '@/components/marketing/LeadCapturePage';
import { leadCapturePages } from '@/content/marketing/pages';

export const metadata: Metadata = {
    title: 'Fresques murales',
    description: 'Concevez une fresque murale artistique pour transformer un espace professionnel ou privé.',
};

export default function FresquesPage() {
    return (
        <LeadCapturePage
            eyebrow={leadCapturePages.fresques.eyebrow}
            title={leadCapturePages.fresques.title}
            description={leadCapturePages.fresques.description}
            aside={
                <div className="space-y-4 text-sm text-white/75">
                    <p>Analyse du lieu, direction artistique, maquette et réalisation sur site. Chaque étape reste claire et rapide côté client.</p>
                    <p>Le style peut aller d’une présence abstraite organique à une narration plus figurative selon l’ambiance recherchée.</p>
                </div>
            }
        />
    );
}
