'use client';

import { useMemo, useState } from 'react';

import { filterArtworks } from '@/application/artworks';
import type { ArtworkCategory } from '@/domain/artworks/categories';
import type { Artwork } from '@/domain/artworks/types';
import type { OeuvresAvailabilityFilter, OeuvresCollectionFilter, OeuvresPageContent, OeuvresCategoryFilter, OeuvresSortOption, OeuvresTypeFilter } from '@/domain/oeuvres/types';
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
    favoriteArtworkIds?: string[];
}

function isArtworkCategory(value: string | undefined, categories: readonly ArtworkCategory[]): value is ArtworkCategory {
    return !!value && categories.includes(value as ArtworkCategory);
}

function isArtworkType(value: string | undefined): value is Artwork['type'] {
    return value === 'original' || value === 'print';
}

function sortArtworks(artworks: Artwork[], sort: OeuvresSortOption) {
    return [...artworks].sort((a, b) => {
        if (sort === 'price-asc') return a.priceEur - b.priceEur;
        if (sort === 'price-desc') return b.priceEur - a.priceEur;
        if (sort === 'title-asc') return a.title.localeCompare(b.title, 'fr-FR');

        const featuredDelta = Number(Boolean(b.highlighted)) - Number(Boolean(a.highlighted));
        if (featuredDelta !== 0) return featuredDelta;

        return 0;
    });
}

export function OeuvresGallerySection({
    artworks,
    categories,
    collections,
    content,
    initialCategory,
    initialCollection,
    initialType,
    favoriteArtworkIds = [],
}: OeuvresGallerySectionProps) {
    const [selectedCategory, setSelectedCategory] = useState<OeuvresCategoryFilter>(isArtworkCategory(initialCategory, categories) ? initialCategory : 'all');
    const [selectedCollection, setSelectedCollection] = useState<OeuvresCollectionFilter>(initialCollection && collections.includes(initialCollection) ? initialCollection : 'all');
    const [selectedType, setSelectedType] = useState<OeuvresTypeFilter>(isArtworkType(initialType) ? initialType : 'all');
    const [selectedAvailability, setSelectedAvailability] = useState<OeuvresAvailabilityFilter>('all');
    const [selectedSort, setSelectedSort] = useState<OeuvresSortOption>('featured');
    const [query, setQuery] = useState('');

    const filteredArtworks = useMemo(
        () => {
            const filtered = filterArtworks(artworks, {
                category: selectedCategory,
                collection: selectedCollection,
                type: selectedType,
                availability: selectedAvailability,
                query,
            });

            return sortArtworks(filtered, selectedSort);
        },
        [artworks, selectedCategory, selectedCollection, selectedType, selectedAvailability, selectedSort, query],
    );

    const stats = useMemo(
        () => ({
            available: artworks.filter((artwork) => artwork.availability === 'available').length,
            originals: artworks.filter((artwork) => artwork.type === 'original').length,
            prints: artworks.filter((artwork) => artwork.type === 'print').length,
            total: artworks.length,
        }),
        [artworks],
    );

    const activeFiltersCount = [selectedCategory !== 'all', selectedCollection !== 'all', selectedType !== 'all', selectedAvailability !== 'all', query.trim().length > 0].filter(Boolean).length;

    const resetFilters = () => {
        setSelectedCategory('all');
        setSelectedCollection('all');
        setSelectedType('all');
        setSelectedAvailability('all');
        setSelectedSort('featured');
        setQuery('');
    };

    return (
        <section className="marketing-section marketing-bg-ash py-12 sm:py-14 lg:py-16">
            <Container>
                <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[19.5rem_minmax(0,1fr)]">
                    <OeuvresFiltersPanel
                        categories={categories}
                        collections={collections}
                        content={content.filters}
                        selectedCategory={selectedCategory}
                        selectedCollection={selectedCollection}
                        selectedType={selectedType}
                        selectedAvailability={selectedAvailability}
                        selectedSort={selectedSort}
                        query={query}
                        stats={stats}
                        activeFiltersCount={activeFiltersCount}
                        onCategoryChange={setSelectedCategory}
                        onCollectionChange={setSelectedCollection}
                        onTypeChange={setSelectedType}
                        onAvailabilityChange={setSelectedAvailability}
                        onSortChange={setSelectedSort}
                        onQueryChange={setQuery}
                        onReset={resetFilters}
                    />

                    <OeuvresGalleryGrid artworks={filteredArtworks} totalCount={artworks.length} activeFiltersCount={activeFiltersCount} content={content.grid} favoriteArtworkIds={favoriteArtworkIds} />
                </div>
            </Container>
        </section>
    );
}
