'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils/cn';
import type { CommandesSectionNavItem } from '@/domain/commandes/types';
import { Container } from '@/ui/Container';

interface CommandesSectionNavProps {
    items: CommandesSectionNavItem[];
    className?: string;
}

export function CommandesSectionNav({ items, className }: CommandesSectionNavProps) {
    const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
    const railRef = useRef<HTMLDivElement | null>(null);

    const itemIds = useMemo(() => items.map((item) => item.id), [items]);

    useEffect(() => {
        const sectionElements = itemIds.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => element instanceof HTMLElement);

        if (sectionElements.length === 0) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visibleEntries.length > 0) {
                    setActiveId(visibleEntries[0].target.id);
                }
            },
            {
                rootMargin: '-18% 0px -58% 0px',
                threshold: [0.12, 0.25, 0.4, 0.6],
            },
        );

        sectionElements.forEach((element) => observer.observe(element));

        return () => {
            sectionElements.forEach((element) => observer.unobserve(element));
            observer.disconnect();
        };
    }, [itemIds]);

    useEffect(() => {
        const activeLink = railRef.current?.querySelector<HTMLAnchorElement>(`a[data-section-id="${activeId}"]`);

        activeLink?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
        });
    }, [activeId]);

    return (
        <div className={cn('sticky top-22 z-40 pb-4 pt-3', 'bg-[linear-gradient(180deg,rgba(13,27,42,0.96)_0%,rgba(13,27,42,0.82)_64%,rgba(13,27,42,0)_100%)]', className)}>
            <Container>
                <nav aria-label="Navigation des sections de la page commandes" className="relative">
                    <div
                        ref={railRef}
                        className={cn(
                            'overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
                            'mask-[linear-gradient(to_right,transparent,black_1rem,black_calc(100%-1rem),transparent)]',
                        )}
                    >
                        <div
                            className={cn(
                                'mx-auto flex min-w-max items-center gap-2 rounded-[1.4rem] border border-white/10 bg-[rgba(255,255,255,0.035)] p-1.5 shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-2xl',
                                'sm:gap-2.5 sm:rounded-full',
                            )}
                        >
                            {items.map((item, index) => {
                                const isActive = activeId === item.id;

                                return (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        data-section-id={item.id}
                                        className={cn(
                                            'group relative inline-flex min-h-11 shrink-0 items-center rounded-2xl px-3.5 transition-all duration-300 sm:min-h-11 sm:rounded-full sm:px-4.5',
                                            isActive ? 'text-white' : 'text-white/42 hover:text-white/74',
                                        )}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                'absolute inset-0 rounded-[2xl border transition-all duration-300 sm:rounded-full',
                                                isActive
                                                    ? 'border-white/12 bg-white/9 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                                                    : 'border-transparent bg-transparent group-hover:border-white/10 group-hover:bg-white/4.5',
                                            )}
                                        />

                                        <span className="relative z-10 flex items-center gap-3">
                                            <span
                                                className={cn(
                                                    'inline-flex h-6 min-w-6 items-center justify-center rounded-full border px-1.5 text-[9px] uppercase tracking-[0.16em] transition-all duration-300',
                                                    isActive
                                                        ? 'border-white/12 bg-(--accent)/18 text-white/82'
                                                        : 'border-white/8 bg-white/3 text-white/34 group-hover:border-white/10 group-hover:text-white/52',
                                                )}
                                            >
                                                {String(index + 1).padStart(2, '0')}
                                            </span>

                                            <span className="text-[10px] uppercase tracking-[0.2em] sm:text-[11px] sm:tracking-[0.22em]">{item.label}</span>
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            </Container>
        </div>
    );
}
