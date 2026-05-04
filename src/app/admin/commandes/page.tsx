import Link from 'next/link';
import { ArrowUpRight, CreditCard, Package, PackageCheck, Truck } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminBadge, AdminPanel } from '@/components/admin/AdminPrimitives';
import type { OrderStatus, PaymentStatus } from '@/domain/ecommerce';
import { formatOrderDate, formatOrderPrice, getOrderStatusLabel, getPaymentStatusLabel } from '@/domain/orders/presentation';
import { getAdminOrders, getAdminOrderStats } from '@/server/orders/admin-orders';

const statCards = [
    { key: 'total', label: 'Commandes', icon: Package },
    { key: 'paid', label: 'Payees', icon: CreditCard },
    { key: 'preparing', label: 'Preparation', icon: PackageCheck },
    { key: 'shipped', label: 'Expediees', icon: Truck },
] as const;

const orderToneByStatus: Record<OrderStatus, 'accent' | 'danger' | 'muted' | 'neutral' | 'success' | 'warning'> = {
    PENDING: 'warning',
    PAID: 'accent',
    PREPARING: 'accent',
    SHIPPED: 'neutral',
    DELIVERED: 'success',
    CANCELLED: 'danger',
    REFUNDED: 'muted',
};

const paymentToneByStatus: Record<PaymentStatus, 'accent' | 'danger' | 'muted' | 'neutral' | 'success' | 'warning'> = {
    PENDING: 'warning',
    SUCCEEDED: 'success',
    FAILED: 'danger',
    REFUNDED: 'muted',
};

export default async function AdminOrdersPage() {
    const [orders, stats] = await Promise.all([getAdminOrders(), getAdminOrderStats()]);

    return (
        <>
            <AdminPageHeader title="Commandes" description="Suivre les achats comme un carnet d'atelier : paiement, preparation, expedition et details client." />

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
                    <h2 className="text-lg font-semibold text-white">Flux des commandes</h2>
                    <p className="mt-1 text-sm text-white/44">Les commandes les plus recentes apparaissent en premier.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Commande</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Client</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Statut</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Paiement</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Total</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Articles</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/8">
                            {orders.map((order) => {
                                const payment = order.payments[0];
                                const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

                                return (
                                    <tr key={order.id} className="transition hover:bg-white/[0.035]">
                                        <td className="px-4 py-4">
                                            <p className="font-semibold text-white">{order.orderNumber}</p>
                                            <p className="mt-1 text-xs text-white/38">{formatOrderDate(order.createdAt)}</p>
                                        </td>
                                        <td className="px-4 py-4 text-white/62">{order.email}</td>
                                        <td className="px-4 py-4">
                                            <AdminBadge tone={orderToneByStatus[order.status]}>{getOrderStatusLabel(order.status)}</AdminBadge>
                                        </td>
                                        <td className="px-4 py-4">
                                            {payment ? <AdminBadge tone={paymentToneByStatus[payment.status]}>{getPaymentStatusLabel(payment.status)}</AdminBadge> : <span className="text-white/38">Aucun</span>}
                                        </td>
                                        <td className="px-4 py-4 font-semibold text-white">{formatOrderPrice(order.totalCents, order.currency)}</td>
                                        <td className="px-4 py-4 text-white/62">{itemCount}</td>
                                        <td className="px-4 py-4 text-right">
                                            <Link href={`/admin/commandes/${order.orderNumber}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/4 px-3 text-sm font-medium text-white/62 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                                                Ouvrir
                                                <ArrowUpRight size={15} />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}

                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center text-white/44">
                                        Aucune commande pour le moment.
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
