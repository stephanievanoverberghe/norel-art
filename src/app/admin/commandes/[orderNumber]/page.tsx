import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CreditCard, MapPin, PackageCheck, ReceiptText, Save, UserRound } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminBadge, AdminPanel, adminInputClass, adminPrimaryButtonClass, adminSecondaryButtonClass } from '@/components/admin/AdminPrimitives';
import type { OrderStatus, PaymentStatus } from '@/domain/ecommerce';
import { formatOrderDate, formatOrderPrice, getOrderStatusLabel, getPaymentStatusLabel } from '@/domain/orders/presentation';
import { getAdminOrderByNumber } from '@/server/orders/admin-orders';

import { updateOrderStatusAction } from './actions';

interface AdminOrderDetailPageProps {
    params: Promise<{
        orderNumber: string;
    }>;
}

const statuses: OrderStatus[] = ['PENDING', 'PAID', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];

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
                title={order.orderNumber}
                description={`Creee le ${formatOrderDate(order.createdAt)} par ${order.email}.`}
                eyebrow="Commande"
                action={
                    <Link href="/admin/commandes" className={adminSecondaryButtonClass}>
                        <ArrowLeft size={16} />
                        Retour
                    </Link>
                }
            />

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
                <section className="space-y-4">
                    {order.items.map((item) => {
                        const image = item.artwork?.images[0]?.url;

                        return (
                            <AdminPanel key={item.id} as="article" className="grid gap-4 p-4 sm:grid-cols-[6rem_minmax(0,1fr)_auto]">
                                <div className="relative aspect-4/5 overflow-hidden rounded-md border border-white/10 bg-white/5">
                                    {image ? <Image src={image} alt={item.title} fill sizes="6rem" className="object-cover object-center" /> : null}
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">{item.variantTitle ?? 'Oeuvre'}</p>
                                    <h2 className="mt-2 text-xl font-semibold text-white">{item.title}</h2>
                                    <p className="mt-2 text-sm leading-6 text-white/48">
                                        Quantite {item.quantity}
                                        {item.certificate ? ` - Certificat ${item.certificate.certificateNumber}` : ''}
                                    </p>
                                </div>

                                <div className="text-left sm:text-right">
                                    <p className="text-sm text-white/46">{formatOrderPrice(item.unitPriceCents, order.currency)}</p>
                                    <p className="mt-2 text-lg font-semibold text-white">{formatOrderPrice(item.totalPriceCents, order.currency)}</p>
                                </div>
                            </AdminPanel>
                        );
                    })}
                </section>

                <aside className="space-y-4">
                    <AdminPanel className="p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-white">Statut commande</h2>
                                <p className="mt-2 text-sm text-white/46">Etat actuel</p>
                            </div>
                            <AdminBadge tone={orderToneByStatus[order.status]}>{getOrderStatusLabel(order.status)}</AdminBadge>
                        </div>

                        <form action={statusAction} className="mt-5 grid gap-3">
                            <select name="status" defaultValue={order.status} className={adminInputClass}>
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {getOrderStatusLabel(status)}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" className={adminPrimaryButtonClass}>
                                <Save size={16} />
                                Mettre a jour
                            </button>
                        </form>
                    </AdminPanel>

                    <AdminPanel className="p-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/60">
                                <CreditCard size={16} />
                            </span>
                            <h2 className="text-lg font-semibold text-white">Paiement</h2>
                        </div>
                        {payment ? (
                            <div className="mt-4 space-y-3 text-sm text-white/56">
                                <AdminBadge tone={paymentToneByStatus[payment.status]}>{getPaymentStatusLabel(payment.status)}</AdminBadge>
                                <p className="text-base font-semibold text-white">{formatOrderPrice(payment.amountCents, payment.currency)}</p>
                                {order.stripePaymentIntentId ? <p className="break-all text-xs text-white/34">{order.stripePaymentIntentId}</p> : null}
                            </div>
                        ) : (
                            <p className="mt-4 text-sm text-white/42">Aucun paiement associe.</p>
                        )}
                    </AdminPanel>

                    <AdminPanel className="p-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/60">
                                <UserRound size={16} />
                            </span>
                            <h2 className="text-lg font-semibold text-white">Client</h2>
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-white/56">
                            <p>{order.customerName ?? order.user?.name ?? 'Client'}</p>
                            <p>{order.email}</p>
                        </div>
                    </AdminPanel>

                    <AdminPanel className="p-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/60">
                                <MapPin size={16} />
                            </span>
                            <h2 className="text-lg font-semibold text-white">Livraison</h2>
                        </div>
                        {hasShippingAddress ? (
                            <div className="mt-4 text-sm leading-6 text-white/56">
                                {order.shippingName ? <p>{order.shippingName}</p> : null}
                                {order.shippingLine1 ? <p>{order.shippingLine1}</p> : null}
                                {order.shippingLine2 ? <p>{order.shippingLine2}</p> : null}
                                <p>
                                    {[order.shippingPostalCode, order.shippingCity].filter(Boolean).join(' ')}
                                    {order.shippingCountry ? `, ${order.shippingCountry}` : ''}
                                </p>
                            </div>
                        ) : (
                            <p className="mt-4 text-sm text-white/42">Adresse non collectee.</p>
                        )}
                    </AdminPanel>

                    <AdminPanel className="p-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/60">
                                <ReceiptText size={16} />
                            </span>
                            <h2 className="text-lg font-semibold text-white">Total</h2>
                        </div>
                        <div className="mt-5 space-y-3 text-sm text-white/56">
                            <div className="flex justify-between gap-4">
                                <span>Sous-total</span>
                                <span>{formatOrderPrice(order.subtotalCents, order.currency)}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span>Livraison</span>
                                <span>{formatOrderPrice(order.shippingCents, order.currency)}</span>
                            </div>
                            <div className="flex justify-between gap-4 border-t border-white/10 pt-4 text-base font-semibold text-white">
                                <span>Total</span>
                                <span>{formatOrderPrice(order.totalCents, order.currency)}</span>
                            </div>
                        </div>
                    </AdminPanel>

                    <AdminPanel className="p-5">
                        <div className="flex items-start gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/60">
                                <PackageCheck size={16} />
                            </span>
                            <div>
                                <h2 className="text-lg font-semibold text-white">Suite atelier</h2>
                                <p className="mt-2 text-sm leading-6 text-white/46">Quand le statut passe en expedition, la date d&apos;envoi est memorisee automatiquement.</p>
                            </div>
                        </div>
                    </AdminPanel>
                </aside>
            </div>
        </>
    );
}
