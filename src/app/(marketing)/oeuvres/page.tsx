import type { Metadata } from 'next';
import { filterArtworks } from '@/application/artworks';
import { ArtworkFilters } from '@/components/marketing/ArtworkFilters';
import { ArtworkGrid } from '@/components/marketing/ArtworkGrid';
import { PageIntro } from '@/components/marketing/PageIntro';

interface OeuvresPageProps {
    searchParams: Promise<{ category?: string; type?: 'original' | 'print' }>;
}

export const metadata: Metadata = {
    title: 'Œuvres',
    description: 'Découvrez les œuvres originales et impressions signées de Norel Art.',
};

export default async function OeuvresPage({ searchParams }: OeuvresPageProps) {
    const params = await searchParams;
    const artworks = filterArtworks({ category: params.category, type: params.type });

    return (
        <>
            <PageIntro
                eyebrow="Exploration"
                title="Œuvres originales et impressions"
                description="Parcourez les pièces disponibles, filtrez par univers et laissez une œuvre vous choisir."
            />
            <ArtworkFilters selectedCategory={params.category} selectedType={params.type} />
            <section className="py-10">
                <ArtworkGrid artworks={artworks} />
            </section>
        </>
    );
}
