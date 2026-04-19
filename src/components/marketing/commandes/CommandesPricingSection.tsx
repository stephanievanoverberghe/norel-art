import { SectionIntro } from '@/components/shared/SectionIntro';
import type { CommandesPricingItem, CommandesPricingSectionContent } from '@/domain/commandes/types';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

import { CommandesSection } from './CommandesSection';

interface CommandesPricingSectionProps {
    id: string;
    content: CommandesPricingSectionContent;
}

export function CommandesPricingSection({ id, content }: CommandesPricingSectionProps) {
    return (
        <CommandesSection id={id}>
            <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.intro} centered className="mx-auto max-w-3xl" />

            <div className="mt-12 rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-3 backdrop-blur-sm sm:p-4 lg:p-5">
                <div className="rounded-[1.45rem] border border-white/8 bg-white/2.5">
                    <div className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_repeat(3,minmax(0,1fr))]">
                        <div className="border-b border-white/8 px-5 py-5 lg:border-b-0 lg:border-r lg:px-6 lg:py-6">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">Portraits</p>

                            <Heading level={3} className="mt-4 max-w-[12ch] text-white">
                                {content.tableTitle}
                            </Heading>

                            <Text variant="muted" className="mt-4 text-white/62">
                                {content.tableSubtitle}
                            </Text>
                        </div>

                        {content.items.map((item, index) => (
                            <PricingColumn key={item.format} item={item} isLast={index === content.items.length - 1} />
                        ))}
                    </div>

                    <div className="hidden border-t border-white/8 lg:block">
                        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_repeat(3,minmax(0,1fr))]">
                            <PricingLabelCell label={content.baseRowLabel} />
                            {content.items.map((item) => (
                                <PricingValueCell key={`${item.format}-base`} value={item.basePrice} />
                            ))}
                        </div>

                        <div className="grid border-t border-white/8 lg:grid-cols-[minmax(0,0.95fr)_repeat(3,minmax(0,1fr))]">
                            <PricingLabelCell label={content.extraRowLabel} />
                            {content.items.map((item) => (
                                <PricingValueCell key={`${item.format}-extra`} value={item.extraFacePrice} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid gap-4 lg:hidden">
                {content.items.map((item) => (
                    <article key={`mobile-${item.format}`} className="rounded-[1.45rem] border border-white/10 bg-white/3 px-5 py-5 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase tracking-[0.24em] text-white/30">{item.format}</span>
                            <span className="h-px flex-1 bg-white/8" />
                        </div>

                        <Heading level={3} className="mt-4 text-white">
                            Format {item.format}
                        </Heading>

                        <Text variant="muted" className="mt-2 text-white/56">
                            {item.dimensions}
                        </Text>

                        <div className="mt-6">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">{content.baseRowLabel}</p>
                            <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">{item.basePrice}</p>
                        </div>

                        <div className="mt-5 rounded-2xl border border-white/8 bg-white/3 px-4 py-4">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">{content.extraRowLabel}</p>
                            <p className="mt-2 text-sm leading-6 text-white/72">{item.extraFacePrice}</p>
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/3 px-6 py-6 backdrop-blur-sm sm:px-8 sm:py-8">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-8">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/34">{content.practicalEyebrow}</p>

                        <Heading level={3} className="mt-3 max-w-[12ch] text-white">
                            {content.practicalTitle}
                        </Heading>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {content.practicalInfos.map((info) => (
                            <p key={info} className="rounded-[1.1rem] border border-white/8 bg-white/3 px-4 py-4 text-sm leading-6 text-white/66">
                                {info}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </CommandesSection>
    );
}

interface PricingColumnProps {
    item: CommandesPricingItem;
    isLast: boolean;
}

function PricingColumn({ item, isLast }: PricingColumnProps) {
    return (
        <div className={`relative border-b border-white/8 px-5 py-5 sm:px-6 sm:py-6 lg:border-b-0 ${isLast ? '' : 'lg:border-r lg:border-white/8'}`}>
            <p aria-hidden="true" className="pointer-events-none absolute right-4 top-2 text-[clamp(3rem,6vw,4.75rem)] font-semibold uppercase tracking-[-0.06em] text-white/3">
                {item.format}
            </p>

            <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">{item.format}</p>

                <Heading level={3} className="mt-4 text-white">
                    Format {item.format}
                </Heading>

                <Text variant="muted" className="mt-2 text-white/56">
                    {item.dimensions}
                </Text>
            </div>
        </div>
    );
}

function PricingLabelCell({ label }: { label: string }) {
    return (
        <div className="border-r border-white/8 px-6 py-5">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">{label}</p>
        </div>
    );
}

function PricingValueCell({ value }: { value: string }) {
    return (
        <div className="px-6 py-5">
            <p className="text-base text-white/78">{value}</p>
        </div>
    );
}
