import { HomePage } from '@/components/marketing/home/HomePage';
import { homePageContent } from '@/content/home/home-content';
import { getPublishedArtworkCatalog } from '@/server/catalog/artworks';

export const dynamic = 'force-dynamic';

export default async function HomeRoutePage() {
    const catalog = await getPublishedArtworkCatalog();

    return <HomePage content={homePageContent} revealArtworks={catalog.artworks} />;
}
