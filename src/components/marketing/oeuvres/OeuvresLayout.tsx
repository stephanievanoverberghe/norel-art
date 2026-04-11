import type { Artwork } from '@/domain/artworks/types';
import { Container } from '@/ui/Container';

import { OeuvresFiltersAside } from './OeuvresFiltersAside';
import { OeuvresGrid } from './OeuvresGrid';

interface OeuvresLayoutProps {
    artworks: Artwork[];
    categories: readonly string[];
    collections: readonly string[];
}

export function OeuvresLayout({ artworks, categories, collections }: OeuvresLayoutProps) {
    return (
        <section className="relative bg-[var(--bg-primary)] py-12 sm:py-14 lg:py-16">
            <Container>
                <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[19.5rem_minmax(0,1fr)]">
                    <OeuvresFiltersAside categories={categories} collections={collections} />

                    <OeuvresGrid artworks={artworks} />
                </div>
            </Container>
        </section>
    );
}
