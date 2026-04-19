import { SectionIntro } from '@/components/shared/SectionIntro';
import type { FresquesProcessItem } from '@/domain/fresques/types';
import { cn } from '@/lib/utils/cn';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

import { FresquesSection } from './FresquesSection';

interface FresquesProcessSectionProps {
    id: string;
    eyebrow: string;
    title: string;
    intro: string;
    items: FresquesProcessItem[];
    frameEyebrow: string;
    frameTitle: string;
    frameText: string;
}

export function FresquesProcessSection({ id, eyebrow, title, intro, items, frameEyebrow, frameTitle, frameText }: FresquesProcessSectionProps) {
    return (
        <FresquesSection id={id}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.045]">
                <div className="h-[120%] w-[120%] bg-[url('/images/patterns/spirale.png')] bg-center bg-no-repeat" style={{ backgroundSize: '600px' }} />
            </div>

            <div className="relative z-10">
                <SectionIntro eyebrow={eyebrow} title={title} description={intro} centered className="mx-auto max-w-3xl" />

                <div className="relative mx-auto mt-16 max-w-4xl">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.2),transparent)]"
                    />

                    <div className="flex flex-col gap-16">
                        {items.map((item, index) => {
                            const isRight = index % 2 === 1;

                            return (
                                <div key={item.step} className={cn('relative flex flex-col md:flex-row md:items-center md:gap-10', isRight && 'md:flex-row-reverse')}>
                                    <div className="absolute left-1/2 top-0 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-(--bg-primary) text-[10px] uppercase tracking-[0.2em] text-white/50">
                                            {item.step}
                                        </div>
                                    </div>

                                    <div className={cn('mt-12 w-full md:mt-0 md:w-1/2', isRight ? 'md:pl-10' : 'md:pr-10')}>
                                        <div className="group relative">
                                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">Étape {item.step}</p>

                                            <Heading level={3} className="mt-3 max-w-[16ch] text-white">
                                                {item.title}
                                            </Heading>

                                            <Text variant="muted" className="mt-4 text-white/68">
                                                {item.text}
                                            </Text>

                                            {item.aside ? <p className="mt-5 text-sm italic text-white/45">{item.aside}</p> : null}

                                            <div className="mt-5 h-px w-0 bg-white/20 transition-all duration-500 group-hover:w-full" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mx-auto mt-20 max-w-3xl text-center">
                    <div className="rounded-3xl border border-white/10 bg-white/3 px-6 py-6 backdrop-blur-sm sm:px-8 sm:py-7">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/34">{frameEyebrow}</p>

                        <Heading level={3} className="mt-3 text-white">
                            {frameTitle}
                        </Heading>

                        <Text variant="muted" className="mt-4 text-white/60">
                            {frameText}
                        </Text>
                    </div>
                </div>
            </div>
        </FresquesSection>
    );
}
