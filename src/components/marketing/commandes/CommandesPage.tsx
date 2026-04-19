import type { CommandesPageContent } from '@/domain/commandes/types';

import { CommandesExamplesSection } from './CommandesExamplesSection';
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

            <CommandesTypesSection id="possibles" content={content.types} previewExamples={content.examples.items} />
            <CommandesExamplesSection id="fragments" content={content.examples} />
            <CommandesProcessSection id="processus" content={content.process} />
            <CommandesPricingSection id="reperes" content={content.pricing} />
            <CommandesFormSection id="formulaire" content={content.form} />
        </>
    );
}
