import { ArrowUpRight, FileBadge, Heart, PackageCheck, UserRound } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

const accountMoments = [
    {
        title: 'Favoris',
        description: 'Garder les regards qui reviennent en tête avant de choisir.',
        href: '/mon-compte/favoris',
        icon: Heart,
    },
    {
        title: 'Achats',
        description: 'Retrouver commandes, statuts et détails après paiement.',
        href: '/mon-compte/commandes',
        icon: PackageCheck,
    },
    {
        title: 'Certificats',
        description: 'Préparer un espace pour les pièces et éditions signées.',
        href: '/mon-compte/certificats',
        icon: FileBadge,
    },
] as const;

export function HomeCollectorExperienceSection() {
    return (
        <section className="marketing-section marketing-bg-night py-16 sm:py-20 lg:py-24" aria-label="Espace collectionneur Norel Art">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/16 to-transparent" />

            <Container className="relative z-10">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.32em] text-white/42">Espace client</p>
                        <Heading level={2} className="mt-4 max-w-xl text-white">
                            Une boutique qui garde la mémoire de vos pièces.
                        </Heading>
                        <Text variant="muted" className="mt-5 max-w-2xl text-white/66">
                            Le compte n’est pas un simple formulaire de connexion : il devient le carnet personnel des œuvres aimées, achetées, attendues ou commandées sur mesure.
                        </Text>
                        <Link href="/inscription" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-white/22 hover:bg-white/8">
                            Ouvrir mon espace
                        </Link>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                        {accountMoments.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link key={item.href} href={item.href} className="group rounded-md border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/[0.055]">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-(--accent)">
                                            <Icon size={18} />
                                        </span>
                                        <ArrowUpRight size={15} className="text-white/32 transition group-hover:text-white" />
                                    </div>
                                    <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-white/54">{item.description}</p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6 text-sm text-white/52">
                    <UserRound size={16} className="text-white/42" />
                    <span>Connexion, achats, favoris et demandes sont maintenant au centre du parcours.</span>
                </div>
            </Container>
        </section>
    );
}
