import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import type { OrderStatus } from '@/domain/ecommerce';
import { formatOrderDate, formatOrderPrice, getOrderStatusLabel, getPaymentStatusLabel } from '@/domain/orders/presentation';
import { getAdminOrderByNumber } from '@/server/orders/admin-orders';

import { updateOrderStatusAction } from './actions';

interface AdminOrderDetailPageProps {
    params: Promise<{
        orderNumber: string;
    }>;
}

const statuses: OrderStatus[] = ['PENDING', 'PAID', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];

export default async function AdminOrderDetailPage({ params }: AdminOrderDetailPageProps) {
    const { orderNumber } = await params;
    const order = await getAdminOrderByNumber(orderNumber);

    if (!order) {
        notFound();
    }

    const payment = order.payments[0];
    const statusAction = updateOrderStatusAction.bind(null, order.id, order.orderNumber);
    const hasShippingAddress = order.shippingLine1 || order.shippingPostalCode || order.shippingCity || order.shippingCountry;

    return (
        <>
            <AdminPageHeader
                title={`Commande ${order.orderNumber}`}
                description={`Creee le ${formatOrderDate(order.createdAt)} par ${order.email}.`}
                action={
                    <Link href="/admin/commandes" className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                        Retour
                    </Link>
                }
            />

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
                <section className="space-y-4">
                    {order.items.map((item) => {
                        const image = item.artwork?.images[0]?.url;

                        return (
                            <article key={item.id} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-[6rem_minmax(0,1fr)_auto]">
                                <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-slate-100">
                                    {image ? <Image src={image} alt={item.title} fill sizes="6rem" className="object-cover object-center" /> : null}
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.variantTitle ?? 'Oeuvre'}</p>
                                    <h2 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h2>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Quantite {item.quantity}
                                        {item.certificate ? ` · Certificat ${item.certificate.certificateNumber}` : ''}
                                    </p>
                                </div>

                                <div className="text-left sm:text-right">
                                    <p className="text-sm text-slate-500">{formatOrderPrice(item.unitPriceCents, order.currency)}</p>
                                    <p className="mt-2 text-lg font-semibold text-slate-900">{formatOrderPrice(item.totalPriceCents, order.currency)}</p>
                                </div>
                            </article>
                        );
                    })}
                </section>

                <aside className="space-y-4">
                    <section className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h2 className="text-lg font-semibold text-slate-900">Statut commande</h2>
                        <p className="mt-2 text-sm text-slate-500">Statut actuel : {getOrderStatusLabel(order.status)}</p>

                        <form action={statusAction} className="mt-4 grid gap-3">
                            <select name="status" defaultValue={order.status} className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800">
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {getOrderStatusLabel(status)}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                                Mettre a jour
                            </button>
                        </form>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h2 className="text-lg font-semibold text-slate-900">Paiement</h2>
                        {payment ? (
                            <div className="mt-3 space-y-2 text-sm text-slate-600">
                                <p>{getPaymentStatusLabel(payment.status)}</p>
                                <p>{formatOrderPrice(payment.amountCents, payment.currency)}</p>
                                {order.stripePaymentIntentId ? <p className="break-all text-xs text-slate-400">{order.stripePaymentIntentId}</p> : null}
                            </div>
                        ) : (
                            <p className="mt-3 text-sm text-slate-500">Aucun paiement associe.</p>
                        )}
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h2 className="text-lg font-semibold text-slate-900">Client</h2>
                        <div className="mt-3 space-y-2 text-sm text-slate-600">
                            <p>{order.customerName ?? order.user?.name ?? 'Client'}</p>
                            <p>{order.email}</p>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h2 className="text-lg font-semibold text-slate-900">Livraison</h2>
                        {hasShippingAddress ? (
                            <div className="mt-3 text-sm leading-6 text-slate-600">
                                {order.shippingName ? <p>{order.shippingName}</p> : null}
                                {order.shippingLine1 ? <p>{order.shippingLine1}</p> : null}
                                {order.shippingLine2 ? <p>{order.shippingLine2}</p> : null}
                                <p>
                                    {[order.shippingPostalCode, order.shippingCity].filter(Boolean).join(' ')}
                                    {order.shippingCountry ? `, ${order.shippingCountry}` : ''}
                                </p>
                            </div>
                        ) : (
                            <p className="mt-3 text-sm text-slate-500">Adresse non collectee.</p>
                        )}
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h2 className="text-lg font-semibold text-slate-900">Total</h2>
                        <div className="mt-4 space-y-2 text-sm text-slate-600">
                            <div className="flex justify-between gap-4">
                                <span>Sous-total</span>
                                <span>{formatOrderPrice(order.subtotalCents, order.currency)}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span>Livraison</span>
                                <span>{formatOrderPrice(order.shippingCents, order.currency)}</span>
                            </div>
                            <div className="flex justify-between gap-4 border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
                                <span>Total</span>
                                <span>{formatOrderPrice(order.totalCents, order.currency)}</span>
                            </div>
                        </div>
                    </section>
                </aside>
            </div>
        </>
    );
}
