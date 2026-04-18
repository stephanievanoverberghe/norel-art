import Image from 'next/image';

import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface AboutHeroProps {
    className?: string;
}

export function AboutHero({ className }: AboutHeroProps) {
    return (
        <section aria-label="À propos de Norel Art" className={cn('relative overflow-hidden bg-(--bg-primary) pt-28 pb-18 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28', className)}>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(158,0,49,0.16),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(6,12,21,0.82)_0%,rgba(6,12,21,0.4)_100%)]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-14 h-36 w-104 -translate-x-1/2 rounded-full bg-(--accent)/10 blur-3xl" />

            <Container className="relative z-10">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-14 xl:gap-18">
                    <div className="order-2 lg:order-1">
                        <p className="text-[11px] uppercase tracking-[0.34em] text-white/38">À propos</p>

                        <Heading level={1} className="mt-5 max-w-[11ch] text-white text-[clamp(2.8rem,8vw,6.2rem)] leading-[0.9] tracking-[-0.03em]">
                            Il y a un jour
                            <br />
                            où j’ai repris
                            <br />
                            le trait.
                        </Heading>

                        <div className="mt-8 flex items-start gap-4">
                            <div className="mt-1 h-20 w-px shrink-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.45),rgba(255,255,255,0))]" />

                            <div className="max-w-xl">
                                <Text variant="muted" className="text-base leading-7 text-white/76 sm:text-lg">
                                    Longtemps, j’ai tenu ça en silence. Puis j’ai recommencé à tracer.
                                    <span className="block">Des regards. Des tensions. Des absences.</span>
                                </Text>

                                <Text variant="muted" className="mt-4 max-w-md text-white/54">
                                    Ce que je peins n’explique pas. Ça apparaît.
                                </Text>
                            </div>
                        </div>

                        <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/4 px-4 py-2 backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" />
                            <span className="text-[10px] uppercase tracking-[0.24em] text-white/50">Portraitiste de l’émotion</span>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="relative mx-auto max-w-md lg:ml-auto lg:mr-0 lg:max-w-136">
                            <div className="absolute -inset-4 rounded-4xl border border-white/6" />

                            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/3 p-2 sm:p-3">
                                <div className="relative aspect-4/5 overflow-hidden rounded-[1.4rem]">
                                    <Image
                                        src="/images/norel/norel.jpg"
                                        alt="Portrait de Norel Art"
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 34rem"
                                        className="object-cover object-center"
                                    />

                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,14,0.04)_0%,rgba(4,8,14,0.12)_45%,rgba(4,8,14,0.48)_100%)]" />
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.12),transparent_42%)]" />
                                </div>
                            </div>

                            <div className="absolute -left-4 bottom-10 hidden max-w-56 rounded-2xl border border-white/10 bg-[rgba(10,18,30,0.72)] px-4 py-4 backdrop-blur-xl lg:block">
                                <p className="text-[10px] uppercase tracking-[0.24em] text-white/36">Trace</p>
                                <p className="mt-2 text-sm leading-6 text-white/70">
                                    Le regard avant le mot.
                                    <br />
                                    La présence avant l’explication.
                                </p>
                            </div>

                            <div className="pointer-events-none absolute -right-6 top-8 hidden h-28 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.26),rgba(255,255,255,0))] lg:block" />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
