import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { RequestList } from '@/components/admin/RequestList';

export default function AdminDemandesPage() {
    return (
        <>
            <AdminPageHeader title="Demandes" description="Qualifier les contacts entrants, commandes personnalisees et projets fresques avec une lecture claire des priorites." />
            <RequestList />
        </>
    );
}
