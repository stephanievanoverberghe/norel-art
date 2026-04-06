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
            <AdminPageHeader title="Édition d’une œuvre" description={`Modification de la fiche ${artwork.title}.`} />
            <ArtworkForm mode="edit" defaultTitle={artwork.title} />
        </>
    );
}
