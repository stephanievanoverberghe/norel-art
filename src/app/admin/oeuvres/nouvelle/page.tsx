import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ArtworkForm } from '@/components/admin/ArtworkForm';

export default function AdminNouvelleOeuvrePage() {
    return (
        <>
            <AdminPageHeader title="Nouvelle œuvre" description="Créer une fiche complète pour une nouvelle pièce." />
            <ArtworkForm mode="create" />
        </>
    );
}
