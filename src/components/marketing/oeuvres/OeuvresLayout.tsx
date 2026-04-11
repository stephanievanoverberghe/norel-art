'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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

type InitialFilters = {
    category: CategoryFilterValue;
    collection: CollectionFilterValue;
    type: TypeFilterValue;
};

function getInitialFiltersFromSearchParams(searchParams: Pick<URLSearchParams, 'get'>, categories: readonly ArtworkCategory[], collections: readonly string[]): InitialFilters {
    const queryCategory = searchParams.get('category');
    const queryCollection = searchParams.get('collection');
    const queryType = searchParams.get('type');

    const category = queryCategory !== null && categories.includes(queryCategory as ArtworkCategory) ? (queryCategory as ArtworkCategory) : 'all';

    const collection = queryCollection !== null && collections.includes(queryCollection) ? queryCollection : 'all';

    const type = queryType === 'original' || queryType === 'print' ? queryType : 'all';

    return { category, collection, type };
}

export function OeuvresLayout({ artworks, categories, collections }: OeuvresLayoutProps) {
    const searchParams = useSearchParams();

    const initialFilters = useMemo(() => getInitialFiltersFromSearchParams(searchParams, categories, collections), [searchParams, categories, collections]);

    const [selectedCategory, setSelectedCategory] = useState<CategoryFilterValue>(initialFilters.category);
    const [selectedCollection, setSelectedCollection] = useState<CollectionFilterValue>(initialFilters.collection);
    const [selectedType, setSelectedType] = useState<TypeFilterValue>(initialFilters.type);

    useEffect(() => {
        setSelectedCategory(initialFilters.category);
        setSelectedCollection(initialFilters.collection);
        setSelectedType(initialFilters.type);
    }, [initialFilters]);

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
