'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { ExternalLink, LogOut } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import { adminNavigation, getActiveAdminNavigationItem, isAdminNavigationItemActive } from './adminNavigation';

export function AdminHeader() {
    const pathname = usePathname();
    const activeItem = getActiveAdminNavigationItem(pathname);
    const ActiveIcon = activeItem.icon;

    return (
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#060c15]/78 px-4 py-3 backdrop-blur-2xl sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/38">Atelier prive</p>
                    <div className="mt-1 flex items-center gap-2">
                        <ActiveIcon size={18} className="text-(--accent)" />
                        <p className="truncate text-base font-semibold text-white sm:text-lg">{activeItem.label}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Link href="/" className="hidden min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/4 px-3 text-sm font-medium text-white/62 transition hover:bg-white/8 hover:text-white sm:inline-flex">
                        Site
                        <ExternalLink size={15} />
                    </Link>
                    <button
                        type="button"
                        onClick={() => void signOut({ callbackUrl: '/' })}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/4 px-3 text-sm font-medium text-white/62 transition hover:bg-white/8 hover:text-white"
                    >
                        <LogOut size={15} />
                        <span className="hidden sm:inline">Sortir</span>
                    </button>
                </div>
            </div>

            <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Navigation admin mobile">
                {adminNavigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = isAdminNavigationItemActive(pathname, item);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md border px-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition',
                                isActive ? 'border-(--accent)/35 bg-(--accent)/18 text-white' : 'border-white/10 bg-white/4 text-white/46 hover:text-white',
                            )}
                        >
                            <Icon size={14} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}
