import Image from 'next/image';

import { cn } from '@/lib/utils/cn';
import type { AboutHeroContent } from '@/domain/about/types';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

import { SplitLines } from './shared/SplitLines';
import { marketingPageSpacing } from '@/layout/marketing/page-spacing';

import { aboutSectionStyles } from './shared/about-styles';

interface AboutHeroProps {
    content: AboutHeroContent;
    className?: string;
}

export function AboutHero({ content, className }: AboutHeroProps) {
    return (
        <section
            aria-label="À propos de Norel Art"
            className={cn('relative overflow-hidden pb-16 sm:pb-20 lg:pb-24', aboutSectionStyles.pageBackground, marketingPageSpacing.editorialOffset, className)}
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.58)_0%,rgba(5,10,18,0.2)_28%,rgba(5,10,18,0)_60%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute right-24 top-16 h-80 w-80 rounded-full bg-(--accent)/12 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-20 h-28 w-md -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

            <Container className="relative z-10">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14 xl:gap-20">
                    <div className="relative order-2 lg:order-1">
                        <p
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-10 left-0 hidden text-[clamp(4.5rem,10vw,8rem)] font-semibold uppercase tracking-[-0.06em] text-white/3 lg:block"
                        >
                            A propos
                        </p>
                        <p className="text-[11px] uppercase tracking-[0.34em] text-white/42">À propos</p>

                        <Heading level={1} className="mt-5 max-w-[10ch] text-[clamp(3.2rem,8vw,6.5rem)] leading-[0.88] tracking-[-0.04em] text-white">
                            <SplitLines lines={content.heading.lines} />
                        </Heading>

                        <div className="mt-8 flex items-start gap-4 sm:gap-5">
                            <div className="mt-1 h-24 w-px shrink-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.5),rgba(255,255,255,0))]" />

                            <div className="max-w-xl">
                                <Text variant="muted" className="text-base leading-7 text-white/76 sm:text-lg sm:leading-8">
                                    <SplitLines lines={content.leadLines} />
                                </Text>

                                <Text variant="muted" className="mt-4 max-w-md text-white/56">
                                    {content.supportingText}
                                </Text>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/4 px-4 py-2 backdrop-blur-md">
                                <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" />
                                <span className="text-[10px] uppercase tracking-[0.24em] text-white/48">{content.badge}</span>
                            </div>

                            <span className="hidden h-px w-14 bg-white/12 sm:block" />

                            <p className="text-[11px] uppercase tracking-[0.26em] text-white/30">Regard • trace • présence</p>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="relative mx-auto max-w-104 lg:ml-auto lg:mr-0 lg:max-w-140">
                            <div className="absolute -inset-6 rounded-[2.2rem] border border-white/6" />
                            <div className="absolute -left-5 top-12 hidden h-[72%] w-px bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.24),rgba(255,255,255,0))] lg:block" />

                            <div className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/4 p-2 sm:p-3 backdrop-blur-sm">
                                <div className="relative aspect-4/5 overflow-hidden rounded-[1.45rem]">
                                    <Image src={content.image.src} alt={content.image.alt} fill priority sizes={content.image.sizes} className="object-cover object-center" />

                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.48)_100%)]" />
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.14),transparent_38%)]" />
                                </div>
                            </div>

                            <div className="absolute -left-3 bottom-8 hidden max-w-52 rounded-[1.2rem] border border-white/10 bg-[rgba(8,14,24,0.72)] px-4 py-4 backdrop-blur-xl lg:block">
                                <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">{content.floatingNote.eyebrow}</p>
                                <p className="mt-2 text-sm leading-6 text-white/72">
                                    <SplitLines lines={content.floatingNote.lines} />
                                </p>
                            </div>

                            <div className="absolute -right-4 top-10 hidden rounded-full border border-(--accent)/50 bg-(--accent)/4 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-(--text-primary) backdrop-blur-sm lg:inline-flex">
                                Depuis 2019
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
