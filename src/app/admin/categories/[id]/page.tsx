import { notFound } from 'next/navigation';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CategoryForm } from '@/components/admin/CategoryForm';
import { getAdminCategoryById } from '@/server/categories/admin-categories';

import { updateCategoryAction } from '../actions';

interface AdminEditCategoryPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AdminEditCategoryPage({ params }: AdminEditCategoryPageProps) {
    const { id } = await params;
    const category = await getAdminCategoryById(id);

    if (!category) {
        notFound();
    }

    const updateAction = updateCategoryAction.bind(null, category.id);

    return (
        <>
            <AdminPageHeader title="Edition categorie" description={`Ajuster "${category.name}" sans casser les ${category._count.artworks} oeuvre${category._count.artworks > 1 ? 's' : ''} deja liee${category._count.artworks > 1 ? 's' : ''}.`} />
            <CategoryForm mode="edit" category={category} action={updateAction} />
        </>
    );
}
