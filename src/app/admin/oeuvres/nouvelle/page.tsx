import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ArtworkForm } from '@/components/admin/ArtworkForm';
import { getAdminCategories } from '@/server/categories/admin-categories';

import { createArtworkAction } from '../actions';

export default async function AdminNouvelleOeuvrePage() {
    const categories = await getAdminCategories();

    return (
        <>
            <AdminPageHeader title="Nouvelle oeuvre" description="Creer une fiche e-commerce complete avec categorie, prix, stock, galerie et video YouTube optionnelle." />
            <ArtworkForm mode="create" categories={categories} action={createArtworkAction} />
        </>
    );
}
