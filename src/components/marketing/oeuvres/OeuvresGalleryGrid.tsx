import type { Artwork } from '@/domain/artworks/types';
import type { OeuvresGridContent } from '@/domain/oeuvres/types';
import { Text } from '@/ui/Text';

import { OeuvresArtworkCard } from './OeuvresArtworkCard';
import { OeuvresEmptyState } from './OeuvresEmptyState';

interface OeuvresGalleryGridProps {
    artworks: Artwork[];
    content: OeuvresGridContent;
}

export function OeuvresGalleryGrid({ artworks, content }: OeuvresGalleryGridProps) {
    if (artworks.length === 0) {
        return <OeuvresEmptyState content={content} />;
    }

    return (
        <div>
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/38">{content.eyebrow}</p>
                    <Text variant="muted" className="mt-2 text-sm text-white/66">
                        {artworks.length} {content.countLabel}
                    </Text>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {artworks.map((artwork) => (
                    <OeuvresArtworkCard key={artwork.id} artwork={artwork} />
                ))}
            </div>
        </div>
    );
}
