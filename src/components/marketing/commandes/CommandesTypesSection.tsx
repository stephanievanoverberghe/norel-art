import Image from 'next/image';

import { SectionIntro } from '@/components/shared/SectionIntro';
import type { CommandesExampleItem, CommandesTypesSectionContent } from '@/domain/commandes/types';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

import { CommandesSection } from './CommandesSection';

interface CommandesTypesSectionProps {
    id: string;
    content: CommandesTypesSectionContent;
    previewExamples: CommandesExampleItem[];
}

export function CommandesTypesSection({ id, content, previewExamples }: CommandesTypesSectionProps) {
    const [featured, second, third] = previewExamples;

    return (
        <CommandesSection id={id}>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-14">
                <div>
                    <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.intro} />

                    <div className="mt-7 flex flex-wrap gap-2.5">
                        {content.usageTags.map((tag) => (
                            <span key={tag} className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/52">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="mt-6 max-w-lg text-sm leading-6 text-white/58">{content.techniquesLabel}</p>

                    <div className="mt-8 grid gap-4">
                        {content.offerings.map((item, index) => (
                            <article key={item.title} className="rounded-[1.35rem] border border-white/10 bg-white/4 px-5 py-5 backdrop-blur-sm">
                                <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">{String(index + 1).padStart(2, '0')}</p>

                                <Heading level={3} className="mt-3 text-xl text-white">
                                    {item.title}
                                </Heading>

                                <Text variant="muted" className="mt-3 text-white/70">
                                    {item.text}
                                </Text>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4">
                    {featured ? (
                        <article className="group rounded-[1.75rem] border border-white/10 bg-white/3 p-2 backdrop-blur-sm">
                            <div className="relative aspect-4/5 overflow-hidden rounded-[1.35rem]">
                                <Image
                                    src={featured.src}
                                    alt={featured.alt}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 40rem"
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.1)_46%,rgba(0,0,0,0.58)_100%)]" />
                            </div>

                            <div className="flex items-center justify-between gap-4 px-3 py-4">
                                <p className="text-base text-white/84">{featured.label}</p>
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/44">Aperçu</span>
                            </div>
                        </article>
                    ) : null}

                    <div className="grid gap-4 sm:grid-cols-2">
                        {[second, third].filter(Boolean).map((item) =>
                            item ? (
                                <article key={item.src} className="group rounded-[1.35rem] border border-white/10 bg-white/3 p-2">
                                    <div className="relative aspect-4/5 overflow-hidden rounded-[1.05rem]">
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        />
                                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.55)_100%)]" />
                                    </div>

                                    <p className="px-2 py-3 text-sm text-white/68">{item.label}</p>
                                </article>
                            ) : null,
                        )}
                    </div>
                </div>
            </div>
        </CommandesSection>
    );
}
