'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

import { adminNavigation, isAdminNavigationItemActive } from './adminNavigation';

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#07111d]/82 px-4 py-5 shadow-[20px_0_70px_rgba(0,0,0,0.25)] backdrop-blur-2xl lg:flex lg:flex-col">
            <Link href="/admin" className="flex items-center gap-3 rounded-md border border-white/8 bg-white/4 p-3 transition hover:border-white/14 hover:bg-white/6">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-[#0d1b2a]">
                    <Image src="/images/logo/logo-white.png" alt="Norel Art" fill sizes="44px" className="object-contain p-2" priority />
                </span>
                <span className="min-w-0">
                    <span className="block font-(family-name:--font-heading) text-2xl leading-none text-white">Norel Art</span>
                    <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">Back-office</span>
                </span>
            </Link>

            <nav className="mt-6 flex-1 space-y-1.5" aria-label="Navigation admin">
                {adminNavigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = isAdminNavigationItemActive(pathname, item);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'group flex items-center gap-3 rounded-md border px-3 py-3 text-sm transition',
                                isActive
                                    ? 'border-(--accent)/30 bg-(--accent)/18 text-white shadow-[inset_3px_0_0_var(--accent)]'
                                    : 'border-transparent text-white/58 hover:border-white/10 hover:bg-white/5 hover:text-white',
                            )}
                        >
                            <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition', isActive ? 'border-(--accent)/35 bg-(--accent)/18 text-white' : 'border-white/8 bg-white/4 text-white/48 group-hover:text-white/78')}>
                                <Icon size={17} />
                            </span>
                            <span className="min-w-0">
                                <span className="block font-medium">{item.label}</span>
                                <span className="mt-0.5 block truncate text-xs text-white/34">{item.description}</span>
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <Link href="/" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/4 px-4 text-sm font-medium text-white/62 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                Voir le site
                <ExternalLink size={15} />
            </Link>
        </aside>
    );
}
