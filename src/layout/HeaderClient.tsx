'use client';

import { ChevronDown, Heart, LayoutDashboard, LogIn, LogOut, Menu, Package, ScrollText, ShieldCheck, ShoppingBag, UserRound, X } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

import { mainNavigationLinks, type NavigationItem } from '@/content/site/navigation';
import type { UserRole } from '@/domain/ecommerce';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';

import { HeaderNav } from './header/HeaderNav';

export interface HeaderViewer {
    email?: string | null;
    name?: string | null;
    role: UserRole;
}

interface HeaderClientProps {
    cartQuantity: number;
    className?: string;
    favoriteCount: number;
    viewer: HeaderViewer | null;
}

const navigationLinks: NavigationItem[] = [...mainNavigationLinks, { href: '/contact', label: 'Contact' }];

const accountLinks = [
    { href: '/mon-compte', label: 'Tableau de bord', icon: UserRound },
    { href: '/mon-compte/commandes', label: 'Commandes', icon: Package },
    { href: '/mon-compte/favoris', label: 'Favoris', icon: Heart },
    { href: '/mon-compte/demandes', label: 'Demandes', icon: ScrollText },
] as const;

function CountBadge({ value }: { value: number }) {
    if (value <= 0) return null;

    return (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--accent) px-1 text-[10px] font-semibold text-white ring-2 ring-[#050A12]">
            {value > 9 ? '9+' : value}
        </span>
    );
}

function IconLink({ href, label, count, children }: { children: ReactNode; count?: number; href: string; label: string }) {
    return (
        <Link href={href} aria-label={label} title={label} className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/72 transition hover:border-white/24 hover:bg-white/9 hover:text-white">
            {children}
            <CountBadge value={count ?? 0} />
        </Link>
    );
}

interface AccountDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onSignOut: () => void;
    onToggle: () => void;
    viewer: HeaderViewer | null;
}

function AccountDropdown({ isOpen, onClose, onSignOut, onToggle, viewer }: AccountDropdownProps) {
    const isLoggedIn = !!viewer;
    const displayName = viewer?.name || viewer?.email || 'Compte';
    const isAdmin = viewer?.role === 'ADMIN';

    return (
        <div className="relative">
            <button
                type="button"
                onClick={onToggle}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-2 pr-3 text-left text-sm font-medium text-white/76 transition hover:border-white/22 hover:bg-white/9 hover:text-white"
                aria-expanded={isOpen}
                aria-haspopup="menu"
            >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--accent)/22 text-white">
                    <UserRound size={15} />
                </span>
                <span className="hidden max-w-32 truncate xl:block">{isLoggedIn ? displayName : 'Compte'}</span>
                <ChevronDown size={14} className={cn('shrink-0 transition', isOpen && 'rotate-180')} />
            </button>

            <div
                className={cn(
                    'absolute right-0 top-full mt-3 w-80 overflow-hidden rounded-md border border-white/10 bg-[#07111d]/96 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.48)] backdrop-blur-2xl transition',
                    isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0',
                )}
                role="menu"
            >
                {isLoggedIn ? (
                    <>
                        <div className="border-b border-white/8 px-3 py-3">
                            <p className="truncate text-sm font-semibold text-white">{displayName}</p>
                            <p className="mt-1 truncate text-xs text-white/42">{viewer?.email}</p>
                        </div>
                        <div className="py-2">
                            {accountLinks.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link key={item.href} href={item.href} onClick={onClose} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/68 transition hover:bg-white/6 hover:text-white" role="menuitem">
                                        <Icon size={16} className="text-white/42" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                            {isAdmin ? (
                                <Link href="/admin" onClick={onClose} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/68 transition hover:bg-white/6 hover:text-white" role="menuitem">
                                    <LayoutDashboard size={16} className="text-white/42" />
                                    Admin
                                </Link>
                            ) : null}
                        </div>
                        <button type="button" onClick={onSignOut} className="flex w-full items-center gap-3 border-t border-white/8 px-3 py-3 text-left text-sm text-white/62 transition hover:bg-white/6 hover:text-white" role="menuitem">
                            <LogOut size={16} className="text-white/42" />
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <>
                        <div className="border-b border-white/8 px-3 py-3">
                            <p className="text-sm font-semibold text-white">Bienvenue chez Norel Art</p>
                            <p className="mt-1 text-xs leading-5 text-white/48">Conservez vos favoris, retrouvez vos achats et suivez vos demandes depuis un espace client.</p>
                        </div>
                        <div className="grid gap-2 p-2">
                            <Link href="/connexion" onClick={onClose} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white/76 transition hover:bg-white/8 hover:text-white">
                                <LogIn size={16} />
                                Connexion
                            </Link>
                            <Link href="/inscription" onClick={onClose} className="inline-flex min-h-11 items-center justify-center rounded-full bg-(--accent) px-4 text-sm font-semibold text-white transition hover:opacity-90">
                                Créer un compte
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export function HeaderClient({ cartQuantity, className, favoriteCount, viewer }: HeaderClientProps) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);

    const isLoggedIn = !!viewer;
    const displayName = viewer?.name || viewer?.email || 'Compte';
    const isAdmin = viewer?.role === 'ADMIN';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 16);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : previousOverflow || '';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isMobileMenuOpen]);

    const closeMenus = () => {
        setIsAccountOpen(false);
        setIsMobileMenuOpen(false);
    };

    const handleSignOut = () => {
        closeMenus();
        void signOut({ callbackUrl: '/' });
    };

    return (
        <>
            <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-500', className)}>
                <div aria-hidden="true" className={cn('pointer-events-none absolute inset-x-0 top-0 h-28 transition-opacity duration-500', isScrolled ? 'opacity-100' : 'opacity-80')}>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.92)_0%,rgba(5,10,18,0.48)_58%,rgba(5,10,18,0)_100%)]" />
                </div>

                <Container className="relative">
                    <div
                        className={cn(
                            'mt-3 grid min-h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-full border px-3 py-2 transition-all duration-500 lg:min-h-[4.25rem] lg:px-4',
                            isScrolled
                                ? 'border-white/12 bg-[rgba(5,10,18,0.84)] shadow-[0_18px_58px_rgba(0,0,0,0.36)] backdrop-blur-2xl'
                                : 'border-white/10 bg-[rgba(5,10,18,0.42)] backdrop-blur-xl',
                        )}
                    >
                        <Link href="/" aria-label="Norel Art - Retour à l’accueil" className="group inline-flex shrink-0 items-center">
                            <span className="relative inline-flex items-center">
                                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-(--accent)/18 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                                <Image src="/images/logo/logo-white.png" alt="Logo Norel Art" width={152} height={56} priority className="relative z-10 h-auto w-24 sm:w-28 xl:w-32" />
                            </span>
                        </Link>

                        <HeaderNav links={navigationLinks} pathname={pathname} />

                        <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                            <div className="hidden items-center gap-1.5 lg:flex">
                                <IconLink href="/mon-compte/favoris" label="Mes favoris" count={favoriteCount}>
                                    <Heart size={17} />
                                </IconLink>
                                <IconLink href="/panier" label="Panier" count={cartQuantity}>
                                    <ShoppingBag size={17} />
                                </IconLink>
                                <AccountDropdown
                                    isOpen={isAccountOpen}
                                    onClose={() => setIsAccountOpen(false)}
                                    onSignOut={handleSignOut}
                                    onToggle={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsAccountOpen((value) => !value);
                                    }}
                                    viewer={viewer}
                                />
                            </div>

                            <button
                                type="button"
                                aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                                aria-expanded={isMobileMenuOpen}
                                onClick={() => {
                                    setIsAccountOpen(false);
                                    setIsMobileMenuOpen((previous) => !previous);
                                }}
                                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white transition duration-300 hover:bg-white/8 lg:hidden"
                            >
                                {isMobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
                            </button>
                        </div>
                    </div>
                </Container>
            </header>

            <div
                className={cn(
                    'fixed inset-0 z-40 bg-[rgba(7,12,20,0.72)] backdrop-blur-md transition-all duration-300 lg:hidden',
                    isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            />

            <div
                className={cn(
                    'fixed inset-x-4 top-20 z-50 origin-top rounded-3xl border border-white/10 bg-[rgba(5,10,18,0.97)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 lg:hidden',
                    isMobileMenuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0',
                )}
            >
                <div className="mb-4 border-b border-white/10 pb-4">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-white/35">Norel Art</p>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-white/72">{isLoggedIn ? `Connectée : ${displayName}` : 'Explorer, sauvegarder, acheter ou créer un compte.'}</p>
                </div>

                <nav aria-label="Navigation mobile" className="space-y-2">
                    {navigationLinks.map((item) => (
                        <Link key={item.href} href={item.href} onClick={closeMenus} className="flex items-center justify-between rounded-2xl border border-transparent bg-white/2 px-4 py-3 text-sm text-white/72 transition hover:border-white/10 hover:bg-white/5 hover:text-white">
                            <span>{item.label}</span>
                            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white/20" />
                        </Link>
                    ))}
                </nav>

                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                    <Link href="/mon-compte/favoris" onClick={closeMenus} className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/4 text-sm font-medium text-white/70 transition hover:bg-white/8 hover:text-white">
                        <Heart size={17} />
                        Favoris {favoriteCount > 0 ? `(${favoriteCount})` : ''}
                    </Link>
                    <Link href="/panier" onClick={closeMenus} className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/4 text-sm font-medium text-white/70 transition hover:bg-white/8 hover:text-white">
                        <ShoppingBag size={17} />
                        Panier {cartQuantity > 0 ? `(${cartQuantity})` : ''}
                    </Link>
                </div>

                {isLoggedIn ? (
                    <div className="mt-3 grid gap-2">
                        <Link href="/mon-compte" onClick={closeMenus} className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-(--accent) px-5 text-sm font-semibold text-white transition hover:opacity-90">
                            Mon compte
                        </Link>
                        {isAdmin ? (
                            <Link href="/admin" onClick={closeMenus} className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white/76 transition hover:bg-white/8 hover:text-white">
                                Admin
                            </Link>
                        ) : null}
                        <button type="button" onClick={handleSignOut} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white/76 transition hover:bg-white/8 hover:text-white">
                            <LogOut size={16} />
                            Déconnexion
                        </button>
                    </div>
                ) : (
                    <div className="mt-3 grid gap-2">
                        <Link href="/connexion" onClick={closeMenus} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white/76 transition hover:bg-white/8 hover:text-white">
                            <LogIn size={16} />
                            Connexion
                        </Link>
                        <Link href="/inscription" onClick={closeMenus} className="inline-flex min-h-11 items-center justify-center rounded-full bg-(--accent) px-5 text-sm font-semibold text-white transition hover:opacity-90">
                            Créer un compte
                        </Link>
                    </div>
                )}

                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white/58">
                    <ShieldCheck size={16} className="text-(--premium)" />
                    Paiement sécurisé, favoris conservés, suivi client.
                </div>
            </div>
        </>
    );
}
