import { cn } from '@/lib/utils/cn';
import type { AboutPageContent } from '@/domain/about/types';
import { Container } from '@/ui/Container';
import { Text } from '@/ui/Text';

import { AboutSectionIntro } from './shared/AboutSectionIntro';
import { aboutSectionStyles } from './shared/about-styles';

interface AboutJourneySectionProps {
    content: AboutPageContent['journey'];
    className?: string;
}

export function AboutJourneySection({ content, className }: AboutJourneySectionProps) {
    return (
        <section aria-label="Parcours de l’artiste" className={cn(aboutSectionStyles.section, aboutSectionStyles.pageBackground, className)}>
            <div aria-hidden="true" className={cn('pointer-events-none absolute inset-x-0 top-0 h-px', aboutSectionStyles.dividerHorizontal)} />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-16 h-24 w-[20rem] -translate-x-1/2 rounded-full bg-(--accent)/8 blur-3xl" />

            <Container className="relative z-10">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
                    <AboutSectionIntro content={content} headingClassName="max-w-[11ch]" descriptionClassName="max-w-sm text-white/62" />

                    <div className="relative pl-7 sm:pl-10">
                        <div className={cn('absolute bottom-0 left-0 top-0 w-px', aboutSectionStyles.dividerVertical)} />

                        <div className="grid gap-7 sm:gap-8">
                            {content.fragments.map((fragment) => (
                                <article
                                    key={fragment.step}
                                    className={cn(
                                        'relative rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] px-6 py-6 backdrop-blur-sm sm:px-7 sm:py-7',
                                        fragment.offsetClassName,
                                    )}
                                >
                                    <span className="absolute -left-[2.35rem] top-8 flex h-4 w-4 items-center justify-center rounded-full border border-white/14 bg-(--bg-primary)">
                                        <span className="h-1.5 w-1.5 rounded-full bg-white/72" />
                                    </span>

                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] uppercase tracking-[0.24em] text-white/28">{fragment.step}</span>
                                        <span className="h-px flex-1 bg-white/8" />
                                        <span className="text-[10px] uppercase tracking-[0.24em] text-white/42">{fragment.label}</span>
                                    </div>

                                    <Text variant="muted" className="mt-5 text-white/80">
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
