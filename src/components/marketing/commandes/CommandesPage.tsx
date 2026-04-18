import type { CommandesPageContent, CommandesSectionNavItem } from '@/domain/commandes/types';

import { CommandesExamplesSection } from './CommandesExamplesSection';
import { CommandesFinalSection } from './CommandesFinalSection';
import { CommandesFormSection } from './CommandesFormSection';
import { CommandesHero } from './CommandesHero';
import { CommandesInfosSection } from './CommandesInfosSection';
import { CommandesPricingSection } from './CommandesPricingSection';
import { CommandesProcessSection } from './CommandesProcessSection';
import { CommandesSectionNav } from './CommandesSectionNav';
import { CommandesTypesSection } from './CommandesTypesSection';

interface CommandesPageProps {
    content: CommandesPageContent;
}

const sectionNavItems: CommandesSectionNavItem[] = [
    { id: 'possibles', label: 'Possibles' },
    { id: 'fragments', label: 'Fragments' },
    { id: 'processus', label: 'Processus' },
    { id: 'reperes', label: 'Repères' },
    { id: 'a-savoir', label: 'À savoir' },
    { id: 'formulaire', label: 'Formulaire' },
];

export function CommandesPage({ content }: CommandesPageProps) {
    return (
        <>
            <CommandesHero content={content.hero} />
            <CommandesSectionNav items={sectionNavItems} />

            <CommandesTypesSection id="possibles" items={content.types} />
            <CommandesExamplesSection id="fragments" items={content.examples} />
            <CommandesProcessSection id="processus" items={content.process} />
            <CommandesPricingSection id="reperes" intro={content.pricingIntro} items={content.pricing} notes={content.pricingNotes} />
            <CommandesInfosSection id="a-savoir" items={content.infos} />
            <CommandesFormSection id="formulaire" intro={content.formIntro} />
            <CommandesFinalSection content={content.final} />
        </>
    );
}
