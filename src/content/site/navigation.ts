export interface NavigationItem {
    label: string;
    href: string;
}

export interface FooterNavGroup {
    title: string;
    links: NavigationItem[];
}

export const mainNavigationLinks: NavigationItem[] = [
    { label: 'Œuvres', href: '/oeuvres' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Commandes', href: '/commandes' },
    { label: 'Fresques', href: '/fresques' },
];

export const footerNavigationGroups: FooterNavGroup[] = [
    {
        title: 'Navigation',
        links: [...mainNavigationLinks, { label: 'Contact', href: '/contact' }],
    },
    {
        title: 'Collection',
        links: [
            { label: 'Originaux', href: '/oeuvres?type=original' },
            { label: 'Impressions', href: '/oeuvres?type=print' },
            { label: 'Commandes sur mesure', href: '/commandes' },
            { label: 'Fresques murales', href: '/fresques' },
        ],
    },
];

export const legalLinks: NavigationItem[] = [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Confidentialité', href: '/politique-de-confidentialite' },
    { label: 'Contact', href: '/contact' },
];
