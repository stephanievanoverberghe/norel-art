import type { Artwork } from '@/domain/artworks/types';
import type { OeuvresGridContent } from '@/domain/oeuvres/types';
import { Text } from '@/ui/Text';

import { OeuvresArtworkCard } from './OeuvresArtworkCard';
import { OeuvresEmptyState } from './OeuvresEmptyState';

interface OeuvresGalleryGridProps {
    artworks: Artwork[];
    totalCount: number;
    activeFiltersCount: number;
    content: OeuvresGridContent;
    favoriteArtworkIds?: string[];
}

export function OeuvresGalleryGrid({ artworks, totalCount, activeFiltersCount, content, favoriteArtworkIds = [] }: OeuvresGalleryGridProps) {
    const activeFiltersLabel = activeFiltersCount > 0 ? `${activeFiltersCount} filtre${activeFiltersCount > 1 ? 's' : ''} actif${activeFiltersCount > 1 ? 's' : ''}` : 'Catalogue complet';
    const countLabel = artworks.length > 1 ? content.countLabel : content.countLabelSingular;

    if (artworks.length === 0) {
        return <OeuvresEmptyState content={content} />;
    }

    return (
        <div>
            <div className="mb-6 flex flex-col gap-4 rounded-md border border-white/10 bg-white/[0.035] px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-5">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/38">{content.eyebrow}</p>
                    <Text variant="muted" className="mt-2 text-sm text-white/66">
                        {artworks.length} {countLabel} sur {totalCount}
                    </Text>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">{activeFiltersLabel}</span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">Prix et disponibilités visibles</span>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {artworks.map((artwork) => (
                    <OeuvresArtworkCard key={artwork.id} artwork={artwork} isFavorite={favoriteArtworkIds.includes(artwork.id)} />
                ))}
            </div>
        </div>
    );
}
