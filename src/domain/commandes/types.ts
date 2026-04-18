export interface CommandesHeroContent {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
}

export interface CommandesSectionNavItem {
    id: string;
    label: string;
}

export interface CommandesOfferingItem {
    title: string;
    text: string;
}

export interface CommandesExampleItem {
    src: string;
    alt: string;
    label: string;
}

export interface CommandesProcessItem {
    step: string;
    title: string;
    text: string;
    aside?: string;
}

export interface CommandesSelectOption {
    value: string;
    label: string;
    description?: string;
}

export interface CommandesPricingItem {
    format: string;
    dimensions: string;
    basePrice: string;
    extraFacePrice: string;
}
export interface CommandesFormContent {
    eyebrow: string;
    title: string;
    intro: string;
    hints: string[];
    submitLabel: string;
    requestTypeOptions: CommandesSelectOption[];
    formatOptions: CommandesSelectOption[];
    techniqueOptions: CommandesSelectOption[];
}

export interface CommandesFinalContent {
    title: string;
    text: string;
    cta: string;
    href: string;
}

export interface CommandesPageContent {
    hero: CommandesHeroContent;
    sectionNav: CommandesSectionNavItem[];
    offeringsTitle: string;
    offeringsIntro: string;
    offerings: CommandesOfferingItem[];
    usageTags: string[];
    techniquesLabel: string;
    examplesTitle: string;
    examplesIntro: string;
    examples: CommandesExampleItem[];
    processTitle: string;
    processIntro: string;
    process: CommandesProcessItem[];
    pricingTitle: string;
    pricingIntro: string;
    pricing: CommandesPricingItem[];
    practicalInfos: string[];
    form: CommandesFormContent;
    final: CommandesFinalContent;
}
