'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { FresquesSectionNavItem } from '@/domain/fresques/types';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';

interface FresquesSectionNavProps {
    items: FresquesSectionNavItem[];
    className?: string;
}

const NAV_OFFSET = 170;

export function FresquesSectionNav({ items, className }: FresquesSectionNavProps) {
    const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
    const railRef = useRef<HTMLDivElement | null>(null);

    const itemIds = useMemo(() => items.map((item) => item.id), [items]);

    useEffect(() => {
        const sections = itemIds.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => element instanceof HTMLElement);

        if (sections.length === 0) {
            return;
        }

        const updateActiveSection = () => {
            const scrollPosition = window.scrollY + NAV_OFFSET;
            let currentSectionId = sections[0]?.id ?? '';

            for (const section of sections) {
                if (scrollPosition >= section.offsetTop) {
                    currentSectionId = section.id;
                }
            }

            setActiveId(currentSectionId);
        };

        updateActiveSection();

        window.addEventListener('scroll', updateActiveSection, { passive: true });
        window.addEventListener('resize', updateActiveSection);

        return () => {
            window.removeEventListener('scroll', updateActiveSection);
            window.removeEventListener('resize', updateActiveSection);
        };
    }, [itemIds]);

    useEffect(() => {
        const activeLink = railRef.current?.querySelector<HTMLAnchorElement>(`a[data-section-id="${activeId}"]`);

        activeLink?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, [activeId]);

    const handleNavigate = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        const section = document.getElementById(id);

        if (!section) {
            return;
        }

        const top = section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET + 8;

        window.scrollTo({ top, behavior: 'smooth' });

        setActiveId(id);
    };

    return (
        <div className={cn('sticky top-22 z-40 pb-4 pt-3', 'bg-[linear-gradient(180deg,rgba(5,10,18,0.94)_0%,rgba(9,18,30,0.82)_64%,rgba(5,10,18,0)_100%)]', className)}>
            <Container>
                <nav aria-label="Navigation interne de la page fresques" className="relative">
                    <div
                        ref={railRef}
                        className={cn(
                            'overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
                            'mask-[linear-gradient(to_right,transparent,black_1rem,black_calc(100%-1rem),transparent)]',
                        )}
                    >
                        <div className="mx-auto flex min-w-max items-center gap-2 rounded-[1.35rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:rounded-full sm:gap-2.5">
                            {items.map((item, index) => {
                                const isActive = activeId === item.id;

                                return (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        data-section-id={item.id}
                                        onClick={handleNavigate(item.id)}
                                        aria-current={isActive ? 'true' : undefined}
                                        className={cn(
                                            'group relative inline-flex min-h-11 shrink-0 items-center rounded-2xl px-3.5 transition-all duration-300 sm:rounded-full sm:px-4.5',
                                            isActive ? 'text-white' : 'text-white/44 hover:text-white/76',
                                        )}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                'absolute inset-0 rounded-2xl border transition-all duration-300 sm:rounded-full',
                                                isActive
                                                    ? 'border-white/12 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
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
