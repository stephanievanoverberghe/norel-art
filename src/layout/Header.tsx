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
                    className={cn('pointer-events-none absolute inset-x-0 top-0 h-32 transition-opacity duration-500', isScrolled ? 'opacity-100' : 'opacity-70')}
                >
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,27,42,0.88)_0%,rgba(13,27,42,0.55)_55%,rgba(13,27,42,0)_100%)]" />
                    <div className="absolute left-1/2 top-0 h-24 w-xl -translate-x-1/2 rounded-full bg-(--accent)/10 blur-3xl" />
                    <div className="absolute right-0 top-0 h-20 w-40 bg-(--surface)/15 blur-2xl" />
                </div>

                <Container className="relative">
                    <div
                        className={cn(
                            'mt-4 flex min-h-20 items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 sm:px-5 lg:px-6',
                            isScrolled
                                ? 'border-white/10 bg-[rgba(13,27,42,0.72)] shadow-[0_10px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl'
                                : 'border-white/8 bg-[rgba(13,27,42,0.28)] backdrop-blur-md',
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
                                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">L’art du regard</p>
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
