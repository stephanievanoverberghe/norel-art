import { notFound } from 'next/navigation';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ArtworkForm } from '@/components/admin/ArtworkForm';
import { getAdminArtworkById } from '@/server/artworks/admin-artworks';
import { getAdminCategories } from '@/server/categories/admin-categories';
import { getAdminCollectionOptions } from '@/server/collections/admin-collections';

import { updateArtworkAction } from '../actions';

interface AdminEditArtworkPageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminEditArtworkPage({ params }: AdminEditArtworkPageProps) {
    const { id } = await params;
    const [artwork, categories, collections] = await Promise.all([getAdminArtworkById(id), getAdminCategories(), getAdminCollectionOptions()]);

    if (!artwork) {
        notFound();
    }

    const updateAction = updateArtworkAction.bind(null, artwork.id, artwork.slug);

    return (
        <>
            <AdminPageHeader title="Edition oeuvre" description={`Ajuster la fiche "${artwork.title}" : contenu, categorie, commerce, stock, medias et publication.`} />
            <ArtworkForm mode="edit" artwork={artwork} categories={categories} collections={collections} action={updateAction} />
        </>
    );
}
