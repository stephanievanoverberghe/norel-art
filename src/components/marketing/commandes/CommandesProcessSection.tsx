import { cn } from '@/lib/utils/cn';
import type { CommandesProcessItem } from '@/domain/commandes/types';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

import { CommandesSection } from './CommandesSection';

interface CommandesProcessSectionProps {
    id: string;
    title: string;
    intro: string;
    items: CommandesProcessItem[];
}

export function CommandesProcessSection({ id, title, intro, items }: CommandesProcessSectionProps) {
    return (
        <CommandesSection id={id}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.075]">
                <div
                    className="h-[120%] w-[120%] bg-[url('/images/patterns/spirale.png')] bg-center bg-no-repeat"
                    style={{
                        backgroundSize: '600px',
                    }}
                />
            </div>
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/38">Processus</p>

                <Heading level={2} className="mt-4 text-white">
                    {title}
                </Heading>

                <Text variant="muted" className="mx-auto mt-5 max-w-2xl text-white/66">
                    {intro}
                </Text>
            </div>

            <div className="relative mx-auto mt-16 max-w-4xl">
                <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.2),transparent)]" />

                <div className="flex flex-col gap-16">
                    {items.map((item, index) => {
                        const isRight = index % 2 === 1;

                        return (
                            <div key={item.step} className={cn('relative flex flex-col md:flex-row md:items-center md:gap-10', isRight ? 'md:flex-row-reverse' : '')}>
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

                                        {item.aside && <p className="mt-5 text-sm italic text-white/45">{item.aside}</p>}

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
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/34">Cadre</p>

                    <Heading level={3} className="mt-3 text-white">
                        Une structure simple, au service de la création.
                    </Heading>

                    <Text variant="muted" className="mt-4 text-white/60">
                        Format, technique, nombre de visages et délai se définissent ensemble. Le cadre sert la pièce — il ne fige jamais ce qui doit rester vivant.
                    </Text>
                </div>
            </div>
        </CommandesSection>
    );
}
