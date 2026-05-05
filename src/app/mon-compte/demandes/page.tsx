import type { CustomRequestStatus, CustomRequestType } from '@prisma/client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { redirect } from 'next/navigation';

import { getCurrentSession } from '@/server/auth/session';
import { getCustomerCustomRequests } from '@/server/requests/custom-requests';

export const metadata: Metadata = {
    title: 'Mes demandes',
    description: 'Demandes envoyées à Norel Art.',
};

const statusLabel: Record<CustomRequestStatus, string> = {
    ACCEPTED: 'Acceptée',
    CLOSED: 'Fermée',
    IN_REVIEW: 'En qualification',
    NEW: 'Nouvelle',
    QUOTE_SENT: 'Devis envoyé',
};

const typeLabel: Record<CustomRequestType, string> = {
    CONTACT: 'Contact',
    CUSTOM_ARTWORK: 'Commande sur mesure',
    MURAL: 'Fresque',
};

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(date);
}

export default async function AccountRequestsPage() {
    const session = await getCurrentSession();

    if (!session?.user?.id) {
        redirect('/connexion?callbackUrl=/mon-compte/demandes');
    }

    const requests = await getCustomerCustomRequests(session.user.id);

    return (
        <div className="grid gap-6">
            <Link href="/mon-compte" className="inline-flex items-center gap-2 text-sm text-white/56 transition hover:text-white">
                <ArrowLeft size={16} />
                Mon compte
            </Link>

            <header className="flex flex-col gap-6 border-b border-white/12 pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Relation artiste</p>
                    <h1 className="mt-4 font-(family-name:--font-heading) text-5xl leading-none text-white sm:text-7xl">Mes demandes</h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">Les messages envoyés depuis le contact, les commandes personnalisées ou les fresques.</p>
                </div>

                <div className="inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-md border border-white/12 bg-white/8 px-4">
                    <Mail size={22} />
                    <span className="text-sm font-semibold">{requests.length}</span>
                </div>
            </header>

            {requests.length > 0 ? (
                <section className="grid gap-4">
                    {requests.map((request) => (
                        <article key={request.id} className="rounded-md border border-white/10 bg-[#08131f]/78 p-5">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/66">{typeLabel[request.type]}</span>
                                        <span className="rounded-full border border-(--accent)/24 bg-(--accent)/12 px-3 py-1 text-xs text-white/72">{statusLabel[request.status]}</span>
                                    </div>
                                    <h2 className="mt-4 text-xl font-semibold text-white">{request.name}</h2>
                                    <p className="mt-2 text-sm text-white/48">{formatDate(request.createdAt)}</p>
                                </div>
                                <p className="text-sm font-medium text-white/70">{request.budget ?? 'Budget à définir'}</p>
                            </div>
                            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/58">{request.message}</p>
                        </article>
                    ))}
                </section>
            ) : (
                <section className="max-w-xl rounded-md border border-white/10 bg-[#08131f]/78 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/42">Aucune demande</p>
                    <h2 className="mt-4 text-2xl font-semibold text-white">Aucun message rattaché à votre compte.</h2>
                    <p className="mt-3 text-sm leading-6 text-white/56">Les prochaines demandes envoyées en étant connectée apparaîtront ici.</p>
                    <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-(--accent) px-5 text-sm font-medium text-white transition hover:opacity-90">
                        Envoyer une demande
                    </Link>
                </section>
            )}
        </div>
    );
}
