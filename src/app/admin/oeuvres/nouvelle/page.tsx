import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ArtworkForm } from '@/components/admin/ArtworkForm';
import { getAdminCategories } from '@/server/categories/admin-categories';

export default async function AdminNouvelleOeuvrePage() {
    const categories = await getAdminCategories();

    return (
        <>
            <AdminPageHeader title="Nouvelle oeuvre" description="Preparer une fiche complete, prete a devenir une page e-commerce avec prix, stock, galerie et video optionnelle." />
            <ArtworkForm mode="create" categories={categories} />
        </>
    );
}
