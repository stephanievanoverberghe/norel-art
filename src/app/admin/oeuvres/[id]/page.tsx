import { artworks } from '@/content/artworks/artworks';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ArtworkForm } from '@/components/admin/ArtworkForm';

interface AdminEditArtworkPageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminEditArtworkPage({ params }: AdminEditArtworkPageProps) {
    const { id } = await params;
    const artwork = artworks.find((item) => item.id === id) ?? artworks[0];

    return (
        <>
            <AdminPageHeader title="Edition oeuvre" description={`Ajuster la fiche "${artwork.title}" avant publication ou mise a jour du catalogue.`} />
            <ArtworkForm mode="edit" defaultTitle={artwork.title} />
        </>
    );
}
