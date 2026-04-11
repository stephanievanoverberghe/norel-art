import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface TestimonialsSectionProps {
    className?: string;
}

interface Testimonial {
    quote: string;
    name: string;
    context: string;
}

const testimonials: Testimonial[] = [
    {
        quote: 'Quand j’ai découvert l’œuvre, j’ai eu l’impression qu’elle savait déjà quelque chose de moi. Je ne l’ai pas choisie tout de suite. C’est elle qui est restée.',
        name: 'Claire',
        context: 'Aquarelle originale',
    },
    {
        quote: 'Le portrait commandé n’était pas une simple ressemblance. Il y avait une présence, une tension douce, quelque chose de très juste.',
        name: 'Sophie',
        context: 'Commande sur mesure',
    },
    {
        quote: 'La fresque a transformé le lieu. Ce n’était plus seulement un mur. Il y avait une respiration, un regard, une vraie émotion dans l’espace.',
        name: 'Élodie',
        context: 'Projet mural',
    },
];

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
    return (
        <section aria-label="Témoignages" className={cn('relative overflow-hidden bg-(--bg-primary) py-20 sm:py-24 lg:py-28', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(6,12,21,0.72)_0%,rgba(6,12,21,0)_100%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-14 h-24 w-md -translate-x-1/2 bg-(--accent)/8 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-white/2 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 top-20 h-52 w-52 rounded-full bg-(--surface)/14 blur-3xl" />

            <Container className="relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">Résonances</p>

                    <Heading level={2} className="mt-4 text-white">
                        Ils ont regardé.
                        <br />
                        Ils ont été regardés.
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-5 max-w-xl text-white/70">
                        Quelques traces laissées par celles et ceux qui ont accueilli une œuvre, confié un visage, ou ouvert un mur à l’émotion.
                    </Text>
                </div>

                <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <article
                            key={`${testimonial.name}-${index}`}
                            className={cn('relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-7', index === 1 && 'lg:translate-y-8')}
                        >
                            <div aria-hidden="true" className="pointer-events-none absolute left-6 top-6 text-5xl leading-none text-white/10">
                                “
                            </div>

                            <div className="relative z-10">
                                <Text as="div" variant="muted" className="text-base leading-7 text-white/78">
                                    {testimonial.quote}
                                </Text>

                                <div className="mt-6 h-px w-12 bg-[linear-gradient(90deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0)_100%)]" />

                                <div className="mt-5">
                                    <p className="text-sm text-white">{testimonial.name}</p>
                                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/46">{testimonial.context}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}
