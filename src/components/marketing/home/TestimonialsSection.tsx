import type { TestimonialsContent } from '@/types/home';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { SectionIntro } from '@/components/shared/SectionIntro';
import { Text } from '@/ui/Text';

interface TestimonialsSectionProps {
    content: TestimonialsContent;
    className?: string;
}

export function TestimonialsSection({ content, className }: TestimonialsSectionProps) {
    return (
        <section aria-label="Témoignages" className={cn('relative overflow-hidden bg-(--bg-primary) py-20 sm:py-24 lg:py-28', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(6,12,21,0.72)_0%,rgba(6,12,21,0)_100%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-14 h-24 w-md -translate-x-1/2 bg-(--accent)/8 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-white/2 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 top-20 h-52 w-52 rounded-full bg-(--surface)/14 blur-3xl" />

            <Container className="relative z-10">
                <SectionIntro
                    centered
                    className="mx-auto"
                    eyebrow={content.intro.eyebrow}
                    title={content.intro.title}
                    description={content.intro.description}
                />

                <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3">
                    {content.items.map((testimonial, index) => (
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
