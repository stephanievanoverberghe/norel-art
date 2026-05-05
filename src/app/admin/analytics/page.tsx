import Link from 'next/link';
import { Activity, ArrowUpRight, Heart, Inbox, ShoppingBag, Users, WalletCards } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminBadge, AdminPanel } from '@/components/admin/AdminPrimitives';
import type { OrderStatus } from '@/domain/ecommerce';
import { formatOrderPrice, getOrderStatusLabel } from '@/domain/orders/presentation';
import { getAdminAnalyticsData } from '@/server/analytics/admin-analytics';

function statusTone(status: OrderStatus): 'accent' | 'danger' | 'muted' | 'neutral' | 'success' | 'warning' {
    if (status === 'DELIVERED') return 'success';
    if (status === 'CANCELLED' || status === 'REFUNDED') return 'danger';
    if (status === 'PENDING') return 'warning';
    if (status === 'PAID' || status === 'PREPARING') return 'accent';
    return 'neutral';
}

export default async function AdminAnalyticsPage() {
    const analytics = await getAdminAnalyticsData();
    const maxOrderCount = Math.max(...analytics.ordersByStatus.map((row) => row.count), 1);
    const maxEventCount = Math.max(...analytics.eventsByType.map((row) => row.count), 1);
    const maxCategoryScore = Math.max(...analytics.categoryPerformance.map((row) => row.score), 1);

    const acquisitionCards = [
        { label: "Chiffre d'affaires 30j", value: formatOrderPrice(analytics.acquisition.revenue30dCents, 'EUR'), icon: WalletCards },
        { label: 'Nouveaux users', value: String(analytics.acquisition.users30d), icon: Users },
        { label: 'Favoris 30j', value: String(analytics.acquisition.favorites30d), icon: Heart },
        { label: 'Paniers actifs', value: String(analytics.acquisition.activeCarts), icon: ShoppingBag },
        { label: 'Demandes 30j', value: String(analytics.acquisition.requests30d), icon: Inbox },
    ];

    return (
        <>
            <AdminPageHeader title="Analytics" description="Lire la performance du site : ventes, conversion, categories, signaux d'interet et acquisition client." />

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {acquisitionCards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <AdminPanel key={card.label} as="article" className="p-5">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm text-white/46">{card.label}</p>
                                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/52">
                                    <Icon size={17} />
                                </span>
                            </div>
                            <p className="mt-3 text-2xl font-semibold text-white">{card.value}</p>
                        </AdminPanel>
                    );
                })}
            </section>

            <section className="mt-6 grid gap-5 xl:grid-cols-2">
                <AdminPanel className="p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/38">Ventes</p>
                            <h2 className="mt-3 text-xl font-semibold text-white">Commandes par statut</h2>
                        </div>
                        <ShoppingBag size={20} className="text-white/42" />
                    </div>
                    <div className="mt-5 space-y-4">
                        {analytics.ordersByStatus.map((row) => {
                            const status = row.status as OrderStatus;
                            const count = row.count;
                            const width = Math.max((count / maxOrderCount) * 100, count > 0 ? 8 : 0);

                            return (
                                <div key={row.status}>
                                    <div className="flex items-center justify-between gap-3">
                                        <AdminBadge tone={statusTone(status)}>{getOrderStatusLabel(status)}</AdminBadge>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-white">{count}</p>
                                            <p className="mt-1 text-xs text-white/38">{formatOrderPrice(row.totalCents, 'EUR')}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                                        <div className="h-full rounded-full bg-(--accent)" style={{ width: `${width}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                        {analytics.ordersByStatus.length === 0 ? <p className="text-sm text-white/44">Aucune commande a analyser.</p> : null}
                    </div>
                </AdminPanel>

                <AdminPanel className="p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/38">Comportement</p>
                            <h2 className="mt-3 text-xl font-semibold text-white">Evenements oeuvres</h2>
                        </div>
                        <Activity size={20} className="text-white/42" />
                    </div>
                    <div className="mt-5 space-y-4">
                        {analytics.eventsByType.map((row) => {
                            const count = row.count;
                            const width = Math.max((count / maxEventCount) * 100, count > 0 ? 8 : 0);

                            return (
                                <div key={row.type}>
                                    <div className="flex items-center justify-between gap-3 text-sm">
                                        <span className="font-medium text-white">{row.type}</span>
                                        <span className="text-white/58">{count}</span>
                                    </div>
                                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                                        <div className="h-full rounded-full bg-(--accent)" style={{ width: `${width}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                        {analytics.eventsByType.length === 0 ? <p className="text-sm text-white/44">Aucun evenement collecte sur 30 jours.</p> : null}
                    </div>
                </AdminPanel>
            </section>

            <AdminPanel className="mt-6 overflow-hidden">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-white">Performance par categorie</h2>
                        <p className="mt-1 text-sm text-white/44">Score calcule avec achats, favoris et volume catalogue.</p>
                    </div>
                    <Link href="/admin/categories" className="text-sm font-medium text-white/58 transition hover:text-white">Gerer</Link>
                </div>
                <div className="divide-y divide-white/8">
                    {analytics.categoryPerformance.map((category) => {
                        const width = Math.max((category.score / maxCategoryScore) * 100, category.score > 0 ? 8 : 0);

                        return (
                            <Link key={category.id} href={`/admin/categories/${category.id}`} className="block px-5 py-4 transition hover:bg-white/[0.035]">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="font-semibold text-white">{category.name}</p>
                                        <p className="mt-1 text-sm text-white/42">/{category.slug}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <AdminBadge>{category.artworkCount} oeuvres</AdminBadge>
                                        <AdminBadge tone="success">{category.purchases} achats</AdminBadge>
                                        <AdminBadge tone="accent">{category.favorites} favoris</AdminBadge>
                                        <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/42">
                                            <ArrowUpRight size={15} />
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                                    <div className="h-full rounded-full bg-(--accent)" style={{ width: `${width}%` }} />
                                </div>
                            </Link>
                        );
                    })}
                    {analytics.categoryPerformance.length === 0 ? <p className="px-5 py-8 text-sm text-white/44">Aucune categorie a analyser.</p> : null}
                </div>
            </AdminPanel>
        </>
    );
}
