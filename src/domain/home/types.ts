import type { Artwork } from '@/domain/artworks/types';

export interface HomeHeroContent {
    eyebrow: string;
    titleLines: string[];
    description: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    scrollTargetId: string;
    image: {
        src: string;
        alt: string;
        sizes: string;
    };
}

export interface HomeCategorySectionContent {
    eyebrow: string;
    title: string;
    description: string;
    cardCtaLabel: string;
}

export interface HomeFeaturedRevealContent {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    footerNote: string;
}

export interface UniverseContent {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    ctaLabel: string;
    ctaHref: string;
    image: {
        src: string;
        alt: string;
        sizes: string;
    };
}

export interface CustomPathItem {
    title: string;
    eyebrow: string;
    description: string;
    href: string;
    image: string;
    alt: string;
}

export interface CustomPathsContent {
    intro: {
        eyebrow: string;
        title: string;
        description: string;
    };
    items: CustomPathItem[];
}

export interface TestimonialItem {
    quote: string;
    name: string;
    context: string;
}

export interface TestimonialsContent {
    intro: {
        eyebrow: string;
        title: string;
        description: string;
    };
    items: TestimonialItem[];
}

export interface HomeFinalCtaContent {
    eyebrow: string;
    title: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
}

export interface HomePageContent {
    hero: HomeHeroContent;
    featuredReveal: HomeFeaturedRevealContent;
    categories: HomeCategorySectionContent;
    universe: UniverseContent;
    customPaths: CustomPathsContent;
    testimonials: TestimonialsContent;
    finalCta: HomeFinalCtaContent;
}

export interface HomePageProps {
    content: HomePageContent;
    revealArtworks: Artwork[];
}
