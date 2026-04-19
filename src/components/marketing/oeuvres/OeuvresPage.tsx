'use client';

import type { Artwork } from '@/domain/artworks/types';
import type { ArtworkCategory } from '@/domain/artworks/categories';
import type { OeuvresPageContent } from '@/domain/oeuvres/types';

import { OeuvresGallerySection } from './OeuvresGallerySection';
import { OeuvresHero } from './OeuvresHero';

interface OeuvresPageProps {
    artworks: Artwork[];
    categories: readonly ArtworkCategory[];
    collections: readonly string[];
    content: OeuvresPageContent;
    initialCategory?: string;
    initialCollection?: string;
    initialType?: string;
}

export function OeuvresPage({ artworks, categories, collections, content, initialCategory, initialCollection, initialType }: OeuvresPageProps) {
    return (
        <>
            <OeuvresHero content={content.hero} />
            <OeuvresGallerySection
                artworks={artworks}
                categories={categories}
                collections={collections}
                content={content}
                initialCategory={initialCategory}
                initialCollection={initialCollection}
                initialType={initialType}
            />
        </>
    );
}
