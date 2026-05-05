import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, UserRound } from 'lucide-react';
import { redirect } from 'next/navigation';

import { getCurrentSession } from '@/server/auth/session';
import { prisma } from '@/server/db/prisma';

export const metadata: Metadata = {
    title: 'Mon profil',
    description: 'Profil client Norel Art.',
};

export default async function AccountProfilePage() {
    const session = await getCurrentSession();

    if (!session?.user?.id) {
        redirect('/connexion?callbackUrl=/mon-compte/profil');
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        include: {
            profile: true,
        },
    });

    return (
        <div className="grid gap-6">
            <Link href="/mon-compte" className="inline-flex items-center gap-2 text-sm text-white/56 transition hover:text-white">
                <ArrowLeft size={16} />
                Mon compte
            </Link>

            <header className="flex flex-col gap-6 border-b border-white/12 pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Identite</p>
                    <h1 className="mt-4 font-(family-name:--font-heading) text-5xl leading-none text-white sm:text-7xl">Profil</h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">Les informations qui permettront de fluidifier commandes, livraisons et demandes.</p>
                </div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-md border border-white/12 bg-white/8">
                    <UserRound size={24} />
                </div>
            </header>

            <section className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-md border border-white/10 bg-[#08131f]/78 p-5">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">Compte</p>
                    <dl className="mt-5 grid gap-4">
                        <div>
                            <dt className="text-sm text-white/42">Nom affiche</dt>
                            <dd className="mt-1 text-white">{user?.name ?? 'Non renseigne'}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-white/42">Email</dt>
                            <dd className="mt-1 text-white">{user?.email}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-white/42">Role</dt>
                            <dd className="mt-1 text-white">{user?.role}</dd>
                        </div>
                    </dl>
                </div>

                <div className="rounded-md border border-white/10 bg-[#08131f]/78 p-5">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">Profil client</p>
                    <dl className="mt-5 grid gap-4">
                        <div>
                            <dt className="text-sm text-white/42">Prenom</dt>
                            <dd className="mt-1 text-white">{user?.profile?.firstName ?? 'A completer'}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-white/42">Nom</dt>
                            <dd className="mt-1 text-white">{user?.profile?.lastName ?? 'A completer'}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-white/42">Téléphone</dt>
                            <dd className="mt-1 text-white">{user?.profile?.phone ?? 'A completer'}</dd>
                        </div>
                    </dl>
                </div>
            </section>
        </div>
    );
}
