import type { AdminStat } from '@/domain/admin/types';

interface AdminStatCardProps {
    stat: AdminStat;
}

export function AdminStatCard({ stat }: AdminStatCardProps) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
            <p className="mt-2 text-xs text-emerald-700">{stat.trend}</p>
        </article>
    );
}
