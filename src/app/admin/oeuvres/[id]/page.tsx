import { artworks } from '@/content/artworks/artworks';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ArtworkForm } from '@/components/admin/ArtworkForm';
import { getAdminCategories } from '@/server/categories/admin-categories';

interface AdminEditArtworkPageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminEditArtworkPage({ params }: AdminEditArtworkPageProps) {
    const { id } = await params;
    const artwork = artworks.find((item) => item.id === id) ?? artworks[0];
    const categories = await getAdminCategories();
    const defaultCategory = categories.find((category) => category.name === artwork.category);

    return (
        <>
            <AdminPageHeader title="Edition oeuvre" description={`Ajuster la fiche "${artwork.title}" avant publication ou mise a jour du catalogue.`} />
            <ArtworkForm mode="edit" defaultTitle={artwork.title} categories={categories} defaultCategoryId={defaultCategory?.id} />
        </>
    );
}
