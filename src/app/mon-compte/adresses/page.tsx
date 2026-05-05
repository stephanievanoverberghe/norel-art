import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import { redirect } from 'next/navigation';

import { getCurrentSession } from '@/server/auth/session';
import { prisma } from '@/server/db/prisma';

export const metadata: Metadata = {
    title: 'Mes adresses',
    description: 'Adresses client Norel Art.',
};

export default async function AccountAddressesPage() {
    const session = await getCurrentSession();

    if (!session?.user?.id) {
        redirect('/connexion?callbackUrl=/mon-compte/adresses');
    }

    const addresses = await prisma.address.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });

    return (
        <div className="grid gap-6">
            <Link href="/mon-compte" className="inline-flex items-center gap-2 text-sm text-white/56 transition hover:text-white">
                <ArrowLeft size={16} />
                Mon compte
            </Link>

            <header className="flex flex-col gap-6 border-b border-white/12 pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Livraison</p>
                    <h1 className="mt-4 font-(family-name:--font-heading) text-5xl leading-none text-white sm:text-7xl">Adresses</h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">Les adresses rattachees aux commandes et livraisons.</p>
                </div>
                <div className="inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-md border border-white/12 bg-white/8 px-4">
                    <MapPin size={22} />
                    <span className="text-sm font-semibold">{addresses.length}</span>
                </div>
            </header>

            {addresses.length > 0 ? (
                <section className="grid gap-4 md:grid-cols-2">
                    {addresses.map((address) => (
                        <article key={address.id} className="rounded-md border border-white/10 bg-[#08131f]/78 p-5">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">{address.type}</p>
                                {address.isDefault ? <span className="rounded-full border border-(--accent)/24 bg-(--accent)/12 px-3 py-1 text-xs text-white/72">Défaut</span> : null}
                            </div>
                            <h2 className="mt-4 text-xl font-semibold text-white">{address.fullName}</h2>
                            <div className="mt-3 text-sm leading-6 text-white/58">
                                <p>{address.line1}</p>
                                {address.line2 ? <p>{address.line2}</p> : null}
                                <p>{address.postalCode} {address.city}</p>
                                <p>{address.country}</p>
                                {address.phone ? <p>{address.phone}</p> : null}
                            </div>
                        </article>
                    ))}
                </section>
            ) : (
                <section className="max-w-xl rounded-md border border-white/10 bg-[#08131f]/78 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/42">Aucune adresse</p>
                    <h2 className="mt-4 text-2xl font-semibold text-white">Vos adresses seront conservees ici.</h2>
                    <p className="mt-3 text-sm leading-6 text-white/56">Elles pourront etre creees depuis les prochaines etapes de profil ou de commande.</p>
                </section>
            )}
        </div>
    );
}
