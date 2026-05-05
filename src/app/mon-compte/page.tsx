import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, FileBadge, Heart, Package, ScrollText, UserRound } from 'lucide-react';
import { redirect } from 'next/navigation';

import { formatOrderDate, formatOrderPrice, getOrderStatusLabel } from '@/domain/orders/presentation';
import { getCurrentSession } from '@/server/auth/session';
import { prisma } from '@/server/db/prisma';

export const metadata: Metadata = {
    title: 'Mon compte',
    description: 'Espace client Norel Art.',
};

const accountLinks = [
    {
        href: '/mon-compte/commandes',
        label: 'Commandes',
        description: 'Suivre les achats, statuts, paiements et details.',
        icon: Package,
    },
    {
        href: '/mon-compte/favoris',
        label: 'Favoris',
        description: 'Revenir aux oeuvres mises de cote.',
        icon: Heart,
    },
    {
        href: '/mon-compte/demandes',
        label: 'Demandes',
        description: 'Retrouver vos contacts, commandes et fresques.',
        icon: ScrollText,
    },
    {
        href: '/mon-compte/certificats',
        label: 'Certificats',
        description: 'Consulter les certificats lies aux pieces.',
        icon: FileBadge,
    },
] as const;

export default async function AccountPage() {
    const session = await getCurrentSession();

    if (!session?.user?.id) {
        redirect('/connexion?callbackUrl=/mon-compte');
    }

    const userId = session.user.id;
    const [ordersCount, favoritesCount, certificatesCount, requestsCount, latestOrder, latestRequest] = await prisma.$transaction([
        prisma.order.count({ where: { userId } }),
        prisma.favorite.count({ where: { userId } }),
        prisma.certificate.count({ where: { userId } }),
        prisma.customRequest.count({ where: { userId } }),
        prisma.order.findFirst({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            select: {
                createdAt: true,
                currency: true,
                orderNumber: true,
                status: true,
                totalCents: true,
            },
        }),
        prisma.customRequest.findFirst({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            select: {
                createdAt: true,
                status: true,
                type: true,
            },
        }),
    ]);

    const stats = [
        { label: 'Commandes', value: ordersCount },
        { label: 'Favoris', value: favoritesCount },
        { label: 'Demandes', value: requestsCount },
        { label: 'Certificats', value: certificatesCount },
    ];

    return (
        <div className="grid gap-6">
            <header className="grid gap-6 rounded-md border border-white/10 bg-[#08131f]/74 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-7 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Tableau de bord</p>
                    <h1 className="mt-4 font-(family-name:--font-heading) text-5xl leading-none text-white sm:text-7xl">Mon compte</h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">
                        Bonjour {session.user.name ?? session.user.email}. Vos achats, favoris, demandes et certificats vivent ici.
                    </p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 p-5">
                    <UserRound size={22} className="text-(--premium)" />
                    <p className="mt-4 text-sm text-white/50">Profil</p>
                    <p className="mt-1 truncate text-sm font-semibold text-white">{session.user.email}</p>
                </div>
            </header>

            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-md border border-white/10 bg-white/[0.045] p-5">
                        <p className="text-sm text-white/48">{stat.label}</p>
                        <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
                    </div>
                ))}
            </section>

            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_24rem]">
                <div className="grid gap-4 md:grid-cols-2">
                    {accountLinks.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link key={item.href} href={item.href} className="group rounded-md border border-white/10 bg-[#08131f]/72 p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#0d1b2a]/88">
                                <div className="flex items-center justify-between gap-3">
                                    <Icon size={22} className="text-(--premium)" />
                                    <ArrowUpRight size={16} className="text-white/34 transition group-hover:text-white" />
                                </div>
                                <h2 className="mt-5 text-lg font-semibold text-white">{item.label}</h2>
                                <p className="mt-2 text-sm leading-6 text-white/52">{item.description}</p>
                            </Link>
                        );
                    })}
                </div>

                <aside className="grid gap-4">
                    <section className="rounded-md border border-white/10 bg-[#08131f]/78 p-5">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">Dernier achat</p>
                        {latestOrder ? (
                            <Link href={`/mon-compte/commandes/${latestOrder.orderNumber}`} className="mt-4 block">
                                <p className="font-semibold text-white">{latestOrder.orderNumber}</p>
                                <p className="mt-2 text-sm text-white/52">{formatOrderDate(latestOrder.createdAt)} - {getOrderStatusLabel(latestOrder.status)}</p>
                                <p className="mt-3 text-lg font-semibold text-white">{formatOrderPrice(latestOrder.totalCents, latestOrder.currency)}</p>
                            </Link>
                        ) : (
                            <p className="mt-4 text-sm leading-6 text-white/54">Aucun achat pour le moment. La galerie reste ouverte.</p>
                        )}
                    </section>

                    <section className="rounded-md border border-white/10 bg-[#08131f]/78 p-5">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">Derniere demande</p>
                        {latestRequest ? (
                            <div className="mt-4">
                                <p className="font-semibold text-white">{latestRequest.type}</p>
                                <p className="mt-2 text-sm text-white/52">{formatOrderDate(latestRequest.createdAt)} - {latestRequest.status}</p>
                                <Link href="/mon-compte/demandes" className="mt-4 inline-flex text-sm font-medium text-white/72 transition hover:text-white">
                                    Voir le suivi
                                </Link>
                            </div>
                        ) : (
                            <p className="mt-4 text-sm leading-6 text-white/54">Les messages envoyes depuis le site apparaitront ici.</p>
                        )}
                    </section>
                </aside>
            </section>
        </div>
    );
}
