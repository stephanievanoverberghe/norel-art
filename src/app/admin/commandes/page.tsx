import Link from 'next/link';
import { CreditCard, Package, PackageCheck, Truck } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { formatOrderDate, formatOrderPrice, getOrderStatusLabel, getPaymentStatusLabel } from '@/domain/orders/presentation';
import { getAdminOrders, getAdminOrderStats } from '@/server/orders/admin-orders';

const statCards = [
    { key: 'total', label: 'Commandes', icon: Package },
    { key: 'paid', label: 'Payees', icon: CreditCard },
    { key: 'preparing', label: 'Preparation', icon: PackageCheck },
    { key: 'shipped', label: 'Expediees', icon: Truck },
] as const;

export default async function AdminOrdersPage() {
    const [orders, stats] = await Promise.all([getAdminOrders(), getAdminOrderStats()]);

    return (
        <>
            <AdminPageHeader title="Commandes" description="Suivre les paiements, preparations et expeditions." />

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <article key={stat.key} className="rounded-2xl border border-slate-200 bg-white p-5">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm text-slate-500">{stat.label}</p>
                                <Icon size={18} className="text-slate-400" />
                            </div>
                            <p className="mt-2 text-3xl font-semibold text-slate-900">{stats[stat.key]}</p>
                        </article>
                    );
                })}
            </section>

            <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 font-medium text-slate-600">Commande</th>
                                <th className="px-4 py-3 font-medium text-slate-600">Client</th>
                                <th className="px-4 py-3 font-medium text-slate-600">Statut</th>
                                <th className="px-4 py-3 font-medium text-slate-600">Paiement</th>
                                <th className="px-4 py-3 font-medium text-slate-600">Total</th>
                                <th className="px-4 py-3 font-medium text-slate-600">Articles</th>
                                <th className="px-4 py-3 font-medium text-slate-600" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.map((order) => {
                                const payment = order.payments[0];
                                const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

                                return (
                                    <tr key={order.id}>
                                        <td className="px-4 py-4">
                                            <p className="font-medium text-slate-900">{order.orderNumber}</p>
                                            <p className="mt-1 text-xs text-slate-500">{formatOrderDate(order.createdAt)}</p>
                                        </td>
                                        <td className="px-4 py-4 text-slate-700">{order.email}</td>
                                        <td className="px-4 py-4">
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{getOrderStatusLabel(order.status)}</span>
                                        </td>
                                        <td className="px-4 py-4 text-slate-700">{payment ? getPaymentStatusLabel(payment.status) : 'Aucun'}</td>
                                        <td className="px-4 py-4 font-medium text-slate-900">{formatOrderPrice(order.totalCents, order.currency)}</td>
                                        <td className="px-4 py-4 text-slate-700">{itemCount}</td>
                                        <td className="px-4 py-4 text-right">
                                            <Link href={`/admin/commandes/${order.orderNumber}`} className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                                                Ouvrir
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}

                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                                        Aucune commande pour le moment.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}
