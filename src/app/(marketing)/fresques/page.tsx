import type { Metadata } from 'next';

import { FresquesPage } from '@/components/marketing/fresques/FresquesPage';
import { fresquesContent } from '@/content/fresques/fresques-content';

export const metadata: Metadata = {
    title: 'Fresques',
    description: 'Faire entrer une présence dans un lieu, avec une fresque sensible et sur mesure.',
};

export default function FresquesRoutePage() {
    return <FresquesPage content={fresquesContent} />;
}
