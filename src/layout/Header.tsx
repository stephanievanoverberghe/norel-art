'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { cn } from '@/lib/utils/cn';

const navigation = [
    { label: 'Œuvres', href: '/oeuvres' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Commandes', href: '/commandes' },
    { label: 'Fresques', href: '/fresques-murales' },
];

interface HeaderProps {
    className?: string;
}

function isActivePath(pathname: string, href: string) {
    if (href === '/') {
        return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
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
        setIsMobileMenuOpen(false);
    }, [pathname]);

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
                    <div className="absolute left-1/2 top-0 h-24 w-[36rem] -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-3xl" />
                    <div className="absolute right-0 top-0 h-20 w-40 bg-[var(--secondary)]/15 blur-2xl" />
                </div>

                <Container className="relative">
                    <div
                        className={cn(
                            'mt-4 flex min-h-20 items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 sm:px-5 lg:px-6',
                            isScrolled
                                ? 'border-white/10 bg-[color:rgba(13,27,42,0.72)] shadow-[0_10px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl'
                                : 'border-white/8 bg-[color:rgba(13,27,42,0.28)] backdrop-blur-md',
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
                                        className="relative z-10 h-auto w-[108px] sm:w-[124px] lg:w-[148px]"
                                    />
                                </span>
                            </Link>

                            <div className="hidden xl:block">
                                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">L’art du regard</p>
                                <p className="mt-1 text-sm text-white/62">Entrer. Regarder. Ressentir.</p>
                            </div>
                        </div>

                        <nav aria-label="Navigation principale" className="hidden items-center gap-2 lg:flex">
                            {navigation.map((item) => {
                                const active = isActivePath(pathname, item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'group relative inline-flex items-center rounded-full px-4 py-2.5 text-sm font-medium tracking-[0.02em] transition-all duration-300',
                                            active ? 'text-white' : 'text-white/68 hover:text-white',
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'absolute inset-0 rounded-full border transition-all duration-300',
                                                active
                                                    ? 'border-white/12 bg-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                                                    : 'border-transparent group-hover:border-white/10 group-hover:bg-white/[0.04]',
                                            )}
                                            aria-hidden="true"
                                        />
                                        <span className="relative z-10">{item.label}</span>

                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                'absolute bottom-[7px] left-1/2 h-px -translate-x-1/2 bg-[var(--accent)] transition-all duration-300',
                                                active ? 'w-8 opacity-100' : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-100',
                                            )}
                                        />
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="hidden items-center gap-3 lg:flex">
                            <Link href="/contact">
                                <Button variant="secondary" className="rounded-full border-white/12 bg-white/[0.03] px-5 py-2.5 text-white hover:bg-white/[0.06]">
                                    Me confier un visage
                                </Button>
                            </Link>
                        </div>

                        <button
                            type="button"
                            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                            aria-expanded={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition duration-300 hover:bg-white/[0.08] lg:hidden"
                        >
                            <span className="relative block h-4 w-5">
                                <span className={cn('absolute left-0 top-0 block h-px w-5 bg-current transition-all duration-300', isMobileMenuOpen && 'top-[7px] rotate-45')} />
                                <span className={cn('absolute left-0 top-[7px] block h-px w-5 bg-current transition-all duration-300', isMobileMenuOpen && 'opacity-0')} />
                                <span
                                    className={cn('absolute left-0 top-[14px] block h-px w-5 bg-current transition-all duration-300', isMobileMenuOpen && 'top-[7px] -rotate-45')}
                                />
                            </span>
                        </button>
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
                    'fixed inset-x-4 top-[5.75rem] z-50 origin-top rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(13,27,42,0.96)_0%,rgba(13,27,42,0.92)_100%)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 lg:hidden',
                    isMobileMenuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0',
                )}
            >
                <div className="mb-5 border-b border-white/10 pb-4">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Norel Art</p>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-white/72">Des regards, des silences, des traces à accueillir.</p>
                </div>

                <nav aria-label="Navigation mobile" className="space-y-2">
                    {navigation.map((item) => {
                        const active = isActivePath(pathname, item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-all duration-300',
                                    active
                                        ? 'border-white/12 bg-white/[0.06] text-white'
                                        : 'border-transparent bg-white/[0.02] text-white/72 hover:border-white/10 hover:bg-white/[0.05] hover:text-white',
                                )}
                            >
                                <span>{item.label}</span>
                                <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-300', active ? 'bg-[var(--accent)]' : 'bg-white/20')} />
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-5 pt-4">
                    <Link href="/contact" className="block">
                        <Button className="w-full rounded-full px-5 py-3">Me confier un visage</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
