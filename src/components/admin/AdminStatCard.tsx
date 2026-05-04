import type { AdminStat } from '@/domain/admin/types';

import { AdminPanel } from './AdminPrimitives';

interface AdminStatCardProps {
    stat: AdminStat;
}

export function AdminStatCard({ stat }: AdminStatCardProps) {
    return (
        <AdminPanel as="article" className="group relative overflow-hidden p-5">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)]" />
            <p className="text-sm text-white/46">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
            <p className="mt-3 text-xs font-medium text-emerald-100/76">{stat.trend}</p>
        </AdminPanel>
    );
}
