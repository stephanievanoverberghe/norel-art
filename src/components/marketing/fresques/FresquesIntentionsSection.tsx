import { SectionIntro } from '@/components/shared/SectionIntro';
import type { FresquesIntentionItem, FresquesPageContent } from '@/domain/fresques/types';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

import { FresquesSection } from './FresquesSection';

interface FresquesIntentionsSectionProps {
    id: string;
    title: FresquesPageContent['intentionsTitle'];
    intro: FresquesPageContent['intentionsIntro'];
    items: FresquesIntentionItem[];
    usageTags: string[];
}

export function FresquesIntentionsSection({ id, title, intro, items, usageTags }: FresquesIntentionsSectionProps) {
    return (
        <FresquesSection id={id}>
            <SectionIntro eyebrow="Intentions" title={title} description={intro} />

            <div className="mt-8 flex flex-wrap gap-2.5">
                {usageTags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/52">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
                {items.map((item, index) => (
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
        </FresquesSection>
    );
}
