import type { Metadata } from 'next';

import { AboutFinalSection } from '@/components/marketing/about/AboutFinalSection';
import { AboutHero } from '@/components/marketing/about/AboutHero';
import { AboutJourneySection } from '@/components/marketing/about/AboutJourneySection';
import { AboutVisionSection } from '@/components/marketing/about//AboutVisionSection';

export const metadata: Metadata = {
    title: 'À propos',
    description: 'Le parcours, la vision et la démarche de Norel Art.',
};

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <AboutJourneySection />
            <AboutVisionSection />
            <AboutFinalSection />
        </>
    );
}
