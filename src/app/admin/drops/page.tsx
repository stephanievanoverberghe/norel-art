import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BellRing, CalendarClock, Layers3, Plus, Rocket } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminBadge, AdminPanel, adminPrimaryButtonClass } from '@/components/admin/AdminPrimitives';
import { getAdminDrops, getAdminDropStats } from '@/server/drops/admin-drops';

const statCards = [
    { key: 'total', label: 'Drops', icon: Rocket },
    { key: 'live', label: 'Live', icon: CalendarClock },
    { key: 'scheduled', label: 'Programmes', icon: BellRing },
    { key: 'linkedArtworks', label: 'Oeuvres liees', icon: Layers3 },
] as const;

const statusLabel = {
    DRAFT: 'Brouillon',
    ENDED: 'Termine',
    LIVE: 'Live',
    SCHEDULED: 'Programme',
} as const;

const statusTone = {
    DRAFT: 'warning',
    ENDED: 'muted',
    LIVE: 'success',
    SCHEDULED: 'accent',
} as const;

function formatDropDate(date: Date) {
    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(date);
}

export default async function AdminDropsPage() {
    const [drops, stats] = await Promise.all([getAdminDrops(), getAdminDropStats()]);

    return (
        <>
            <AdminPageHeader
                title="Drops"
                description="Orchestrer les lancements : dates, statut, selection d'oeuvres, image hero, waitlist et mise en avant."
                action={
                    <Link href="/admin/drops/nouveau" className={adminPrimaryButtonClass}>
                        <Plus size={16} />
                        Nouveau drop
                    </Link>
                }
            />

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <AdminPanel key={stat.key} as="article" className="p-5">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm text-white/46">{stat.label}</p>
                                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/52">
                                    <Icon size={17} />
                                </span>
                            </div>
                            <p className="mt-3 text-3xl font-semibold text-white">{stats[stat.key]}</p>
                        </AdminPanel>
                    );
                })}
            </section>

            <AdminPanel className="mt-6 overflow-hidden">
                <div className="border-b border-white/10 px-5 py-4">
                    <h2 className="text-lg font-semibold text-white">Calendrier des lancements</h2>
                    <p className="mt-1 text-sm text-white/44">Chaque drop peut vivre en brouillon, etre programme, passer live puis etre archive en fin de campagne.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Drop</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Image</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Statut</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Fenetre</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Oeuvres</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Waitlist</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/8">
                            {drops.map((drop) => (
                                <tr key={drop.id} className="transition hover:bg-white/[0.035]">
                                    <td className="px-4 py-4">
                                        <p className="font-semibold text-white">{drop.title}</p>
                                        <p className="mt-1 text-xs text-white/38">/{drop.slug}</p>
                                        {drop.eyebrow ? <p className="mt-1 text-xs text-white/46">{drop.eyebrow}</p> : null}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="relative h-16 w-12 overflow-hidden rounded-md border border-white/10 bg-white/5">
                                            {drop.heroImageUrl ? <Image src={drop.heroImageUrl} alt={drop.heroImageAlt ?? drop.title} fill sizes="48px" className="object-cover" /> : null}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <AdminBadge tone={statusTone[drop.status]}>{statusLabel[drop.status]}</AdminBadge>
                                        {drop.isFeatured ? (
                                            <div className="mt-2">
                                                <AdminBadge tone="accent">Mis en avant</AdminBadge>
                                            </div>
                                        ) : null}
                                    </td>
                                    <td className="px-4 py-4 text-white/58">
                                        <p>{formatDropDate(drop.startsAt)}</p>
                                        {drop.endsAt ? <p className="mt-1 text-xs text-white/38">Fin {formatDropDate(drop.endsAt)}</p> : null}
                                    </td>
                                    <td className="px-4 py-4">
                                        <AdminBadge tone={drop._count.artworks > 0 ? 'success' : 'muted'}>{drop._count.artworks} piece{drop._count.artworks > 1 ? 's' : ''}</AdminBadge>
                                    </td>
                                    <td className="px-4 py-4">
                                        <AdminBadge tone={drop.waitlistEnabled ? 'success' : 'muted'}>{drop._count.waitlistEntries} inscrit{drop._count.waitlistEntries > 1 ? 's' : ''}</AdminBadge>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <Link href={`/admin/drops/${drop.id}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/4 px-3 text-sm font-medium text-white/62 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                                            Editer
                                            <ArrowUpRight size={15} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {drops.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center text-white/44">
                                        Aucun drop pour le moment.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </AdminPanel>
        </>
    );
}
