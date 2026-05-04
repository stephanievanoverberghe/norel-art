import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CategoryForm } from '@/components/admin/CategoryForm';

import { createCategoryAction } from '../actions';

export default function AdminNewCategoryPage() {
    return (
        <>
            <AdminPageHeader title="Nouvelle categorie" description="Creer une nouvelle famille de classement avant de l'associer aux oeuvres du catalogue." />
            <CategoryForm mode="create" action={createCategoryAction} />
        </>
    );
}
