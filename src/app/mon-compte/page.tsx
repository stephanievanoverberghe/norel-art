import type { Metadata } from 'next';
import Link from 'next/link';
import { FileBadge, Heart, Package, UserRound } from 'lucide-react';
import { redirect } from 'next/navigation';

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
        description: 'Suivre les achats et les statuts.',
        icon: Package,
    },
    {
        href: '/mon-compte/favoris',
        label: 'Favoris',
        description: 'Retrouver les oeuvres mises de cote.',
        icon: Heart,
    },
    {
        href: '/mon-compte/certificats',
        label: 'Certificats',
        description: 'Acceder aux certificats disponibles.',
        icon: FileBadge,
    },
];

export default async function AccountPage() {
    const session = await getCurrentSession();

    if (!session?.user?.id) {
        redirect('/connexion?callbackUrl=/mon-compte');
    }

    const userId = session.user.id;
    const [ordersCount, favoritesCount, certificatesCount] = await prisma.$transaction([
        prisma.order.count({ where: { userId } }),
        prisma.favorite.count({ where: { userId } }),
        prisma.certificate.count({ where: { userId } }),
    ]);

    const stats = [
        { label: 'Commandes', value: ordersCount },
        { label: 'Favoris', value: favoritesCount },
        { label: 'Certificats', value: certificatesCount },
    ];

    return (
        <main className="min-h-screen bg-(--bg-primary) px-5 py-8 text-white sm:px-8">
            <div className="mx-auto max-w-5xl">
                <header className="flex flex-col gap-6 border-b border-white/12 pb-8 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.26em] text-white/52 transition hover:text-white">
                            Norel Art
                        </Link>
                        <h1 className="mt-8 font-(family-name:--font-heading) text-5xl leading-none sm:text-7xl">Mon compte</h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">
                            Bonjour {session.user.name ?? session.user.email}. Votre espace client est pret pour les parcours e-commerce.
                        </p>
                    </div>
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-md border border-white/12 bg-white/8">
                        <UserRound size={24} />
                    </div>
                </header>

                <section className="grid gap-3 py-8 sm:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-md border border-white/10 bg-white/6 p-5">
                            <p className="text-sm text-white/48">{stat.label}</p>
                            <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
                        </div>
                    ))}
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                    {accountLinks.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group rounded-md border border-white/10 bg-[#08131f]/78 p-5 transition hover:-translate-y-0.5 hover:border-white/22"
                            >
                                <Icon size={22} className="text-white/78" />
                                <h2 className="mt-5 text-lg font-semibold text-white">{item.label}</h2>
                                <p className="mt-2 text-sm leading-6 text-white/52">{item.description}</p>
                                <span className="mt-5 inline-flex text-sm font-medium text-white/72 transition group-hover:text-white">Ouvrir</span>
                            </Link>
                        );
                    })}
                </section>
            </div>
        </main>
    );
}
