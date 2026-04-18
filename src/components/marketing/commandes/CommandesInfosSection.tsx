import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface CommandesInfosSectionProps {
    items: string[];
    className?: string;
    id?: string;
}

export function CommandesInfosSection({ items, className, id }: CommandesInfosSectionProps) {
    return (
        <section id={id} aria-label="Informations utiles" className={cn('relative overflow-hidden bg-(--bg-primary) py-18 sm:py-24 lg:py-28', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-16 h-28 w-[24rem] -translate-x-1/2 rounded-full bg-(--accent)/8 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-16 top-28 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-white/4 blur-3xl" />

            <Container className="relative z-10">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <p className="text-[11px] uppercase tracking-[0.32em] text-white/38">À savoir</p>

                        <Heading level={2} className="mt-4 max-w-[12ch] text-white">
                            Ce qu’il faut garder en tête.
                        </Heading>

                        <Text variant="muted" className="mt-5 max-w-md text-white/64">
                            Quelques repères simples pour avancer sereinement, sans retirer à la commande sa part sensible.
                        </Text>

                        <div className="mt-8 hidden rounded-[1.3rem] border border-white/10 bg-white/3 px-5 py-5 backdrop-blur-sm lg:block">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">Note</p>
                            <p className="mt-3 text-sm leading-6 text-white/56">
                                Le cadre aide à clarifier la suite. Il ne remplace jamais la rencontre, l’échange et la justesse de la pièce.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute left-4 top-0 bottom-0 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.16),rgba(255,255,255,0))] sm:left-5"
                        />

                        <div className="grid gap-4">
                            {items.map((item, index) => (
                                <article key={item} className={cn('group relative pl-12 sm:pl-14', index % 2 === 1 && 'lg:ml-10')}>
                                    <div
                                        aria-hidden="true"
                                        className="absolute left-0 top-7 flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-(--bg-primary) text-[10px] uppercase tracking-[0.2em] text-white/42 sm:left-1"
                                    >
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-5 py-5 backdrop-blur-sm sm:px-6 sm:py-6">
                                        <p
                                            aria-hidden="true"
                                            className="pointer-events-none absolute right-4 top-2 text-[clamp(3rem,6vw,4.5rem)] font-semibold uppercase tracking-[-0.06em] text-white/3"
                                        >
                                            {String(index + 1).padStart(2, '0')}
                                        </p>

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] uppercase tracking-[0.24em] text-white/30">Repère</span>
                                                <span className="h-px flex-1 bg-white/8 transition-colors duration-500 group-hover:bg-white/16" />
                                            </div>

                                            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/74 sm:text-[0.95rem] sm:leading-7">{item}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
