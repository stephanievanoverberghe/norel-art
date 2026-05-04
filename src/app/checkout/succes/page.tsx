import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

import { prisma } from '@/server/db/prisma';

export const metadata: Metadata = {
    title: 'Commande confirmee',
    description: 'Confirmation de commande Norel Art.',
};

export const dynamic = 'force-dynamic';

interface CheckoutSuccessPageProps {
    searchParams: Promise<{
        session_id?: string;
    }>;
}

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
    const { session_id: stripeCheckoutSessionId } = await searchParams;
    const order = stripeCheckoutSessionId
        ? await prisma.order.findUnique({
              where: { stripeCheckoutSessionId },
              select: {
                  orderNumber: true,
                  totalCents: true,
                  currency: true,
                  status: true,
              },
          })
        : null;

    return (
        <main className="min-h-screen bg-(--bg-primary) px-5 py-8 text-white sm:px-8">
            <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center">
                <div className="rounded-md border border-white/10 bg-[#08131f]/88 p-6 sm:p-8">
                    <CheckCircle2 size={34} className="text-emerald-200" />
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Paiement recu</p>
                    <h1 className="mt-4 font-(family-name:--font-heading) text-5xl leading-none sm:text-7xl">Commande confirmee.</h1>

                    {order ? (
                        <div className="mt-6 rounded-md border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white/68">
                            <p>
                                Commande <span className="font-semibold text-white">{order.orderNumber}</span>
                            </p>
                            <p>
                                Total : <span className="font-semibold text-white">{(order.totalCents / 100).toLocaleString('fr-FR')} {order.currency}</span>
                            </p>
                        </div>
                    ) : (
                        <p className="mt-6 text-sm leading-6 text-white/64">
                            Le paiement est en cours de synchronisation. La commande apparaitra dans votre espace une fois le webhook Stripe traite.
                        </p>
                    )}

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/mon-compte" className="inline-flex min-h-11 items-center justify-center rounded-full bg-(--accent) px-5 text-sm font-medium text-white transition hover:opacity-90">
                            Mon compte
                        </Link>
                        <Link href="/oeuvres" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/14 px-5 text-sm font-medium text-white/72 transition hover:bg-white/8 hover:text-white">
                            Retour galerie
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
