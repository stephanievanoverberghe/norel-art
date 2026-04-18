import Image from 'next/image';

import { cn } from '@/lib/utils/cn';
import type { CommandesHeroContent } from '@/domain/commandes/types';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface CommandesHeroProps {
    content: CommandesHeroContent;
    className?: string;
}

export function CommandesHero({ content, className }: CommandesHeroProps) {
    return (
        <section aria-label="Commande sur mesure" className={cn('relative overflow-hidden bg-(--bg-primary) pt-40 pb-18 sm:pt-44 sm:pb-24 lg:pt-48 lg:pb-28', className)}>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.78)_0%,rgba(5,10,18,0.42)_40%,rgba(5,10,18,0)_100%)]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute -left-16 top-20 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute right-8 top-12 h-96 w-96 rounded-full bg-(--accent)/12 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-20 h-28 w-md -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

            <Container className="relative z-10">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14 xl:gap-20">
                    <div className="relative max-w-3xl">
                        <p
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-9 left-0 hidden text-[clamp(4.5rem,10vw,8rem)] font-semibold uppercase tracking-[-0.06em] text-white/3 lg:block"
                        >
                            sur mesure
                        </p>

                        <p className="relative z-10 text-[11px] uppercase tracking-[0.34em] text-white/38">{content.eyebrow}</p>

                        <Heading level={1} className="relative z-10 mt-5 max-w-[10.5ch] text-[clamp(3.1rem,8vw,6.25rem)] leading-[0.88] tracking-[-0.05em] text-white">
                            {content.title}
                        </Heading>

                        <div className="relative z-10 mt-8 flex items-start gap-4 sm:gap-5">
                            <div className="mt-1 h-24 w-px shrink-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.48),rgba(255,255,255,0))]" />

                            <Text variant="muted" className="max-w-xl whitespace-pre-line text-base leading-7 text-white/76 sm:text-lg sm:leading-8">
                                {content.description}
                            </Text>
                        </div>

                        <div className="relative z-10 mt-10 flex flex-wrap items-center gap-4">
                            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/4 px-4 py-2 backdrop-blur-md">
                                <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" />
                                <span className="text-[10px] uppercase tracking-[0.24em] text-white/48">Unique</span>
                            </div>

                            <span className="hidden h-px w-16 bg-white/10 sm:block" />

                            <p className="text-[11px] uppercase tracking-[0.26em] text-white/30">portrait • mémoire • présence</p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative mx-auto max-w-[24rem] sm:max-w-120 lg:ml-auto lg:mr-0 lg:max-w-136 xl:max-w-xl">
                            <div className="absolute -inset-5 rounded-4xl border border-white/6" />

                            <div className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/4 p-2 sm:p-3 backdrop-blur-sm">
                                <div className="relative aspect-4/5 overflow-hidden rounded-[1.4rem]">
                                    <Image
                                        src="/images/commandes/co001.jpg"
                                        alt="Exemple de commande personnalisée"
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 36rem"
                                        className="object-cover object-center"
                                    />

                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.1)_48%,rgba(0,0,0,0.48)_100%)]" />
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.14),transparent_38%)]" />
                                </div>
                            </div>

                            <div className="absolute -left-4 bottom-8 hidden max-w-56 rounded-[1.2rem] border border-white/10 bg-[rgba(8,14,24,0.72)] px-4 py-4 backdrop-blur-xl lg:block">
                                <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Note sensible</p>

                                <Text variant="muted" className="mt-3 whitespace-pre-line text-sm leading-6 text-white/68">
                                    {content.note}
                                </Text>
                            </div>

                            <div className="absolute -right-3 top-6 hidden rounded-full border border-(--accent)/50 bg-(--accent)/4 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-(--text-primary) backdrop-blur-md lg:inline-flex">
                                Commande unique
                            </div>

                            <div className="absolute -right-8 bottom-10 hidden w-32 overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/4 p-1 backdrop-blur-xl xl:block">
                                <div className="relative aspect-3/4 overflow-hidden rounded-[0.9rem]">
                                    <Image
                                        src="/images/commandes/co002.jpg"
                                        alt="Détail d'une autre commande personnalisée"
                                        fill
                                        sizes="10rem"
                                        className="object-cover object-center"
                                    />
                                </div>
                            </div>

                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -left-5 top-10 hidden h-[72%] w-px bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.22),rgba(255,255,255,0))] lg:block"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
