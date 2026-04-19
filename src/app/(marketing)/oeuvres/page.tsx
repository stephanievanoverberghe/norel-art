import type { Metadata } from 'next';

import { OeuvresHero } from '@/components/marketing/oeuvres/OeuvresHero';
import { OeuvresLayout } from '@/components/marketing/oeuvres/OeuvresLayout';
import { artworks, artworkCategories, artworkCollections } from '@/domain/artworks/data';

export const metadata: Metadata = {
    title: 'Œuvres',
    description: 'Explorez la galerie Norel Art entre portraits, matières et mouvements.',
};

interface OeuvresPageProps {
    searchParams: Promise<{
        category?: string;
        collection?: string;
        type?: string;
    }>;
}

export default async function OeuvresRoutePage({ searchParams }: OeuvresPageProps) {
    const params = await searchParams;

    return (
        <>
            <OeuvresHero />
            <OeuvresLayout
                artworks={artworks}
                categories={artworkCategories}
                collections={artworkCollections}
                initialCategory={params.category}
                initialCollection={params.collection}
                initialType={params.type}
            />
        </>
    );
}
