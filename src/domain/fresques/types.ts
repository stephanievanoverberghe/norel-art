import type { ContactFormContent } from '@/domain/contact/types';

export interface FresquesPageContent {
    intro: {
        eyebrow: string;
        title: string;
        description: string;
    };
    asideParagraphs: string[];
    form: ContactFormContent;
}
