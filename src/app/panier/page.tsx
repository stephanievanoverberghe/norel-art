import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

import { CartItemControls } from '@/components/cart/CartItemControls';
import { CheckoutButton } from '@/components/checkout/CheckoutButton';
import { Footer } from '@/layout/Footer';
import { Header } from '@/layout/Header';
import { getCurrentSession } from '@/server/auth/session';
import { CART_SESSION_COOKIE, getActiveCart } from '@/server/cart/cart';

export const metadata: Metadata = {
    title: 'Panier',
    description: 'Votre panier Norel Art.',
};

export const dynamic = 'force-dynamic';

function formatPrice(priceCents: number): string {
    return `${(priceCents / 100).toLocaleString('fr-FR')} EUR`;
}

export default async function CartPage() {
    const session = await getCurrentSession();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(CART_SESSION_COOKIE)?.value;
    const cart = await getActiveCart({
        userId: session?.user?.id,
        sessionId,
    });
    const items = cart?.items ?? [];

    return (
        <>
            <Header />
            <main className="min-h-screen bg-(--bg-deep) px-5 pb-14 pt-32 text-white sm:px-8 lg:pt-36">
                <div className="mx-auto max-w-6xl">
                <Link href="/oeuvres" className="inline-flex items-center gap-2 text-sm text-white/56 transition hover:text-white">
                    <ArrowLeft size={16} />
                    Continuer la galerie
                </Link>

                <header className="mt-10 flex flex-col gap-6 border-b border-white/12 pb-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Sélection</p>
                        <h1 className="mt-4 font-(family-name:--font-heading) text-5xl leading-none sm:text-7xl">Panier</h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">
                            Les œuvres que vous souhaitez réserver ou acheter.
                        </p>
                    </div>

                    <div className="inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-md border border-white/12 bg-white/8 px-4">
                        <ShoppingBag size={22} />
                        <span className="text-sm font-semibold">{cart?.totalQuantity ?? 0}</span>
                    </div>
                </header>

                {items.length > 0 ? (
                    <div className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
                        <section className="grid gap-4">
                            {items.map((item) => {
                                const maxQuantity = Math.max(1, Math.min(item.stock, item.maxPerOrder ?? item.stock));

                                return (
                                    <article key={item.id} className="grid gap-4 rounded-md border border-white/10 bg-[#08131f]/78 p-4 sm:grid-cols-[7rem_minmax(0,1fr)]">
                                        <Link href={`/oeuvres/${item.artwork.slug}`} className="relative aspect-4/5 overflow-hidden rounded-md border border-white/10">
                                            <Image src={item.artwork.image} alt={item.artwork.title} fill sizes="7rem" className="object-cover object-center" />
                                        </Link>

                                        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.22em] text-white/40">{item.variantTitle}</p>
                                                <Link href={`/oeuvres/${item.artwork.slug}`} className="mt-2 block text-xl font-semibold text-white transition hover:text-white/78">
                                                    {item.artwork.title}
                                                </Link>
                                                <p className="mt-2 text-sm leading-6 text-white/52">
                                                    {item.artwork.collection} - {item.artwork.dimensions}
                                                </p>
                                                <div className="mt-4">
                                                    <CartItemControls cartItemId={item.id} quantity={item.quantity} maxQuantity={maxQuantity} />
                                                </div>
                                            </div>

                                            <div className="text-left sm:text-right">
                                                <p className="text-sm text-white/52">{formatPrice(item.unitPriceCents)}</p>
                                                <p className="mt-2 text-lg font-semibold text-white">{formatPrice(item.totalPriceCents)}</p>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </section>

                        <aside className="h-fit rounded-md border border-white/10 bg-[#08131f]/88 p-5">
                            <h2 className="text-xl font-semibold text-white">Récapitulatif</h2>
                            <div className="mt-5 space-y-3 border-b border-white/10 pb-5 text-sm">
                                <div className="flex items-center justify-between gap-4 text-white/62">
                                    <span>Sous-total</span>
                                    <span>{formatPrice(cart?.subtotalCents ?? 0)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4 text-white/62">
                                    <span>Livraison</span>
                                    <span>À définir</span>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center justify-between gap-4 text-lg font-semibold text-white">
                                <span>Total provisoire</span>
                                <span>{formatPrice(cart?.subtotalCents ?? 0)}</span>
                            </div>

                            <CheckoutButton />
                        </aside>
                    </div>
                ) : (
                    <section className="py-12">
                        <div className="max-w-xl rounded-md border border-white/10 bg-[#08131f]/78 p-6">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/42">Panier vide</p>
                            <h2 className="mt-4 text-2xl font-semibold text-white">Aucune œuvre sélectionnée.</h2>
                            <p className="mt-3 text-sm leading-6 text-white/56">
                                Parcourez la galerie et ajoutez une œuvre disponible pour commencer votre commande.
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
            <Footer />
        </>
    );
}
