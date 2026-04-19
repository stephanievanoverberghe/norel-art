import type { HomePageProps } from '@/domain/home/types';

import { HomeCategoriesSection } from './HomeCategoriesSection';
import { HomeCustomPathsSection } from './HomeCustomPathsSection';
import { HomeFeaturedRevealSection } from './HomeFeaturedRevealSection';
import { HomeFinalCtaSection } from './HomeFinalCtaSection';
import { HomeHero } from './/HomeHero';
import { HomeTestimonialsSection } from './HomeTestimonialsSection';
import { HomeUniverseSection } from './HomeUniverseSection';

export function HomePage({ content, revealArtworks }: HomePageProps) {
    return (
        <>
            <HomeHero content={content.hero} />
            <HomeFeaturedRevealSection content={content.featuredReveal} artworks={revealArtworks} />
            <HomeCategoriesSection content={content.categories} />
            <HomeUniverseSection content={content.universe} />
            <HomeCustomPathsSection content={content.customPaths} />
            <HomeTestimonialsSection content={content.testimonials} />
            <HomeFinalCtaSection content={content.finalCta} />
        </>
    );
}
