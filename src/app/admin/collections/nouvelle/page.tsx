import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CollectionForm } from '@/components/admin/CollectionForm';

import { createCollectionAction } from '../actions';

export default function AdminNewCollectionPage() {
    return (
        <>
            <AdminPageHeader title="Nouvelle collection" description="Creer une serie pilotable avec statut, ordre, image hero, SEO et future mise en avant publique." />
            <CollectionForm mode="create" action={createCollectionAction} />
        </>
    );
}
