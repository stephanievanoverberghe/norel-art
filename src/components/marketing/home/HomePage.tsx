import type { HomePageProps } from '@/domain/home/types';

import { HomeCategoriesSection } from './HomeCategoriesSection';
import { HomeCollectorExperienceSection } from './HomeCollectorExperienceSection';
import { HomeCustomPathsSection } from './HomeCustomPathsSection';
import { HomeFeaturedRevealSection } from './HomeFeaturedRevealSection';
import { HomeFinalCtaSection } from './HomeFinalCtaSection';
import { HomeHero } from './HomeHero';
import { HomeTestimonialsSection } from './HomeTestimonialsSection';
import { HomeUniverseSection } from './HomeUniverseSection';

export function HomePage({ content, revealArtworks }: HomePageProps) {
    const availableArtworks = revealArtworks.filter((artwork) => artwork.availability === 'available');
    const storefrontArtworks = availableArtworks.length >= 3 ? availableArtworks : revealArtworks;

    return (
        <>
            <HomeHero content={content.hero} featuredArtworks={storefrontArtworks.slice(0, 3)} artworkCount={availableArtworks.length || revealArtworks.length} />
            <HomeFeaturedRevealSection content={content.featuredReveal} artworks={storefrontArtworks} />
            <HomeCollectorExperienceSection />
            <HomeCategoriesSection content={content.categories} />
            <HomeUniverseSection content={content.universe} />
            <HomeCustomPathsSection content={content.customPaths} />
            <HomeTestimonialsSection content={content.testimonials} />
            <HomeFinalCtaSection content={content.finalCta} />
        </>
    );
}
