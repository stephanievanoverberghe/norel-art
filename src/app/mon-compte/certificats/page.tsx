import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileBadge } from 'lucide-react';
import { redirect } from 'next/navigation';

import { getCurrentSession } from '@/server/auth/session';
import { prisma } from '@/server/db/prisma';

export const metadata: Metadata = {
    title: 'Mes certificats',
    description: 'Certificats Norel Art.',
};

export default async function AccountCertificatesPage() {
    const session = await getCurrentSession();

    if (!session?.user?.id) {
        redirect('/connexion?callbackUrl=/mon-compte/certificats');
    }

    const certificates = await prisma.certificate.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            artwork: {
                select: {
                    slug: true,
                    title: true,
                },
            },
        },
        orderBy: {
            issuedAt: 'desc',
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
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Authenticité</p>
                    <h1 className="mt-4 font-(family-name:--font-heading) text-5xl leading-none text-white sm:text-7xl">Certificats</h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">Un espace prêt pour les certificats liés aux œuvres et éditions achetées.</p>
                </div>
                <div className="inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-md border border-white/12 bg-white/8 px-4">
                    <FileBadge size={22} />
                    <span className="text-sm font-semibold">{certificates.length}</span>
                </div>
            </header>

            {certificates.length > 0 ? (
                <section className="grid gap-4 md:grid-cols-2">
                    {certificates.map((certificate) => (
                        <article key={certificate.id} className="rounded-md border border-white/10 bg-[#08131f]/78 p-5">
                            <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">{certificate.certificateNumber}</p>
                            <h2 className="mt-4 text-xl font-semibold text-white">{certificate.artwork.title}</h2>
                            <p className="mt-2 text-sm text-white/52">Émis le {certificate.issuedAt.toLocaleDateString('fr-FR')}</p>
                            <Link href={`/oeuvres/${certificate.artwork.slug}`} className="mt-5 inline-flex text-sm font-medium text-white/72 transition hover:text-white">
                                Voir l’œuvre
                            </Link>
                        </article>
                    ))}
                </section>
            ) : (
                <section className="max-w-xl rounded-md border border-white/10 bg-[#08131f]/78 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/42">Aucun certificat</p>
                    <h2 className="mt-4 text-2xl font-semibold text-white">Les certificats arriveront après achat.</h2>
                    <p className="mt-3 text-sm leading-6 text-white/56">Le socle est prêt pour rattacher les pièces signées à votre espace.</p>
                    <Link href="/oeuvres" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-(--accent) px-5 text-sm font-medium text-white transition hover:opacity-90">
                        Explorer les œuvres
                    </Link>
                </section>
            )}
        </div>
    );
}
