import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getCurrentSession } from '@/server/auth/session';

interface AccountLayoutProps {
    children: ReactNode;
}

export const dynamic = 'force-dynamic';

export default async function AccountLayout({ children }: AccountLayoutProps) {
    const session = await getCurrentSession();

    if (!session?.user?.id) {
        redirect('/connexion?callbackUrl=/mon-compte');
    }

    return children;
}
