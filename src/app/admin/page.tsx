import Link from 'next/link';
import type { ComponentType } from 'react';
import { Activity, AlertTriangle, ArrowUpRight, Heart, Inbox, Layers3, Palette, PackageCheck, Rocket, ShoppingBag, Tags, UserRound, Users, WalletCards } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminBadge, AdminPanel } from '@/components/admin/AdminPrimitives';
import { formatOrderDate, formatOrderPrice, getOrderStatusLabel } from '@/domain/orders/presentation';
import { getAdminDashboardData } from '@/server/admin/dashboard';

function formatCurrency(cents: number) {
    return new Intl.NumberFormat('fr-FR', {
        currency: 'EUR',
        maximumFractionDigits: 0,
        style: 'currency',
    }).format(cents / 100);
}

function formatPercent(value: number) {
    return `${value.toFixed(value >= 10 ? 0 : 1)}%`;
}

interface MetricCardProps {
    detail: string;
    icon: ComponentType<{ size?: number; className?: string }>;
    label: string;
    tone?: 'accent' | 'danger' | 'success' | 'warning';
    value: string;
}

const toneClass = {
    accent: 'border-(--accent)/30 bg-(--accent)/16 text-white',
    danger: 'border-rose-300/25 bg-rose-400/10 text-rose-50',
    success: 'border-emerald-300/25 bg-emerald-400/10 text-emerald-50',
    warning: 'border-amber-300/25 bg-amber-300/10 text-amber-50',
};

function MetricCard({ detail, icon: Icon, label, tone = 'accent', value }: MetricCardProps) {
    return (
        <AdminPanel as="article" className="p-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-white/46">{label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
                    <p className="mt-3 text-xs font-medium text-white/42">{detail}</p>
                </div>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border ${toneClass[tone]}`}>
                    <Icon size={18} />
                </span>
            </div>
        </AdminPanel>
    );
}

export default async function AdminDashboardPage() {
    const dashboard = await getAdminDashboardData();
    const overview = dashboard.overview;
    const eventRows = [
        { label: 'Vues', value: dashboard.eventsByType.VIEW ?? 0 },
        { label: 'Favoris', value: dashboard.eventsByType.FAVORITE ?? 0 },
        { label: 'Paniers', value: dashboard.eventsByType.ADD_TO_CART ?? 0 },
        { label: 'Achats', value: dashboard.eventsByType.PURCHASE ?? 0 },
    ];
    const maxEventValue = Math.max(...eventRows.map((row) => row.value), 1);

    const actionTiles = [
        { href: '/admin/commandes', label: 'Commandes', description: 'Paiements, preparation, livraison.', icon: ShoppingBag },
        { href: '/admin/oeuvres', label: 'Catalogue', description: 'Oeuvres, stock, medias, publication.', icon: Palette },
        { href: '/admin/categories', label: 'Categories', description: 'Structure de la galerie et filtres.', icon: Tags },
        { href: '/admin/collections', label: 'Collections', description: 'Series, ordre, SEO et mises en avant.', icon: Layers3 },
        { href: '/admin/drops', label: 'Drops', description: 'Lancements, calendrier, waitlist.', icon: Rocket },
        { href: '/admin/utilisateurs', label: 'Utilisateurs', description: 'Clients, admins, achats, favoris.', icon: Users },
        { href: '/admin/analytics', label: 'Analytics', description: 'Performance, conversion, categories.', icon: Activity },
        { href: '/admin/demandes', label: 'Demandes', description: 'Contacts et projets sur mesure.', icon: Inbox },
    ];

    return (
        <>
            <AdminPageHeader
                title="Cockpit"
                description="Le centre de pilotage Norel Art : business, catalogue, utilisateurs, commandes, alertes et analytics reunis pour prendre les bonnes decisions."
                eyebrow="Pilotage global"
            />

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard icon={WalletCards} label="Chiffre d'affaires" value={formatCurrency(overview.revenueCents)} detail={`${formatCurrency(overview.revenue30dCents)} sur 30 jours`} tone="success" />
                <MetricCard icon={ShoppingBag} label="Commandes" value={String(overview.totalOrders)} detail={`${overview.orders30d} nouvelles sur 30 jours`} />
                <MetricCard icon={Users} label="Utilisateurs" value={String(overview.totalUsers)} detail={`${overview.users30d} nouveaux sur 30 jours`} />
                <MetricCard icon={Activity} label="Conversion" value={formatPercent(overview.conversionRate)} detail={`${overview.buyers} clients acheteurs`} tone="warning" />
            </section>

            <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(24rem,0.65fr)]">
                <AdminPanel className="overflow-hidden">
                    <div className="border-b border-white/10 px-5 py-5">
                        <AdminBadge tone="accent">
                            <AlertTriangle size={12} />
                            Priorites
                        </AdminBadge>
                        <h2 className="mt-4 text-2xl font-semibold text-white">Ce qui demande une action</h2>
                        <p className="mt-2 text-sm leading-6 text-white/52">Commandes a traiter, demandes ouvertes, stock bas et brouillons catalogue.</p>
                    </div>
                    <div className="grid gap-px bg-white/10 md:grid-cols-2">
                        <Link href="/admin/commandes" className="group bg-[#08131f]/92 p-5 transition hover:bg-[#101f30]">
                            <p className="text-sm text-white/42">Commandes en attente</p>
                            <p className="mt-3 text-3xl font-semibold text-white">{overview.pendingOrders}</p>
                            <p className="mt-2 text-sm text-white/52">{overview.preparingOrders} en preparation</p>
                        </Link>
                        <Link href="/admin/demandes" className="group bg-[#08131f]/92 p-5 transition hover:bg-[#101f30]">
                            <p className="text-sm text-white/42">Demandes ouvertes</p>
                            <p className="mt-3 text-3xl font-semibold text-white">{overview.openRequests}</p>
                            <p className="mt-2 text-sm text-white/52">Contacts, devis et projets</p>
                        </Link>
                        <Link href="/admin/oeuvres" className="group bg-[#08131f]/92 p-5 transition hover:bg-[#101f30]">
                            <p className="text-sm text-white/42">Brouillons catalogue</p>
                            <p className="mt-3 text-3xl font-semibold text-white">{overview.draftArtworks}</p>
                            <p className="mt-2 text-sm text-white/52">{overview.publishedArtworks} oeuvres publiees</p>
                        </Link>
                        <Link href="/admin/analytics" className="group bg-[#08131f]/92 p-5 transition hover:bg-[#101f30]">
                            <p className="text-sm text-white/42">Paniers actifs</p>
                            <p className="mt-3 text-3xl font-semibold text-white">{overview.activeCarts}</p>
                            <p className="mt-2 text-sm text-white/52">{overview.favorites} favoris au total</p>
                        </Link>
                    </div>
                </AdminPanel>

                <AdminPanel as="aside" className="p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/38">Analytics</p>
                            <h2 className="mt-3 text-xl font-semibold text-white">Signaux 30 jours</h2>
                        </div>
                        <Link href="/admin/analytics" className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/50 transition hover:text-white">
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                    <div className="mt-5 space-y-4">
                        {eventRows.map((row) => (
                            <div key={row.label}>
                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <span className="text-white/54">{row.label}</span>
                                    <span className="font-semibold text-white">{row.value}</span>
                                </div>
                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                                    <div className="h-full rounded-full bg-(--accent)" style={{ width: `${Math.max((row.value / maxEventValue) * 100, row.value > 0 ? 8 : 0)}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </AdminPanel>
            </section>

            <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_26rem]">
                <AdminPanel className="overflow-hidden">
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                        <div>
                            <h2 className="text-lg font-semibold text-white">Dernieres commandes</h2>
                            <p className="mt-1 text-sm text-white/44">Le flux commercial le plus recent.</p>
                        </div>
                        <Link href="/admin/commandes" className="text-sm font-medium text-white/58 transition hover:text-white">Tout voir</Link>
                    </div>
                    <div className="divide-y divide-white/8">
                        {dashboard.recentOrders.map((order) => (
                            <Link key={order.id} href={`/admin/commandes/${order.orderNumber}`} className="grid gap-3 px-5 py-4 transition hover:bg-white/[0.035] sm:grid-cols-[minmax(0,1fr)_auto]">
                                <div>
                                    <p className="font-semibold text-white">{order.orderNumber}</p>
                                    <p className="mt-1 text-sm text-white/44">{order.email} - {formatOrderDate(order.createdAt)}</p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <AdminBadge>{getOrderStatusLabel(order.status)}</AdminBadge>
                                    <p className="mt-2 font-semibold text-white">{formatOrderPrice(order.totalCents, order.currency)}</p>
                                </div>
                            </Link>
                        ))}
                        {dashboard.recentOrders.length === 0 ? <p className="px-5 py-8 text-sm text-white/44">Aucune commande pour le moment.</p> : null}
                    </div>
                </AdminPanel>

                <AdminPanel className="p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/38">Stock</p>
                            <h2 className="mt-3 text-xl font-semibold text-white">Alertes variantes</h2>
                        </div>
                        <PackageCheck size={20} className="text-white/42" />
                    </div>
                    <div className="mt-5 space-y-3">
                        {dashboard.lowStockVariants.map((variant) => (
                            <Link key={variant.id} href={`/admin/oeuvres/${variant.artwork.id}`} className="flex items-center justify-between gap-3 rounded-md border border-white/8 bg-white/4 px-4 py-3 transition hover:border-white/16 hover:bg-white/7">
                                <div>
                                    <p className="text-sm font-medium text-white">{variant.artwork.title}</p>
                                    <p className="mt-1 text-xs text-white/38">{variant.title} - {variant.sku}</p>
                                </div>
                                <AdminBadge tone={variant.stock === 0 ? 'danger' : 'warning'}>{variant.stock} restant</AdminBadge>
                            </Link>
                        ))}
                        {dashboard.lowStockVariants.length === 0 ? <p className="text-sm text-white/44">Aucune alerte stock.</p> : null}
                    </div>
                </AdminPanel>
            </section>

            <section className="mt-6 grid gap-5 xl:grid-cols-2">
                <AdminPanel className="p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/38">Catalogue</p>
                            <h2 className="mt-3 text-xl font-semibold text-white">Oeuvres qui tirent le plus</h2>
                        </div>
                        <Heart size={20} className="text-white/42" />
                    </div>
                    <div className="mt-5 space-y-3">
                        {dashboard.topArtworks.map((artwork, index) => (
                            <Link key={artwork.id} href={`/admin/oeuvres/${artwork.id}`} className="grid gap-3 rounded-md border border-white/8 bg-white/4 px-4 py-3 transition hover:border-white/16 hover:bg-white/7 sm:grid-cols-[2rem_minmax(0,1fr)_auto] sm:items-center">
                                <span className="text-sm font-semibold text-white/38">{String(index + 1).padStart(2, '0')}</span>
                                <div>
                                    <p className="font-medium text-white">{artwork.title}</p>
                                    <p className="mt-1 text-xs text-white/38">{artwork.category.name} - {artwork.availability}</p>
                                </div>
                                <p className="text-sm text-white/58">{artwork._count.favorites} favoris</p>
                            </Link>
                        ))}
                    </div>
                </AdminPanel>

                <AdminPanel className="p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/38">CRM</p>
                            <h2 className="mt-3 text-xl font-semibold text-white">Derniers utilisateurs</h2>
                        </div>
                        <Link href="/admin/utilisateurs" className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/50 transition hover:text-white">
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                    <div className="mt-5 space-y-3">
                        {dashboard.recentUsers.map((user) => (
                            <Link key={user.id} href={`/admin/utilisateurs/${user.id}`} className="flex items-center justify-between gap-3 rounded-md border border-white/8 bg-white/4 px-4 py-3 transition hover:border-white/16 hover:bg-white/7">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/52">
                                        <UserRound size={16} />
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-white">{user.name ?? 'Utilisateur'}</p>
                                        <p className="mt-1 text-xs text-white/38">{user.email}</p>
                                    </div>
                                </div>
                                <AdminBadge tone={user.role === 'ADMIN' ? 'accent' : 'neutral'}>{user.role}</AdminBadge>
                            </Link>
                        ))}
                        {dashboard.recentUsers.length === 0 ? <p className="text-sm text-white/44">Aucun utilisateur pour le moment.</p> : null}
                    </div>
                </AdminPanel>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {actionTiles.map((tile) => {
                    const Icon = tile.icon;

                    return (
                        <Link key={tile.href} href={tile.href} className="group rounded-md border border-white/10 bg-[#08131f]/78 p-5 backdrop-blur-xl transition hover:border-white/18 hover:bg-[#101f30]">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/58">
                                        <Icon size={18} />
                                    </span>
                                    <h3 className="mt-4 text-lg font-semibold text-white">{tile.label}</h3>
                                    <p className="mt-2 text-sm leading-6 text-white/52">{tile.description}</p>
                                </div>
                                <ArrowUpRight size={16} className="text-white/34 transition group-hover:text-white" />
                            </div>
                        </Link>
                    );
                })}
            </section>
        </>
    );
}
