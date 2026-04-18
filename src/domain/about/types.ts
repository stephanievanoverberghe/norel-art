export interface AboutSplitHeadingContent {
    lines: string[];
}

export interface AboutSectionIntroContent {
    eyebrow: string;
    heading: AboutSplitHeadingContent;
    description?: string;
    descriptionLines?: string[];
}

export interface AboutHeroContent {
    eyebrow: string;
    heading: AboutSplitHeadingContent;
    leadLines: string[];
    supportingText: string;
    badge: string;
    image: {
        src: string;
        alt: string;
        sizes: string;
    };
    floatingNote: {
        eyebrow: string;
        lines: string[];
    };
}

export interface AboutJourneyFragment {
    step: string;
    label: string;
    text: string;
    offsetClassName?: string;
}

export interface AboutVisionFragment {
    index: string;
    label: string;
    text: string;
    offsetClassName?: string;
}

export interface AboutFinalCtaContent {
    eyebrow: string;
    heading: AboutSplitHeadingContent;
    bodyLines: string[];
    primaryAction: {
        href: string;
        label: string;
    };
    secondaryAction: {
        href: string;
        label: string;
    };
}

export interface AboutPageContent {
    hero: AboutHeroContent;
    journey: AboutSectionIntroContent & {
        fragments: AboutJourneyFragment[];
    };
    vision: AboutSectionIntroContent & {
        fragments: AboutVisionFragment[];
    };
    finalCta: AboutFinalCtaContent;
}
