import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { TestimonialList } from '@/components/admin/TestimonialList';

export default function AdminTemoignagesPage() {
    return (
        <>
            <AdminPageHeader title="Temoignages" description="Selectionner les retours clients qui renforcent la confiance sans perdre le ton sensible de Norel Art." />
            <TestimonialList />
        </>
    );
}
