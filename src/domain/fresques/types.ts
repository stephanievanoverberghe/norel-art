export interface FresquesHeroContent {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
}

export interface FresquesSectionNavItem {
    id: string;
    label: string;
}

export interface FresquesIntentionItem {
    title: string;
    text: string;
}

export interface FresquesExampleItem {
    src: string;
    alt: string;
    label: string;
}

export interface FresquesProcessItem {
    step: string;
    title: string;
    text: string;
    aside?: string;
}

export interface FresquesSelectOption {
    value: string;
    label: string;
    description?: string;
}

export interface FresquesFormContent {
    eyebrow: string;
    title: string;
    intro: string;
    hints: string[];
    submitLabel: string;
    placeTypeOptions: FresquesSelectOption[];
    surfaceOptions: FresquesSelectOption[];
    styleOptions: FresquesSelectOption[];
}

export interface FresquesPageContent {
    hero: FresquesHeroContent;
    sectionNav: FresquesSectionNavItem[];
    intentionsTitle: string;
    intentionsIntro: string;
    intentions: FresquesIntentionItem[];
    usageTags: string[];
    examplesTitle: string;
    examplesIntro: string;
    examples: FresquesExampleItem[];
    processTitle: string;
    processIntro: string;
    process: FresquesProcessItem[];
    pricingTitle: string;
    pricingIntro: string;
    practicalInfos: string[];
    form: FresquesFormContent;
}
