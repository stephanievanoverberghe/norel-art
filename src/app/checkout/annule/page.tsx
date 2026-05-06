import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CircleAlert } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Paiement annule',
    description: 'Retour au panier Norel Art.',
};

export default function CheckoutCancelPage() {
    return (
        <main className="norel-bg-shell norel-bg-commerce min-h-screen px-5 py-8 text-white sm:px-8">
            <section className="relative z-10 mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center">
                <div className="rounded-md border border-white/10 bg-[#08131f]/88 p-6 sm:p-8">
                    <CircleAlert size={34} className="text-white/64" />
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Paiement interrompu</p>
                    <h1 className="mt-4 font-(family-name:--font-heading) text-5xl leading-none sm:text-7xl">Commande non finalisee.</h1>
                    <p className="mt-6 text-sm leading-6 text-white/64">
                        Votre panier reste disponible. Vous pouvez reprendre le paiement ou continuer la galerie.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/panier" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-(--accent) px-5 text-sm font-medium text-white transition hover:opacity-90">
                            <ArrowLeft size={16} />
                            Revenir au panier
                        </Link>
                        <Link href="/oeuvres" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/14 px-5 text-sm font-medium text-white/72 transition hover:bg-white/8 hover:text-white">
                            Galerie
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
