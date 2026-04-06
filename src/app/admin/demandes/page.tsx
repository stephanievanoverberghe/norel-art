import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { RequestList } from '@/components/admin/RequestList';

export default function AdminDemandesPage() {
    return (
        <>
            <AdminPageHeader title="Demandes" description="Suivi des commandes, fresques et formulaires de contact." />
            <RequestList />
        </>
    );
}
