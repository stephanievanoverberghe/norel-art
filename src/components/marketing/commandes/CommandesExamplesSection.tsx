import Image from 'next/image';

import { cn } from '@/lib/utils/cn';
import type { CommandesExampleItem } from '@/domain/commandes/types';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface CommandesExamplesSectionProps {
    items: CommandesExampleItem[];
    className?: string;
    id?: string;
}

export function CommandesExamplesSection({ items, className, id }: CommandesExamplesSectionProps) {
    const [featured, second, third, fourth, fifth, sixth] = items;

    return (
        <section id={id} aria-label="Exemples de commandes" className={cn('relative overflow-hidden bg-(--bg-primary) py-18 sm:py-24 lg:py-28', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-16 h-28 w-[24rem] -translate-x-1/2 rounded-full bg-(--accent)/8 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-28 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-white/4 blur-3xl" />

            <Container className="relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/38">Fragments</p>

                    <Heading level={2} className="mx-auto mt-4 max-w-[12ch] text-white">
                        Quelques traces déjà confiées.
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-5 max-w-2xl text-white/68">
                        Des portraits, des cadeaux, des hommages, des visages de famille, des animaux aimés. Quelques commandes déjà nées d’une rencontre.
                    </Text>
                </div>

                <div className="mt-12 grid gap-4">
                    {featured ? (
                        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-stretch">
                            <FeaturedPanel item={featured} />

                            <aside className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-6 py-6 backdrop-blur-sm sm:px-7 sm:py-7">
                                <p
                                    aria-hidden="true"
                                    className="pointer-events-none absolute right-4 top-2 text-[clamp(4rem,7vw,6rem)] font-semibold uppercase tracking-[-0.06em] text-white/3"
                                >
                                    traces
                                </p>

                                <div className="relative z-10 flex h-full flex-col">
                                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/34">Sélection</p>

                                    <Heading level={3} className="mt-5 max-w-[12ch] text-white">
                                        Des commandes qui racontent déjà quelque chose.
                                    </Heading>

                                    <Text variant="muted" className="mt-5 text-white/68">
                                        Certaines sont nées d’une photo confiée. D’autres d’un souvenir, d’un hommage ou d’une envie d’offrir. Toutes cherchent la même chose :
                                        garder une présence vivante.
                                    </Text>

                                    <div className="mt-8 flex flex-wrap gap-2.5">
                                        {['Portrait', 'Cadeau', 'Hommage', 'Famille', 'Animal'].map((label) => (
                                            <span
                                                key={label}
                                                className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/44"
                                            >
                                                {label}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-10">
                                        <Text variant="muted" className="max-w-sm text-sm leading-6 text-white/56">
                                            Fusain, graphite, encre, aquarelle, acrylique ou pastel : la technique influe ensuite sur la proposition et le devis.
                                        </Text>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    ) : null}

                    <div className="grid gap-4 md:grid-cols-3">
                        {second ? <StripCard item={second} tag="Cadeau" /> : null}
                        {third ? <StripCard item={third} tag="Hommage" /> : null}
                        {fourth ? <StripCard item={fourth} tag="Portrait" /> : null}
                    </div>

                    <div className="grid gap-4 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                        {fifth ? <BottomCard item={fifth} tag="Animal" /> : null}
                        {sixth ? <BottomCard item={sixth} tag="Commande" /> : null}
                    </div>
                </div>
            </Container>
        </section>
    );
}

interface ExampleCardProps {
    item: CommandesExampleItem;
    tag: string;
    className?: string;
}

function FeaturedPanel({ item, className }: Omit<ExampleCardProps, 'tag'>) {
    return (
        <article className={cn('group relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-white/[0.035] p-2 backdrop-blur-sm', className)}>
            <div className="relative min-h-96 overflow-hidden rounded-[1.4rem] sm:min-h-120">
                <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.08)_45%,rgba(0,0,0,0.62)_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.1),transparent_40%)]" />

                <div className="absolute left-5 top-5 hidden rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/46 backdrop-blur-md sm:inline-flex">
                    Fragment choisi
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="max-w-[14ch] text-xl leading-tight text-white sm:text-2xl">{item.label}</p>
                </div>
            </div>
        </article>
    );
}

function StripCard({ item, tag, className }: ExampleCardProps) {
    return (
        <article className={cn('group relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.035] p-2 backdrop-blur-sm', className)}>
            <div className="relative min-h-64 overflow-hidden rounded-[1.1rem]">
                <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                />

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.01)_0%,rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.58)_100%)]" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                    <p className="max-w-[13ch] text-sm text-white/88">{item.label}</p>

                    <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/48 backdrop-blur-md">{tag}</span>
                </div>
            </div>
        </article>
    );
}

function BottomCard({ item, tag, className }: ExampleCardProps) {
    return (
        <article className={cn('group relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-white/3 p-2 backdrop-blur-sm', className)}>
            <div className="relative min-h-72 overflow-hidden rounded-[1.2rem]">
                <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                />

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.01)_0%,rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.62)_100%)]" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                    <p className="max-w-[14ch] text-base text-white/88">{item.label}</p>

                    <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/48 backdrop-blur-md">{tag}</span>
                </div>
            </div>
        </article>
    );
}
