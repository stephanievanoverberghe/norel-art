import type { Artwork } from '@/domain/artworks/types';
import { Text } from '@/ui/Text';

import { OeuvreCard } from './OeuvreCard';
import { OeuvreEmptyState } from './OeuvreEmptyState';

interface OeuvresGridProps {
    artworks: Artwork[];
}

export function OeuvresGrid({ artworks }: OeuvresGridProps) {
    if (artworks.length === 0) {
        return <OeuvreEmptyState />;
    }

    return (
        <div>
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/38">Sélection</p>
                    <Text variant="muted" className="mt-2 text-sm text-white/66">
                        {artworks.length} présences à approcher
                    </Text>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {artworks.map((artwork) => (
                    <OeuvreCard key={artwork.id} artwork={artwork} />
                ))}
            </div>
        </div>
    );
}
