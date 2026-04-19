import type { FresquesPageContent } from '@/domain/fresques/types';

import { FresquesExamplesSection } from './FresquesExamplesSection';
import { FresquesFormSection } from './FresquesFormSection';
import { FresquesHero } from './FresquesHero';
import { FresquesIntentionsSection } from './FresquesIntentionsSection';
import { FresquesPricingSection } from './FresquesPricingSection';
import { FresquesProcessSection } from './FresquesProcessSection';
import { FresquesSectionNav } from './FresquesSectionNav';

interface FresquesPageProps {
    content: FresquesPageContent;
}

export function FresquesPage({ content }: FresquesPageProps) {
    return (
        <>
            <FresquesHero content={content.hero} />
            <FresquesSectionNav items={content.sectionNav} />

            <FresquesIntentionsSection id="intentions" title={content.intentionsTitle} intro={content.intentionsIntro} items={content.intentions} usageTags={content.usageTags} />
            <FresquesExamplesSection id="fragments" title={content.examplesTitle} intro={content.examplesIntro} items={content.examples} />
            <FresquesProcessSection id="processus" title={content.processTitle} intro={content.processIntro} items={content.process} />
            <FresquesPricingSection id="reperes" title={content.pricingTitle} intro={content.pricingIntro} practicalInfos={content.practicalInfos} />
            <FresquesFormSection id="formulaire" content={content.form} />
        </>
    );
}
