import type { Metadata } from 'next';

import { OeuvresPage } from '@/components/marketing/oeuvres/OeuvresPage';
import { oeuvresContent } from '@/content/oeuvres/oeuvres-content';
import { getPublishedArtworkCatalog } from '@/server/catalog/artworks';

export const metadata: Metadata = {
    title: 'Œuvres',
    description: 'Explorez la galerie Norel Art entre portraits, matières et mouvements.',
};

export const dynamic = 'force-dynamic';

interface OeuvresPageProps {
    searchParams: Promise<{
        category?: string;
        collection?: string;
        type?: string;
    }>;
}

export default async function OeuvresRoutePage({ searchParams }: OeuvresPageProps) {
    const params = await searchParams;
    const catalog = await getPublishedArtworkCatalog();

    return (
        <OeuvresPage
            artworks={catalog.artworks}
            categories={catalog.categories}
            collections={catalog.collections}
            content={oeuvresContent}
            initialCategory={params.category}
            initialCollection={params.collection}
            initialType={params.type}
        />
    );
}
