import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface AboutJourneySectionProps {
    className?: string;
}

const journeyFragments = [
    {
        step: '01',
        label: 'Avant',
        text: 'Le dessin était là depuis l’enfance. Une évidence. Une langue intérieure. Puis il y a eu les freins, les détours, les choses qu’on tait pour tenir.',
    },
    {
        step: '02',
        label: 'Bascule',
        text: 'Après l’épuisement, quelque chose est revenu. Pas comme un passe-temps. Comme une nécessité. Une manière de reprendre souffle autrement.',
    },
    {
        step: '03',
        label: 'Depuis',
        text: 'J’ai repris un pinceau. Puis un autre. Depuis, je trace des regards, des silences, des absences. Et parfois, des fragments de lumière.',
    },
];

export function AboutJourneySection({ className }: AboutJourneySectionProps) {
    return (
        <section aria-label="Parcours de l’artiste" className={cn('relative overflow-hidden bg-(--bg-primary) py-18 sm:py-24 lg:py-28', className)}>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.16),rgba(255,255,255,0))]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-16 h-28 w-88 -translate-x-1/2 rounded-full bg-(--accent)/8 blur-3xl" />

            <Container className="relative z-10">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <p className="text-[11px] uppercase tracking-[0.32em] text-white/38">Parcours</p>

                        <Heading level={2} className="mt-4 max-w-[11ch] text-white text-balance">
                            Longtemps,
                            <br />
                            j’ai tu
                            <br />
                            ce que je voyais.
                        </Heading>

                        <Text variant="muted" className="mt-5 max-w-sm text-white/62">
                            Ce n’est pas une ligne droite.
                            <br />
                            C’est un retour.
                        </Text>
                    </div>

                    <div className="relative pl-6 sm:pl-8">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.18),rgba(255,255,255,0))]" />

                        <div className="grid gap-8">
                            {journeyFragments.map((fragment, index) => (
                                <article
                                    key={fragment.step}
                                    className={cn(
                                        'relative max-w-2xl rounded-[1.6rem] border border-white/10 bg-white/4 px-6 py-6 backdrop-blur-sm sm:px-7 sm:py-7',
                                        index === 1 && 'lg:ml-10',
                                        index === 2 && 'lg:ml-4',
                                    )}
                                >
                                    <span className="absolute -left-[2.1rem] top-8 flex h-4 w-4 items-center justify-center rounded-full border border-white/14 bg-(--bg-primary)">
                                        <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                                    </span>

                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] uppercase tracking-[0.22em] text-white/30">{fragment.step}</span>
                                        <span className="h-px flex-1 bg-white/8" />
                                        <span className="text-[10px] uppercase tracking-[0.22em] text-white/42">{fragment.label}</span>
                                    </div>

                                    <Text variant="muted" className="mt-5 text-white/76">
                                        {fragment.text}
                                    </Text>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
