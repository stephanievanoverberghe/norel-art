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
            <AboutHero content={content.hero} className="marketing-bg-intro" />
            <AboutJourneySection content={content.journey} className="marketing-bg-ash" />
            <AboutVisionSection content={content.vision} className="marketing-bg-slate" />
            <AboutFinalSection content={content.finalCta} className="marketing-bg-signature" />
        </>
    );
}
