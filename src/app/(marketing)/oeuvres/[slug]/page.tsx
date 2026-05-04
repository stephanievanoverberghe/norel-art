import type { Metadata } from 'next';

import { OeuvreDetailHero } from '@/components/marketing/oeuvres/slug/OeuvreDetailHero';
import { OeuvreStorySection } from '@/components/marketing/oeuvres/slug/OeuvreStorySection';
import { OeuvreGallerySection } from '@/components/marketing/oeuvres/slug/OeuvreGallerySection';
import { RelatedOeuvresSection } from '@/components/marketing/oeuvres/slug/RelatedOeuvresSection';
import { OeuvreFinalCtaSection } from '@/components/marketing/oeuvres/slug/OeuvreFinalCtaSection';
import { OeuvreNotFound } from '@/components/marketing/oeuvres/slug/OeuvreNotFound';
import { getCurrentSession } from '@/server/auth/session';
import { getPublishedArtworkDetail } from '@/server/catalog/artworks';
import { getFavoriteArtworkIds } from '@/server/favorites/favorites';

interface OeuvrePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: OeuvrePageProps): Promise<Metadata> {
    const { slug } = await params;
    const { artwork } = await getPublishedArtworkDetail(slug);

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
    const session = await getCurrentSession();
    const { artwork, artworks } = await getPublishedArtworkDetail(slug);
    const favoriteArtworkIds = session?.user?.id ? await getFavoriteArtworkIds(session.user.id) : [];

    if (!artwork) {
        return <OeuvreNotFound />;
    }

    return (
        <>
            <OeuvreDetailHero artwork={artwork} isFavorite={favoriteArtworkIds.includes(artwork.id)} />
            <OeuvreStorySection artwork={artwork} />
            <OeuvreGallerySection artwork={artwork} />
            <RelatedOeuvresSection artwork={artwork} artworks={artworks} favoriteArtworkIds={favoriteArtworkIds} />
            <OeuvreFinalCtaSection artwork={artwork} />
        </>
    );
}
