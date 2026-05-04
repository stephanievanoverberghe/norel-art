import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { AdminShell } from '@/components/admin/AdminShell';
import { getCurrentSession } from '@/server/auth/session';
import { isAdminRole } from '@/server/permissions/roles';

interface AdminLayoutProps {
    children: ReactNode;
}

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: AdminLayoutProps) {
    const session = await getCurrentSession();

    if (!isAdminRole(session?.user?.role)) {
        redirect('/connexion?callbackUrl=/admin');
    }

    return <AdminShell>{children}</AdminShell>;
}
