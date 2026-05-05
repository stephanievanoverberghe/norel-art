import { SectionIntro } from '@/components/shared/SectionIntro';
import type { TestimonialsContent } from '@/domain/home/types';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Text } from '@/ui/Text';

interface HomeTestimonialsSectionProps {
    content: TestimonialsContent;
    className?: string;
}

export function HomeTestimonialsSection({ content, className }: HomeTestimonialsSectionProps) {
    return (
        <section aria-label="Témoignages" className={cn('marketing-section marketing-bg-vellum py-20 sm:py-24 lg:py-28', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.075]">
                <div className="h-[120%] w-[120%] bg-[url('/images/patterns/spirale.png')] bg-center bg-no-repeat" style={{ backgroundSize: '600px' }} />
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(6,12,21,0.72)_0%,rgba(6,12,21,0)_100%)]" />

            <Container className="relative z-10">
                <SectionIntro centered className="mx-auto" eyebrow={content.intro.eyebrow} title={content.intro.title} description={content.intro.description} />

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
