import type { Artwork } from '@/domain/artworks/types';
import { Container } from '@/ui/Container';
import { ArtworkCard } from './ArtworkCard';

interface ArtworkGridProps {
    artworks: Artwork[];
}

export function ArtworkGrid({ artworks }: ArtworkGridProps) {
    return (
        <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {artworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
            </div>
        </Container>
    );
}
