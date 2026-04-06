import Link from 'next/link';
import { adminQuickActions, adminStats } from '@/content/admin/dashboard';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminStatCard } from '@/components/admin/AdminStatCard';

export default function AdminDashboardPage() {
    return (
        <>
            <AdminPageHeader title="Dashboard" description="Vue synthétique des contenus, demandes et performances." />
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {adminStats.map((stat) => (
                    <AdminStatCard key={stat.label} stat={stat} />
                ))}
            </section>
            <section className="mt-6 grid gap-4 lg:grid-cols-3">
                {adminQuickActions.map((action) => (
                    <Link key={action.href} href={action.href} className="rounded-2xl border border-slate-200 bg-white p-5 hover:bg-slate-50">
                        <h2 className="text-lg font-semibold text-slate-900">{action.label}</h2>
                        <p className="mt-2 text-sm text-slate-600">{action.description}</p>
                    </Link>
                ))}
            </section>
        </>
    );
}
