import type { Metadata } from 'next';
import { artworks, artworkCategories, artworkCollections } from '@/domain/artworks/data';
import { OeuvresLayout } from '@/components/marketing/oeuvres/OeuvresLayout';
import { OeuvresHero } from '@/components/marketing/oeuvres/OeuvresHero';

export const metadata: Metadata = {
    title: 'Œuvres',
    description: 'Explorez la galerie Norel Art entre portraits, matières et mouvements.',
};

export default function OeuvresPage() {
    return (
        <>
            <OeuvresHero />
            <OeuvresLayout artworks={artworks} categories={artworkCategories} collections={artworkCollections} />
        </>
    );
}
