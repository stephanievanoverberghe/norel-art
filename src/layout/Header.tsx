'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { mainNavigationLinks } from '@/content/site/navigation';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Button } from '@/ui/Button';

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
                <div
                    aria-hidden="true"
                    className={cn('pointer-events-none absolute inset-x-0 top-0 h-28 transition-opacity duration-500', isScrolled ? 'opacity-100' : 'opacity-80')}
                >
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,16,26,0.82)_0%,rgba(8,16,26,0.5)_48%,rgba(8,16,26,0)_100%)]" />
                </div>

                <Container className="relative">
                    <div
                        className={cn(
                            'mt-4 flex min-h-20 items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 sm:px-5 lg:px-6',
                            isScrolled ? 'border-white/12 bg-[rgba(8,16,26,0.66)] shadow-[0_12px_56px_rgba(0,0,0,0.32)] backdrop-blur-xl' : 'border-white/10 bg-transparent',
                        )}
                    >
                        <div className="flex min-w-0 items-center gap-4">
                            <Link href="/" aria-label="Norel Art - Retour à l’accueil" className="group inline-flex shrink-0 items-center">
                                <span className="relative inline-flex items-center">
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 rounded-full bg-white/8 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                                    />
                                    <Image
                                        src="/images/logo/logo-white.png"
                                        alt="Logo Norel Art"
                                        width={152}
                                        height={56}
                                        priority
                                        className="relative z-10 h-auto w-27 sm:w-31 lg:w-37"
                                    />
                                </span>
                            </Link>

                            <div className="hidden xl:block">
                                <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">L’art du regard</p>
                                <p className="mt-1 text-sm text-white/62">Entrer. Regarder. Ressentir.</p>
                            </div>
                        </div>

                        <HeaderNav links={mainNavigationLinks} pathname={pathname} />

                        <div className="hidden items-center gap-3 lg:flex">
                            <Link href="/contact">
                                <Button variant="secondary" className="rounded-full border-white/12 bg-white/3 px-5 py-2.5 text-white hover:bg-white/6">
                                    Me confier un projet
                                </Button>
                            </Link>
                        </div>

                        <HeaderMobileToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((previous) => !previous)} />
                    </div>
                </Container>
            </header>

            <HeaderMobilePanel
                isOpen={isMobileMenuOpen}
                pathname={pathname}
                links={mainNavigationLinks}
                onClose={() => setIsMobileMenuOpen(false)}
                onNavigate={() => setIsMobileMenuOpen(false)}
            />
        </>
    );
}
