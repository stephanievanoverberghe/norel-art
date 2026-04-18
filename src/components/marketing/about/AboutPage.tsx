import type { AboutPageContent } from '@/domain/about/types';

import { AboutFinalSection } from './AboutFinalSection';
import { AboutHero } from './AboutHero';
import { AboutJourneySection } from './AboutJourneySection';
import { AboutVisionSection } from './AboutVisionSection';

interface AboutPageProps {
    content: AboutPageContent;
}

export function AboutPage({ content }: AboutPageProps) {
    return (
        <>
            <AboutHero content={content.hero} />
            <AboutJourneySection content={content.journey} />
            <AboutVisionSection content={content.vision} />
            <AboutFinalSection content={content.finalCta} />
        </>
    );
}
