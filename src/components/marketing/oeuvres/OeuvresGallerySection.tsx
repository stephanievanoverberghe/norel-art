'use client';

import { useMemo, useState } from 'react';

import { filterArtworks } from '@/application/artworks';
import type { ArtworkCategory } from '@/domain/artworks/categories';
import type { Artwork } from '@/domain/artworks/types';
import type { OeuvresCollectionFilter, OeuvresPageContent, OeuvresCategoryFilter, OeuvresTypeFilter } from '@/domain/oeuvres/types';
import { Container } from '@/ui/Container';

import { OeuvresFiltersPanel } from './OeuvresFiltersPanel';
import { OeuvresGalleryGrid } from './OeuvresGalleryGrid';

interface OeuvresGallerySectionProps {
    artworks: Artwork[];
    categories: readonly ArtworkCategory[];
    collections: readonly string[];
    content: OeuvresPageContent;
    initialCategory?: string;
    initialCollection?: string;
    initialType?: string;
}

function isArtworkCategory(value: string | undefined, categories: readonly ArtworkCategory[]): value is ArtworkCategory {
    return !!value && categories.includes(value as ArtworkCategory);
}

function isArtworkType(value: string | undefined): value is Artwork['type'] {
    return value === 'original' || value === 'print';
}

export function OeuvresGallerySection({ artworks, categories, collections, content, initialCategory, initialCollection, initialType }: OeuvresGallerySectionProps) {
    const [selectedCategory, setSelectedCategory] = useState<OeuvresCategoryFilter>(isArtworkCategory(initialCategory, categories) ? initialCategory : 'all');
    const [selectedCollection, setSelectedCollection] = useState<OeuvresCollectionFilter>(initialCollection && collections.includes(initialCollection) ? initialCollection : 'all');
    const [selectedType, setSelectedType] = useState<OeuvresTypeFilter>(isArtworkType(initialType) ? initialType : 'all');

    const filteredArtworks = useMemo(
        () =>
            filterArtworks(artworks, {
                category: selectedCategory,
                collection: selectedCollection,
                type: selectedType,
            }),
        [artworks, selectedCategory, selectedCollection, selectedType],
    );

    const resetFilters = () => {
        setSelectedCategory('all');
        setSelectedCollection('all');
        setSelectedType('all');
    };

    return (
        <section className="relative bg-(--bg-primary) py-12 sm:py-14 lg:py-16">
            <Container>
                <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[19.5rem_minmax(0,1fr)]">
                    <OeuvresFiltersPanel
                        categories={categories}
                        collections={collections}
                        content={content.filters}
                        selectedCategory={selectedCategory}
                        selectedCollection={selectedCollection}
                        selectedType={selectedType}
                        onCategoryChange={setSelectedCategory}
                        onCollectionChange={setSelectedCollection}
                        onTypeChange={setSelectedType}
                        onReset={resetFilters}
                    />

                    <OeuvresGalleryGrid artworks={filteredArtworks} content={content.grid} />
                </div>
            </Container>
        </section>
    );
}
