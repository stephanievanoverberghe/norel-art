export interface NavigationItem {
    label: string;
    href: string;
}

export interface FooterNavGroup {
    title: string;
    links: NavigationItem[];
}

export const mainNavigationLinks: NavigationItem[] = [
    { label: 'Oeuvres', href: '/oeuvres' },
    { label: 'Commandes', href: '/commandes' },
    { label: 'Fresques', href: '/fresques' },
    { label: 'A propos', href: '/a-propos' },
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
            { label: 'Mon compte', href: '/mon-compte' },
        ],
    },
];

export const legalLinks: NavigationItem[] = [
    { label: 'Mentions legales', href: '/mentions-legales' },
    { label: 'Confidentialite', href: '/politique-de-confidentialite' },
    { label: 'Contact', href: '/contact' },
];
