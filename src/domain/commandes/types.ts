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

export interface CommandesTypesSectionContent {
    eyebrow: string;
    title: string;
    intro: string;
    offerings: CommandesOfferingItem[];
    usageTags: string[];
    techniquesLabel: string;
}

export interface CommandesExamplesSectionContent {
    eyebrow: string;
    title: string;
    intro: string;
    items: CommandesExampleItem[];
}

export interface CommandesProcessItem {
    step: string;
    title: string;
    text: string;
    aside?: string;
}

export interface CommandesProcessSectionContent {
    eyebrow: string;
    title: string;
    intro: string;
    items: CommandesProcessItem[];
    frameEyebrow: string;
    frameTitle: string;
    frameText: string;
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

export interface CommandesPricingSectionContent {
    eyebrow: string;
    title: string;
    intro: string;
    items: CommandesPricingItem[];
    tableTitle: string;
    tableSubtitle: string;
    baseRowLabel: string;
    extraRowLabel: string;
    practicalEyebrow: string;
    practicalTitle: string;
    practicalInfos: string[];
}

export interface CommandesFormFieldContent {
    firstNameLabel: string;
    firstNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    requestTypeLabel: string;
    requestTypePlaceholder: string;
    formatLabel: string;
    formatPlaceholder: string;
    facesCountLabel: string;
    facesCountPlaceholder: string;
    techniqueLabel: string;
    techniquePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    preformEyebrow: string;
    preformTitle: string;
    closingText: string;
    footerText: string;
}

export interface CommandesFormContent {
    eyebrow: string;
    title: string;
    intro: string;
    hints: string[];
    submitLabel: string;
    fields: CommandesFormFieldContent;
    requestTypeOptions: CommandesSelectOption[];
    formatOptions: CommandesSelectOption[];
    techniqueOptions: CommandesSelectOption[];
}

export interface CommandesPageContent {
    hero: CommandesHeroContent;
    sectionNav: CommandesSectionNavItem[];
    types: CommandesTypesSectionContent;
    examples: CommandesExamplesSectionContent;
    process: CommandesProcessSectionContent;
    pricing: CommandesPricingSectionContent;
    form: CommandesFormContent;
}
