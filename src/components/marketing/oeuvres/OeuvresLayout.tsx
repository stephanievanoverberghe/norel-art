'use client';

import { useMemo, useState } from 'react';

import type { Artwork } from '@/domain/artworks/types';
import type { ArtworkType } from '@/domain/artworks/types';
import type { ArtworkCategory } from '@/domain/artworks/categories';
import { Container } from '@/ui/Container';

import { OeuvresFiltersAside } from './OeuvresFiltersAside';
import { OeuvresGrid } from './OeuvresGrid';

interface OeuvresLayoutProps {
    artworks: Artwork[];
    categories: readonly ArtworkCategory[];
    collections: readonly string[];
}

type CategoryFilterValue = ArtworkCategory | 'all';
type CollectionFilterValue = string | 'all';
type TypeFilterValue = ArtworkType | 'all';

export function OeuvresLayout({ artworks, categories, collections }: OeuvresLayoutProps) {
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilterValue>('all');
    const [selectedCollection, setSelectedCollection] = useState<CollectionFilterValue>('all');
    const [selectedType, setSelectedType] = useState<TypeFilterValue>('all');

    const filteredArtworks = useMemo(() => {
        return artworks.filter((artwork) => {
            const categoryMatches = selectedCategory === 'all' || artwork.category === selectedCategory;
            const collectionMatches = selectedCollection === 'all' || artwork.collection === selectedCollection;
            const typeMatches = selectedType === 'all' || artwork.type === selectedType;

            return categoryMatches && collectionMatches && typeMatches;
        });
    }, [artworks, selectedCategory, selectedCollection, selectedType]);

    const resetFilters = () => {
        setSelectedCategory('all');
        setSelectedCollection('all');
        setSelectedType('all');
    };

    return (
        <section className="relative bg-(--bg-primary) py-12 sm:py-14 lg:py-16">
            <Container>
                <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[19.5rem_minmax(0,1fr)]">
                    <OeuvresFiltersAside
                        categories={categories}
                        collections={collections}
                        selectedCategory={selectedCategory}
                        selectedCollection={selectedCollection}
                        selectedType={selectedType}
                        onCategoryChange={setSelectedCategory}
                        onCollectionChange={setSelectedCollection}
                        onTypeChange={setSelectedType}
                        onReset={resetFilters}
                    />

                    <OeuvresGrid artworks={filteredArtworks} />
                </div>
            </Container>
        </section>
    );
}
