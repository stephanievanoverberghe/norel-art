import { getHomeRevealArtworks } from '@/application/artworks';
import { CategoriesSection } from '@/components/marketing/home/CategoriesSection';
import { CustomPathsSection } from '@/components/marketing/home/CustomPathsSection';
import { FeaturedReveal } from '@/components/marketing/home/FeaturedReveal';
import { FinalCtaSection } from '@/components/marketing/home/FinalCtaSection';
import { Hero } from '@/components/marketing/home/Hero';
import { TestimonialsSection } from '@/components/marketing/home/TestimonialsSection';
import { UniverseSection } from '@/components/marketing/home/UniverseSection';

export default function HomePage() {
    const revealArtworks = getHomeRevealArtworks();

    return (
        <>
            <Hero />
            <FeaturedReveal artworks={revealArtworks} />
            <CategoriesSection />
            <UniverseSection />
            <CustomPathsSection />
            <TestimonialsSection />
            <FinalCtaSection />
        </>
    );
}
