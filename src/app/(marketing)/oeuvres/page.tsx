import type { Metadata } from 'next';

import { OeuvresPage } from '@/components/marketing/oeuvres/OeuvresPage';
import { oeuvresContent } from '@/content/oeuvres/oeuvres-content';
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
        <OeuvresPage
            artworks={artworks}
            categories={artworkCategories}
            collections={artworkCollections}
            content={oeuvresContent}
            initialCategory={params.category}
            initialCollection={params.collection}
            initialType={params.type}
        />
    );
}
