import type { Metadata } from 'next';

import { FresquesPage } from '@/components/marketing/fresques/FresquesPage';
import { fresquesPageContent } from '@/content/fresques/fresques-content';

export const metadata: Metadata = {
    title: 'Fresques murales',
    description: 'Concevez une fresque murale artistique pour transformer un espace professionnel ou privé.',
};

export default function FresquesRoutePage() {
    return <FresquesPage content={fresquesPageContent} />;
}
