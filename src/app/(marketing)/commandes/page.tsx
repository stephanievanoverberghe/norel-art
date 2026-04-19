import type { Metadata } from 'next';

import { CommandesPage } from '@/components/marketing/commandes/CommandesPage';
import { commandesContent } from '@/content/commandes/commandes-content';

export const metadata: Metadata = {
    title: 'Commandes',
    description: 'Confier un visage, une histoire, une présence à faire apparaître.',
};

export default function CommandeRoutePage() {
    return <CommandesPage content={commandesContent} />;
}
