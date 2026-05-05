export interface ContactFormOption {
    value: string;
    label: string;
}

export interface ContactFormContent {
    budgetLabel: string;
    budgetPlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    requestTypeLabel: string;
    requestTypePlaceholder: string;
    requestTypeOptions: ContactFormOption[];
    timelineLabel: string;
    timelinePlaceholder: string;
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
