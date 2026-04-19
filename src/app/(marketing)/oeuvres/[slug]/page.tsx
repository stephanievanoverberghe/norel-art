import type { Metadata } from 'next';

import { artworks } from '@/domain/artworks/data';
import { OeuvreDetailHero } from '@/components/marketing/oeuvres/slug/OeuvreDetailHero';
import { OeuvreStorySection } from '@/components/marketing/oeuvres/slug/OeuvreStorySection';
import { OeuvreGallerySection } from '@/components/marketing/oeuvres/slug/OeuvreGallerySection';
import { RelatedOeuvresSection } from '@/components/marketing/oeuvres/slug/RelatedOeuvresSection';
import { OeuvreFinalCtaSection } from '@/components/marketing/oeuvres/slug/OeuvreFinalCtaSection';
import { OeuvreNotFound } from '@/components/marketing/oeuvres/slug/OeuvreNotFound';

interface OeuvrePageProps {
    params: Promise<{
        slug: string;
    }>;
}

function getArtworkBySlug(slug: string) {
    return artworks.find((artwork) => artwork.slug === slug);
}

export async function generateMetadata({ params }: OeuvrePageProps): Promise<Metadata> {
    const { slug } = await params;
    const artwork = getArtworkBySlug(slug);

    if (!artwork) {
        return {
            title: 'Œuvre introuvable',
        };
    }

    return {
        title: `${artwork.title} | Norel Art`,
        description: artwork.excerpt,
    };
}

export default async function OeuvreSlugRoutePage({ params }: OeuvrePageProps) {
    const { slug } = await params;
    const artwork = getArtworkBySlug(slug);

    if (!artwork) {
        return <OeuvreNotFound />;
    }

    return (
        <>
            <OeuvreDetailHero artwork={artwork} />
            <OeuvreStorySection artwork={artwork} />
            <OeuvreGallerySection artwork={artwork} />
            <RelatedOeuvresSection artwork={artwork} artworks={artworks} />
            <OeuvreFinalCtaSection artwork={artwork} />
        </>
    );
}

export function generateStaticParams() {
    return artworks.map((artwork) => ({
        slug: artwork.slug,
    }));
}
