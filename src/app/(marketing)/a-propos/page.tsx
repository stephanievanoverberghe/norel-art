import type { Metadata } from 'next';

import { AboutPage } from '@/components/marketing/about/AboutPage';
import { aboutPageContent } from '@/content/about/about-content';

export const metadata: Metadata = {
    title: 'À propos',
    description: 'Le parcours, la vision et la démarche de Norel Art.',
};

export default function AboutRoutePage() {
    return <AboutPage content={aboutPageContent} />;
}
