export interface ContactFormOption {
    value: string;
    label: string;
}

export interface ContactFormContent {
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    requestTypeLabel: string;
    requestTypePlaceholder: string;
    requestTypeOptions: ContactFormOption[];
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
}

export interface ContactPageContent {
    intro: {
        eyebrow: string;
        title: string;
        description: string;
    };
    asideParagraphs: string[];
    form: ContactFormContent;
}
