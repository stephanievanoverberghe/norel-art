'use client';

import { Heart, ShoppingBag, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { mainNavigationLinks } from '@/content/site/navigation';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';

import { HeaderMobilePanel } from './header/HeaderMobilePanel';
import { HeaderMobileToggle } from './header/HeaderMobileToggle';
import { HeaderNav } from './header/HeaderNav';

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;

        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = previousOverflow || '';
        }

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-500', className)}>
                <div aria-hidden="true" className={cn('pointer-events-none absolute inset-x-0 top-0 h-28 transition-opacity duration-500', isScrolled ? 'opacity-100' : 'opacity-80')}>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.9)_0%,rgba(5,10,18,0.5)_52%,rgba(5,10,18,0)_100%)]" />
                </div>

                <Container className="relative">
                    <div
                        className={cn(
                            'mt-4 flex min-h-20 items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 sm:px-5 lg:px-6',
                            isScrolled
                                ? 'border-white/12 bg-[rgba(5,10,18,0.74)] shadow-[0_18px_70px_rgba(0,0,0,0.38)] backdrop-blur-2xl'
                                : 'border-white/10 bg-[rgba(5,10,18,0.2)] backdrop-blur-[2px]',
                        )}
                    >
                        <div className="flex min-w-0 items-center gap-4">
                            <Link href="/" aria-label="Norel Art - Retour a l'accueil" className="group inline-flex shrink-0 items-center">
                                <span className="relative inline-flex items-center">
                                    <span aria-hidden="true" className="absolute inset-0 rounded-full bg-(--accent)/18 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                                    <Image src="/images/logo/logo-white.png" alt="Logo Norel Art" width={152} height={56} priority className="relative z-10 h-auto w-27 sm:w-31 lg:w-37" />
                                </span>
                            </Link>

                            <div className="hidden xl:block">
                                <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">Galerie e-commerce</p>
                                <p className="mt-1 text-sm text-white/62">Entrer. Regarder. Ressentir.</p>
                            </div>
                        </div>

                        <HeaderNav links={mainNavigationLinks} pathname={pathname} />

                        <div className="hidden items-center gap-2 lg:flex">
                            <Link href="/mon-compte/favoris" aria-label="Mes favoris" title="Mes favoris" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/70 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                                <Heart size={17} />
                            </Link>
                            <Link href="/panier" aria-label="Panier" title="Panier" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/70 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                                <ShoppingBag size={17} />
                            </Link>
                            <Link href="/mon-compte" aria-label="Mon compte" title="Mon compte" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/70 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                                <UserRound size={17} />
                            </Link>
                            <Link href="/oeuvres" className="ml-1 inline-flex min-h-11 items-center justify-center rounded-full bg-(--accent) px-5 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(158,0,49,0.24)] transition hover:opacity-90">
                                Voir la boutique
                            </Link>
                        </div>

                        <HeaderMobileToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((previous) => !previous)} />
                    </div>
                </Container>
            </header>

            <HeaderMobilePanel isOpen={isMobileMenuOpen} pathname={pathname} links={mainNavigationLinks} onClose={() => setIsMobileMenuOpen(false)} onNavigate={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
