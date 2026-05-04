import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Package } from 'lucide-react';
import { redirect } from 'next/navigation';

import { formatOrderDate, formatOrderPrice, getOrderStatusLabel } from '@/domain/orders/presentation';
import { getCurrentSession } from '@/server/auth/session';
import { getCustomerOrders } from '@/server/orders/customer-orders';

export const metadata: Metadata = {
    title: 'Mes commandes',
    description: 'Historique des commandes Norel Art.',
};

export default async function AccountOrdersPage() {
    const session = await getCurrentSession();

    if (!session?.user?.id) {
        redirect('/connexion?callbackUrl=/mon-compte/commandes');
    }

    const orders = await getCustomerOrders(session.user.id);

    return (
        <main className="min-h-screen bg-(--bg-primary) px-5 py-8 text-white sm:px-8">
            <div className="mx-auto max-w-6xl">
                <Link href="/mon-compte" className="inline-flex items-center gap-2 text-sm text-white/56 transition hover:text-white">
                    <ArrowLeft size={16} />
                    Mon compte
                </Link>

                <header className="mt-10 flex flex-col gap-6 border-b border-white/12 pb-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Achats</p>
                        <h1 className="mt-4 font-(family-name:--font-heading) text-5xl leading-none sm:text-7xl">Mes commandes</h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">
                            Retrouvez vos achats, leur statut et les details associes.
                        </p>
                    </div>

                    <div className="inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-md border border-white/12 bg-white/8 px-4">
                        <Package size={22} />
                        <span className="text-sm font-semibold">{orders.length}</span>
                    </div>
                </header>

                {orders.length > 0 ? (
                    <section className="grid gap-4 py-8">
                        {orders.map((order) => {
                            const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

                            return (
                                <Link
                                    key={order.id}
                                    href={`/mon-compte/commandes/${order.orderNumber}`}
                                    className="grid gap-4 rounded-md border border-white/10 bg-[#08131f]/78 p-5 transition hover:-translate-y-0.5 hover:border-white/22 md:grid-cols-[minmax(0,1fr)_auto]"
                                >
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <p className="text-sm font-semibold text-white">{order.orderNumber}</p>
                                            <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs text-white/66">{getOrderStatusLabel(order.status)}</span>
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-white/54">
                                            {formatOrderDate(order.createdAt)} · {itemCount} article{itemCount > 1 ? 's' : ''}
                                        </p>
                                        <p className="mt-2 line-clamp-1 text-sm text-white/44">{order.items.map((item) => item.title).join(', ')}</p>
                                    </div>

                                    <div className="text-left md:text-right">
                                        <p className="text-lg font-semibold text-white">{formatOrderPrice(order.totalCents, order.currency)}</p>
                                        <span className="mt-3 inline-flex text-sm text-white/62">Voir le detail</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </section>
                ) : (
                    <section className="py-12">
                        <div className="max-w-xl rounded-md border border-white/10 bg-[#08131f]/78 p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/42">Aucune commande</p>
                            <h2 className="mt-4 text-2xl font-semibold text-white">Votre historique est vide.</h2>
                            <p className="mt-3 text-sm leading-6 text-white/56">
                                Les commandes apparaitront ici apres un paiement valide.
                            </p>
                            <Link
                                href="/oeuvres"
                                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-(--accent) px-5 text-sm font-medium text-white transition hover:opacity-90"
                            >
                                Explorer la galerie
                            </Link>
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
