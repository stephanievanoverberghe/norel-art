import { FileBadge, Heart, Home, MapPin, Package, ScrollText, ShoppingBag, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

interface AccountShellProps {
    children: ReactNode;
    user: {
        email?: string | null;
        name?: string | null;
    };
}

const accountNavigation = [
    { href: '/mon-compte', label: 'Tableau', icon: Home },
    { href: '/mon-compte/commandes', label: 'Commandes', icon: Package },
    { href: '/mon-compte/favoris', label: 'Favoris', icon: Heart },
    { href: '/mon-compte/demandes', label: 'Demandes', icon: ScrollText },
    { href: '/mon-compte/certificats', label: 'Certificats', icon: FileBadge },
    { href: '/mon-compte/profil', label: 'Profil', icon: UserRound },
    { href: '/mon-compte/adresses', label: 'Adresses', icon: MapPin },
] as const;

export function AccountShell({ children, user }: AccountShellProps) {
    return (
        <div className="norel-bg-shell norel-bg-commerce min-h-screen text-white">
            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[92rem] flex-col px-4 py-5 sm:px-6 lg:px-8">
                <header className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" aria-label="Retour Norel Art" className="inline-flex">
                            <Image src="/images/logo/logo-white.png" alt="Logo Norel Art" width={140} height={52} className="h-auto w-28" />
                        </Link>
                        <div className="hidden h-9 w-px bg-white/10 sm:block" />
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.26em] text-white/38">Espace collectionneur</p>
                            <p className="mt-1 text-sm text-white/62">{user.name ?? user.email}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Link href="/oeuvres" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white/72 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                            <ShoppingBag size={16} />
                            Boutique
                        </Link>
                        <Link href="/panier" className="inline-flex min-h-10 items-center justify-center rounded-full bg-(--accent) px-4 text-sm font-semibold text-white transition hover:opacity-90">
                            Panier
                        </Link>
                    </div>
                </header>

                <div className="grid flex-1 gap-6 py-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
                    <aside className="lg:sticky lg:top-6 lg:h-fit">
                        <nav aria-label="Navigation compte" className="grid gap-2 rounded-md border border-white/10 bg-[#08131f]/74 p-2 backdrop-blur-xl">
                            {accountNavigation.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-white/62 transition hover:bg-white/6 hover:text-white',
                                            item.href === '/mon-compte' && 'lg:border-b lg:border-white/8',
                                        )}
                                    >
                                        <Icon size={16} className="text-white/46" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>

                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}
