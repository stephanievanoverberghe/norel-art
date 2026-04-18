export interface CommandesHeroContent {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
}

export interface CommandesSectionNavItem {
    id: string;
    label: string;
}

export interface CommandesTypeItem {
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

export interface CommandesPricingItem {
    format: string;
    dimensions: string;
    basePrice: string;
    extraFacePrice: string;
}

export interface CommandesFinalContent {
    title: string;
    text: string;
    cta: string;
    href: string;
}

export interface CommandesPageContent {
    hero: CommandesHeroContent;
    types: CommandesTypeItem[];
    examples: CommandesExampleItem[];
    process: CommandesProcessItem[];
    pricingIntro: string;
    pricing: CommandesPricingItem[];
    pricingNotes: string[];
    infos: string[];
    formIntro: string;
    final: CommandesFinalContent;
}
