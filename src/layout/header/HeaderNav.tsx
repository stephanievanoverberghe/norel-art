import Link from 'next/link';

import type { NavigationItem } from '@/content/site/navigation';
import { cn } from '@/lib/utils/cn';

import { isActivePath } from './header-utils';

interface HeaderNavProps {
    links: NavigationItem[];
    pathname: string;
    className?: string;
}

export function HeaderNav({ links, pathname, className }: HeaderNavProps) {
    return (
        <nav aria-label="Navigation principale" className={cn('hidden items-center gap-2 lg:flex', className)}>
            {links.map((item) => {
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
                                    : 'border-transparent group-hover:border-white/10 group-hover:bg-white/4',
                            )}
                            aria-hidden="true"
                        />
                        <span className="relative z-10">{item.label}</span>

                        <span
                            aria-hidden="true"
                            className={cn(
                                'absolute bottom-1.75 left-1/2 h-px -translate-x-1/2 bg-(--accent) transition-all duration-300',
                                active ? 'w-8 opacity-100' : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-100',
                            )}
                        />
                    </Link>
                );
            })}
        </nav>
    );
}
