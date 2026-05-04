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
        return <div className="min-h-screen bg-[#060c15] text-white">{children}</div>;
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#060c15] text-white">
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:url('/images/patterns/spirale.png')] [background-position:center_top] [background-repeat:repeat] [background-size:420px]" />
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[linear-gradient(135deg,rgba(13,27,42,0.96)_0%,rgba(6,12,21,0.98)_54%,rgba(54,13,32,0.72)_100%)]" />
            <div className="relative flex min-h-screen">
                <AdminSidebar />
                <div className="flex min-w-0 flex-1 flex-col">
                    <AdminHeader />
                    <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">{children}</main>
                </div>
            </div>
        </div>
    );
}
