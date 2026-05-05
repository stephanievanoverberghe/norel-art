import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, CreditCard, MapPin, PackageCheck } from 'lucide-react';

import { formatOrderDate, formatOrderPrice, getOrderStatusLabel, getPaymentStatusLabel } from '@/domain/orders/presentation';
import { getCurrentSession } from '@/server/auth/session';
import { getCustomerOrderByNumber } from '@/server/orders/customer-orders';

interface AccountOrderDetailPageProps {
    params: Promise<{
        orderNumber: string;
    }>;
}

export async function generateMetadata({ params }: AccountOrderDetailPageProps): Promise<Metadata> {
    const { orderNumber } = await params;

    return {
        title: `Commande ${orderNumber}`,
        description: `Detail de la commande ${orderNumber}.`,
    };
}

export default async function AccountOrderDetailPage({ params }: AccountOrderDetailPageProps) {
    const [{ orderNumber }, session] = await Promise.all([params, getCurrentSession()]);

    if (!session?.user?.id) {
        redirect(`/connexion?callbackUrl=/mon-compte/commandes/${orderNumber}`);
    }

    const order = await getCustomerOrderByNumber(session.user.id, orderNumber);

    if (!order) {
        notFound();
    }

    const payment = order.payments[0];
    const hasShippingAddress = order.shippingLine1 || order.shippingPostalCode || order.shippingCity || order.shippingCountry;

    return (
        <div className="grid gap-6">
            <Link href="/mon-compte/commandes" className="inline-flex items-center gap-2 text-sm text-white/56 transition hover:text-white">
                <ArrowLeft size={16} />
                Mes commandes
            </Link>

            <header className="grid gap-6 border-b border-white/12 pb-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Commande</p>
                    <h1 className="mt-4 font-(family-name:--font-heading) text-5xl leading-none text-white sm:text-7xl">{order.orderNumber}</h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">Commande du {formatOrderDate(order.createdAt)} - {getOrderStatusLabel(order.status)}</p>
                </div>

                <div className="rounded-md border border-white/10 bg-white/6 p-5 lg:min-w-72">
                    <p className="text-sm text-white/48">Total</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{formatOrderPrice(order.totalCents, order.currency)}</p>
                </div>
            </header>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
                <section className="grid gap-4">
                    {order.items.map((item) => {
                        const image = item.artwork?.images[0]?.url;
                        const slug = item.artwork?.slug;

                        return (
                            <article key={item.id} className="grid gap-4 rounded-md border border-white/10 bg-[#08131f]/78 p-4 sm:grid-cols-[7rem_minmax(0,1fr)]">
                                <div className="relative aspect-4/5 overflow-hidden rounded-md border border-white/10 bg-white/6">
                                    {image ? <Image src={image} alt={item.title} fill sizes="7rem" className="object-cover object-center" /> : null}
                                </div>

                                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.22em] text-white/40">{item.variantTitle ?? 'Oeuvre'}</p>
                                        {slug ? (
                                            <Link href={`/oeuvres/${slug}`} className="mt-2 block text-xl font-semibold text-white transition hover:text-white/78">
                                                {item.title}
                                            </Link>
                                        ) : (
                                            <h2 className="mt-2 text-xl font-semibold text-white">{item.title}</h2>
                                        )}
                                        <p className="mt-2 text-sm leading-6 text-white/52">
                                            Quantite {item.quantity}
                                            {item.certificate ? ` - Certificat ${item.certificate.certificateNumber}` : ''}
                                        </p>
                                    </div>

                                    <div className="text-left sm:text-right">
                                        <p className="text-sm text-white/52">{formatOrderPrice(item.unitPriceCents, order.currency)}</p>
                                        <p className="mt-2 text-lg font-semibold text-white">{formatOrderPrice(item.totalPriceCents, order.currency)}</p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>

                <aside className="grid h-fit gap-4">
                    <section className="rounded-md border border-white/10 bg-[#08131f]/88 p-5">
                        <div className="flex items-center gap-2 text-white">
                            <PackageCheck size={18} />
                            <h2 className="text-lg font-semibold">Statut</h2>
                        </div>
                        <p className="mt-4 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-sm text-white/70">{getOrderStatusLabel(order.status)}</p>
                        {order.paidAt ? <p className="mt-3 text-sm text-white/50">Payee le {formatOrderDate(order.paidAt)}</p> : null}
                    </section>

                    <section className="rounded-md border border-white/10 bg-[#08131f]/88 p-5">
                        <div className="flex items-center gap-2 text-white">
                            <CreditCard size={18} />
                            <h2 className="text-lg font-semibold">Paiement</h2>
                        </div>
                        {payment ? (
                            <div className="mt-4 space-y-2 text-sm text-white/58">
                                <p>{getPaymentStatusLabel(payment.status)}</p>
                                <p>{formatOrderPrice(payment.amountCents, payment.currency)}</p>
                            </div>
                        ) : (
                            <p className="mt-4 text-sm text-white/50">Aucun paiement associe.</p>
                        )}
                    </section>

                    <section className="rounded-md border border-white/10 bg-[#08131f]/88 p-5">
                        <div className="flex items-center gap-2 text-white">
                            <MapPin size={18} />
                            <h2 className="text-lg font-semibold">Livraison</h2>
                        </div>
                        {hasShippingAddress ? (
                            <div className="mt-4 text-sm leading-6 text-white/58">
                                {order.shippingName ? <p>{order.shippingName}</p> : null}
                                {order.shippingLine1 ? <p>{order.shippingLine1}</p> : null}
                                {order.shippingLine2 ? <p>{order.shippingLine2}</p> : null}
                                <p>
                                    {[order.shippingPostalCode, order.shippingCity].filter(Boolean).join(' ')}
                                    {order.shippingCountry ? `, ${order.shippingCountry}` : ''}
                                </p>
                            </div>
                        ) : (
                            <p className="mt-4 text-sm text-white/50">Adresse en attente ou non collectee.</p>
                        )}
                    </section>
                </aside>
            </div>
        </div>
    );
}
