import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ArtworkForm } from '@/components/admin/ArtworkForm';
import { getAdminCategories } from '@/server/categories/admin-categories';
import { getAdminCollectionOptions } from '@/server/collections/admin-collections';

import { createArtworkAction } from '../actions';

export default async function AdminNouvelleOeuvrePage() {
    const [categories, collections] = await Promise.all([getAdminCategories(), getAdminCollectionOptions()]);

    return (
        <>
            <AdminPageHeader title="Nouvelle oeuvre" description="Creer une fiche e-commerce complete avec categorie, prix, stock, galerie et video YouTube optionnelle." />
            <ArtworkForm mode="create" categories={categories} collections={collections} action={createArtworkAction} />
        </>
    );
}
