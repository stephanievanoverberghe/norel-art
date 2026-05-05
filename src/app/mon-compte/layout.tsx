import type { ReactNode } from 'react';

import { AccountShell } from '@/components/account/AccountShell';
import { getCurrentSession } from '@/server/auth/session';

interface AccountLayoutProps {
    children: ReactNode;
}

export const dynamic = 'force-dynamic';

export default async function AccountLayout({ children }: AccountLayoutProps) {
    const session = await getCurrentSession();

    if (!session?.user?.id) {
        return children;
    }

    return <AccountShell user={session.user}>{children}</AccountShell>;
}
