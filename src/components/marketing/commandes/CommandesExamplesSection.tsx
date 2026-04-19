import Image from 'next/image';

import { SectionIntro } from '@/components/shared/SectionIntro';
import type { CommandesExampleItem, CommandesExamplesSectionContent } from '@/domain/commandes/types';
import { cn } from '@/lib/utils/cn';

import { CommandesSection } from './CommandesSection';

interface CommandesExamplesSectionProps {
    id: string;
    content: CommandesExamplesSectionContent;
}

export function CommandesExamplesSection({ id, content }: CommandesExamplesSectionProps) {
    const [featured, second, third, fourth, fifth, sixth] = content.items;

    return (
        <CommandesSection id={id}>
            <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.intro} centered className="mx-auto max-w-3xl" />

            <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:auto-rows-[8.5rem]">
                {featured ? <FeaturedExampleCard item={featured} className="lg:col-span-7 lg:row-span-4" /> : null}

                <div className="grid gap-4 lg:col-span-5 lg:row-span-4 lg:grid-rows-2">
                    {second ? <ExampleCard item={second} /> : null}
                    {third ? <ExampleCard item={third} /> : null}
                </div>

                {fourth ? <WideExampleCard item={fourth} className="lg:col-span-5 lg:row-span-2" /> : null}
                {fifth ? <WideExampleCard item={fifth} className="lg:col-span-3 lg:row-span-2" /> : null}
                {sixth ? <WideExampleCard item={sixth} className="lg:col-span-4 lg:row-span-2" /> : null}
            </div>
        </CommandesSection>
    );
}

interface ExampleCardProps {
    item: CommandesExampleItem;
    className?: string;
}

function FeaturedExampleCard({ item, className }: ExampleCardProps) {
    return (
        <article className={cn('group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/3 p-2 backdrop-blur-sm', className)}>
            <div className="relative h-full min-h-96 overflow-hidden rounded-[1.3rem] sm:min-h-120">
                <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.08)_45%,rgba(0,0,0,0.62)_100%)]" />
            </div>

            <div className="flex items-center justify-between gap-4 px-3 py-4 sm:px-4">
                <p className="text-base text-white/84 sm:text-lg">{item.label}</p>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/42">Fragment</span>
            </div>
        </article>
    );
}

function ExampleCard({ item, className }: ExampleCardProps) {
    return (
        <article className={cn('group overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/3 p-2', className)}>
            <div className="relative h-full min-h-72 overflow-hidden rounded-[1.05rem]">
                <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.1)_45%,rgba(0,0,0,0.58)_100%)]" />
            </div>

            <p className="px-2 py-3 text-sm text-white/70">{item.label}</p>
        </article>
    );
}

function WideExampleCard({ item, className }: ExampleCardProps) {
    return (
        <article className={cn('group overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/3 p-2', className)}>
            <div className="relative h-full min-h-56 overflow-hidden rounded-2xl">
                <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.58)_100%)]" />
            </div>

            <p className="px-2 py-3 text-sm text-white/70">{item.label}</p>
        </article>
    );
}
