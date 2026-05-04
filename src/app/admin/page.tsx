import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Clock3, Sparkles } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminPanel, AdminBadge } from '@/components/admin/AdminPrimitives';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import { adminQuickActions, adminStats } from '@/content/admin/dashboard';

export default function AdminDashboardPage() {
    return (
        <>
            <AdminPageHeader title="Pilotage" description="Un tableau de bord plus proche de l'atelier : catalogue, commandes, demandes et contenus importants en un coup d'oeil." />

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {adminStats.map((stat) => (
                    <AdminStatCard key={stat.label} stat={stat} />
                ))}
            </section>

            <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
                <AdminPanel className="overflow-hidden">
                    <div className="border-b border-white/10 px-5 py-5">
                        <AdminBadge tone="accent">
                            <Sparkles size={12} />
                            A faire maintenant
                        </AdminBadge>
                        <h2 className="mt-4 text-2xl font-semibold text-white">Actions atelier</h2>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/52">Les entrees rapides gardent les gestes importants a portee de main sans casser le rythme de gestion.</p>
                    </div>
                    <div className="grid gap-px bg-white/10 md:grid-cols-2">
                        {adminQuickActions.map((action) => (
                            <Link key={action.href} href={action.href} className="group bg-[#08131f]/92 p-5 transition hover:bg-[#101f30]">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{action.label}</h3>
                                        <p className="mt-2 text-sm leading-6 text-white/52">{action.description}</p>
                                    </div>
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/42 transition group-hover:border-(--accent)/35 group-hover:text-white">
                                        <ArrowUpRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </AdminPanel>

                <AdminPanel as="aside" className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/38">Pulse</p>
                    <h2 className="mt-3 text-xl font-semibold text-white">Rythme du jour</h2>
                    <div className="mt-5 space-y-4">
                        <div className="flex gap-3">
                            <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md border border-emerald-300/20 bg-emerald-400/10 text-emerald-50">
                                <CheckCircle2 size={16} />
                            </span>
                            <div>
                                <p className="text-sm font-medium text-white">Catalogue visible</p>
                                <p className="mt-1 text-sm leading-5 text-white/44">Les pages publiques gardent leur rendu premium.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md border border-amber-300/20 bg-amber-300/10 text-amber-50">
                                <Clock3 size={16} />
                            </span>
                            <div>
                                <p className="text-sm font-medium text-white">A connecter ensuite</p>
                                <p className="mt-1 text-sm leading-5 text-white/44">CRUD oeuvres Prisma, upload media et publication.</p>
                            </div>
                        </div>
                    </div>
                </AdminPanel>
            </section>
        </>
    );
}
