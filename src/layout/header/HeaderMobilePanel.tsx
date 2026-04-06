import Link from 'next/link';

import type { NavigationItem } from '@/content/site/navigation';
import { Button } from '@/ui/Button';
import { cn } from '@/lib/utils/cn';

import { isActivePath } from './header-utils';

interface HeaderMobilePanelProps {
    isOpen: boolean;
    pathname: string;
    links: NavigationItem[];
    onClose: () => void;
    onNavigate: () => void;
}

export function HeaderMobilePanel({ isOpen, pathname, links, onClose, onNavigate }: HeaderMobilePanelProps) {
    return (
        <>
            <div
                className={cn(
                    'fixed inset-0 z-40 bg-[rgba(7,12,20,0.72)] backdrop-blur-md transition-all duration-300 lg:hidden',
                    isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
                )}
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                className={cn(
                    'fixed inset-x-4 top-23 z-50 origin-top rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(13,27,42,0.96)_0%,rgba(13,27,42,0.92)_100%)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 lg:hidden',
                    isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0',
                )}
            >
                <div className="mb-5 border-b border-white/10 pb-4">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Norel Art</p>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-white/72">Des regards, des silences, des traces à accueillir.</p>
                </div>

                <nav aria-label="Navigation mobile" className="space-y-2">
                    {links.map((item) => {
                        const active = isActivePath(pathname, item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onNavigate}
                                className={cn(
                                    'flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-all duration-300',
                                    active
                                        ? 'border-white/12 bg-white/6 text-white'
                                        : 'border-transparent bg-white/2 text-white/72 hover:border-white/10 hover:bg-white/5 hover:text-white',
                                )}
                            >
                                <span>{item.label}</span>
                                <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full transition-colors duration-300', active ? 'bg-(--accent)' : 'bg-white/20')} />
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-5 pt-4">
                    <Link href="/contact" className="block" onClick={onNavigate}>
                        <Button className="w-full rounded-full px-5 py-3">Me confier un projet</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
