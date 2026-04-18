import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface AboutVisionSectionProps {
    className?: string;
}

const visionFragments = [
    {
        index: '01',
        label: 'Regard',
        text: 'Le regard vient avant le mot. Il arrête. Il trouble. Il tient la présence avant toute explication.',
    },
    {
        index: '02',
        label: 'Tension',
        text: 'Je cherche l’endroit où le sombre rencontre la lumière. Là où quelque chose résiste, vibre, apparaît.',
    },
    {
        index: '03',
        label: 'Trait',
        text: 'Le trait blanc n’est pas un effet. C’est une fracture parfois. Un souffle, parfois aussi. Une manière d’ouvrir le visage.',
    },
    {
        index: '04',
        label: 'Présence',
        text: 'Je ne veux pas illustrer. Je veux faire sentir une présence qui reste un peu après le regard.',
    },
];

export function AboutVisionSection({ className }: AboutVisionSectionProps) {
    return (
        <section aria-label="Vision artistique" className={cn('relative overflow-hidden bg-(--bg-primary) py-18 sm:py-24 lg:py-28', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-16 h-80 w-80 rounded-full bg-(--accent)/10 blur-3xl" />

            <Container className="relative z-10">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <p className="text-[11px] uppercase tracking-[0.32em] text-white/36">Vision</p>

                        <Heading level={2} className="mt-4 max-w-[13ch] text-white">
                            Je ne cherche
                            <br />
                            pas à représenter.
                            <br />
                            Je cherche
                            <br />à faire apparaître.
                        </Heading>

                        <Text variant="muted" className="mt-5 max-w-md text-white/66">
                            Entre pop art, manga, street art, expressionnisme et matière brute, je poursuis toujours la même chose : une présence qui tient le regard sans
                            s’épuiser.
                        </Text>
                    </div>

                    <div className="grid gap-4">
                        {visionFragments.map((fragment, index) => (
                            <article
                                key={fragment.index}
                                className={cn(
                                    'group relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-white/[0.035] px-5 py-5 transition-all duration-500 sm:px-6 sm:py-6',
                                    index % 2 === 1 && 'lg:ml-10',
                                )}
                            >
                                <p
                                    aria-hidden="true"
                                    className="pointer-events-none absolute right-4 top-2 hidden text-[clamp(3.5rem,8vw,6rem)] font-semibold uppercase tracking-[-0.06em] text-white/3 lg:block"
                                >
                                    {fragment.label}
                                </p>

                                <div className="relative z-10 flex items-start gap-4">
                                    <span className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/28">{fragment.index}</span>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-3">
                                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">{fragment.label}</p>
                                            <span className="h-px flex-1 bg-white/8 transition-colors duration-500 group-hover:bg-white/18" />
                                        </div>

                                        <Text variant="muted" className="mt-4 max-w-2xl text-white/78">
                                            {fragment.text}
                                        </Text>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
