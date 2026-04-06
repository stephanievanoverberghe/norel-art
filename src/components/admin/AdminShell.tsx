'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';

interface AdminShellProps {
    children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <div className="min-h-screen bg-slate-100">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <div className="flex min-h-screen">
                <AdminSidebar />
                <div className="flex min-w-0 flex-1 flex-col">
                    <AdminHeader />
                    <main className="flex-1 p-4 sm:p-6">{children}</main>
                </div>
            </div>
        </div>
    );
}
