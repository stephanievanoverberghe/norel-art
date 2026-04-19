import Image from 'next/image';
import Link from 'next/link';

import type { CommandesHeroContent } from '@/domain/commandes/types';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface CommandesHeroProps {
    content: CommandesHeroContent;
}

export function CommandesHero({ content }: CommandesHeroProps) {
    return (
        <section aria-label="Portraits sur commande" className="relative overflow-hidden bg-(--bg-primary) pt-40 pb-20 sm:pt-44 sm:pb-24 lg:pt-48 lg:pb-28">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.075]">
                <div className="h-[120%] w-[120%] bg-[url('/images/patterns/spirale.png')] bg-center bg-no-repeat" style={{ backgroundSize: '600px' }} />
            </div>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.8)_0%,rgba(5,10,18,0.42)_40%,rgba(5,10,18,0)_100%)]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-18 h-36 w-120 -translate-x-1/2 rounded-full bg-(--accent)/12 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-12 top-24 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-16 h-88 w-88 rounded-full bg-white/4 blur-3xl" />

            <Container className="relative z-10">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 xl:gap-20">
                    <div className="relative">
                        <p
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-10 left-0 hidden text-[clamp(4.5rem,10vw,8rem)] font-semibold uppercase tracking-[-0.06em] text-white/3 lg:block"
                        >
                            commande
                        </p>

                        <p className="relative z-10 text-[11px] uppercase tracking-[0.34em] text-white/42">{content.eyebrow}</p>

                        <Heading level={1} className="relative z-10 mt-5 max-w-[11ch] whitespace-pre-line text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[-0.05em] text-white">
                            {content.title}
                        </Heading>

                        <div className="relative z-10 mt-8 flex items-start gap-4 sm:gap-5">
                            <div className="mt-1 h-24 w-px shrink-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.48),rgba(255,255,255,0))]" />

                            <Text variant="muted" className="max-w-xl whitespace-pre-line text-base leading-7 text-white/74 sm:text-lg sm:leading-8">
                                {content.description}
                            </Text>
                        </div>

                        <div className="relative z-10 mt-10 flex flex-wrap items-center gap-4">
                            <Link href={content.primaryCtaHref}>
                                <Button className="min-h-12 rounded-full px-6">{content.primaryCtaLabel}</Button>
                            </Link>

                            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/4 px-4 py-2 backdrop-blur-md">
                                <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" />
                                <span className="text-[10px] uppercase tracking-[0.22em] text-white/46">À partir de 80 €</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative mx-auto max-w-[24rem] sm:max-w-120 lg:ml-auto lg:mr-0 lg:max-w-140">
                            <div className="absolute -inset-5 rounded-4xl border border-white/6" />

                            <article className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/4 p-2 sm:p-3 backdrop-blur-sm">
                                <div className="relative aspect-4/5 overflow-hidden rounded-[1.4rem]">
                                    <Image
                                        src="/images/commandes/co-008.jpg"
                                        alt="Portrait sur commande"
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 36rem"
                                        className="object-cover"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.12)_50%,rgba(0,0,0,0.55)_100%)]" />
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.14),transparent_38%)]" />
                                </div>
                            </article>

                            <div className="absolute -left-4 bottom-8 hidden max-w-60 rounded-[1.2rem] border border-white/10 bg-[rgba(8,14,24,0.72)] px-4 py-4 backdrop-blur-xl lg:block">
                                <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">Note</p>
                                <p className="mt-3 text-sm leading-6 text-white/64">{content.note}</p>
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
