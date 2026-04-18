import { cn } from '@/lib/utils/cn';
import type { AboutPageContent } from '@/domain/about/types';
import { Container } from '@/ui/Container';
import { Text } from '@/ui/Text';

import { AboutSectionIntro } from './shared/AboutSectionIntro';
import { aboutSectionStyles } from './shared/about-styles';

interface AboutVisionSectionProps {
    content: AboutPageContent['vision'];
    className?: string;
}

export function AboutVisionSection({ content, className }: AboutVisionSectionProps) {
    return (
        <section aria-label="Vision artistique" className={cn(aboutSectionStyles.section, aboutSectionStyles.pageBackground, className)}>
            <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-16 h-80 w-80 rounded-full bg-(--accent)/10 blur-3xl" />

            <Container className="relative z-10">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
                    <AboutSectionIntro content={content} headingClassName="max-w-[13ch]" descriptionClassName="max-w-md text-white/66" />

                    <div className="grid gap-4">
                        {content.fragments.map((fragment) => (
                            <article
                                key={fragment.index}
                                className={cn(
                                    'group relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-white/[0.035] px-5 py-5 transition-all duration-500 sm:px-6 sm:py-6',
                                    fragment.offsetClassName,
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
