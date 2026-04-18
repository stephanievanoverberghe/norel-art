import type { CommandesPageContent } from '@/domain/commandes/types';

import { CommandesExamplesSection } from './CommandesExamplesSection';
import { CommandesFinalSection } from './CommandesFinalSection';
import { CommandesFormSection } from './CommandesFormSection';
import { CommandesHero } from './CommandesHero';
import { CommandesPricingSection } from './CommandesPricingSection';
import { CommandesProcessSection } from './CommandesProcessSection';
import { CommandesSectionNav } from './CommandesSectionNav';
import { CommandesTypesSection } from './CommandesTypesSection';

interface CommandesPageProps {
    content: CommandesPageContent;
}

export function CommandesPage({ content }: CommandesPageProps) {
    return (
        <>
            <CommandesHero content={content.hero} />
            <CommandesSectionNav items={content.sectionNav} />

            <CommandesTypesSection
                id="possibles"
                title={content.offeringsTitle}
                intro={content.offeringsIntro}
                offerings={content.offerings}
                usageTags={content.usageTags}
                techniquesLabel={content.techniquesLabel}
                previewExamples={content.examples}
            />
            <CommandesExamplesSection id="fragments" title={content.examplesTitle} intro={content.examplesIntro} items={content.examples} />
            <CommandesProcessSection id="processus" title={content.processTitle} intro={content.processIntro} items={content.process} />
            <CommandesPricingSection id="reperes" title={content.pricingTitle} intro={content.pricingIntro} items={content.pricing} practicalInfos={content.practicalInfos} />
            <CommandesFormSection id="formulaire" content={content.form} />
            <CommandesFinalSection content={content.final} />
        </>
    );
}
