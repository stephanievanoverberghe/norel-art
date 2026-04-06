import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { TestimonialList } from '@/components/admin/TestimonialList';

export default function AdminTemoignagesPage() {
    return (
        <>
            <AdminPageHeader title="Témoignages" description="Gérer la publication des retours clients." />
            <TestimonialList />
        </>
    );
}
