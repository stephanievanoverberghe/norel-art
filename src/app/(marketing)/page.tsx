import { getHomeRevealArtworks } from '@/application/artworks';
import { HomePage } from '@/components/marketing/home/HomePage';
import { homePageContent } from '@/content/home/home-content';

export default function HomeRoutePage() {
    const revealArtworks = getHomeRevealArtworks();

    return <HomePage content={homePageContent} revealArtworks={revealArtworks} />;
}
