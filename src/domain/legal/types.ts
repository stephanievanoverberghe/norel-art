export interface LegalPageIntroContent {
    eyebrow: string;
    title: string;
    description: string;
}

export interface LegalPageContent {
    intro: LegalPageIntroContent;
    paragraphs: string[];
}
