export interface UniverseContent {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    ctaLabel: string;
    ctaHref: string;
    image: {
        src: string;
        alt: string;
        sizes: string;
    };
}

export interface CustomPathItem {
    title: string;
    eyebrow: string;
    description: string;
    href: string;
    image: string;
    alt: string;
}

export interface CustomPathsContent {
    intro: {
        eyebrow: string;
        title: string;
        description: string;
    };
    items: CustomPathItem[];
}

export interface TestimonialItem {
    quote: string;
    name: string;
    context: string;
}

export interface TestimonialsContent {
    intro: {
        eyebrow: string;
        title: string;
        description: string;
    };
    items: TestimonialItem[];
}
