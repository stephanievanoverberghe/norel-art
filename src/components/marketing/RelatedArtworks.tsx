import type { Artwork } from '@/domain/artworks/types';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { ArtworkCard } from './ArtworkCard';

interface RelatedArtworksProps {
    artworks: Artwork[];
}

export function RelatedArtworks({ artworks }: RelatedArtworksProps) {
    if (!artworks.length) {
        return null;
    }

    return (
        <section className="py-16">
            <Container>
                <Heading level={2}>Œuvres similaires</Heading>
                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {artworks.map((artwork) => (
                        <ArtworkCard key={artwork.id} artwork={artwork} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
