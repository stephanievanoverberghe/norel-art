import { SectionIntro } from '@/components/shared/SectionIntro';
import type { FresquesPageContent } from '@/domain/fresques/types';

import { FresquesSection } from './FresquesSection';

interface FresquesPricingSectionProps {
    id: string;
    title: FresquesPageContent['pricingTitle'];
    intro: FresquesPageContent['pricingIntro'];
    practicalInfos: string[];
}

const PRICING_FACTORS = ['Support & état du mur', 'Surface et configuration', 'Technique et niveau de détail', 'Temps de réalisation in situ'];

export function FresquesPricingSection({ id, title, intro, practicalInfos }: FresquesPricingSectionProps) {
    return (
        <FresquesSection id={id}>
            <SectionIntro eyebrow="Repères" title={title} description={intro} centered className="mx-auto max-w-3xl" />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {PRICING_FACTORS.map((factor, index) => (
                    <article key={factor} className="rounded-[1.25rem] border border-white/10 bg-white/3 px-4 py-5">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">Critère {String(index + 1).padStart(2, '0')}</p>
                        <p className="mt-3 text-sm leading-6 text-white/74">{factor}</p>
                    </article>
                ))}
            </div>

            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/3 px-6 py-6 backdrop-blur-sm sm:px-8 sm:py-8">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/34">À savoir</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {practicalInfos.map((info) => (
                        <p key={info} className="rounded-[1.1rem] border border-white/8 bg-white/3 px-4 py-4 text-sm leading-6 text-white/66">
                            {info}
                        </p>
                    ))}
                </div>
            </div>
        </FresquesSection>
    );
}
