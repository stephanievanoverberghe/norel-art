import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ArtworkForm } from '@/components/admin/ArtworkForm';

export default function AdminNouvelleOeuvrePage() {
    return (
        <>
            <AdminPageHeader title="Nouvelle oeuvre" description="Preparer une fiche complete, prete a devenir une page e-commerce avec prix, stock, galerie et video optionnelle." />
            <ArtworkForm mode="create" />
        </>
    );
}
