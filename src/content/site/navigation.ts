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
        title: 'Explorer',
        links: [...mainNavigationLinks, { label: 'Contact', href: '/contact' }],
    },
    {
        title: 'Boutique',
        links: [
            { label: 'Originaux', href: '/oeuvres?type=original' },
            { label: 'Impressions', href: '/oeuvres?type=print' },
            { label: 'Panier', href: '/panier' },
            { label: 'Mon compte', href: '/mon-compte' },
        ],
    },
    {
        title: 'Aide',
        links: [
            { label: 'Livraison et retours', href: '/livraison-retours' },
            { label: 'Conditions de vente', href: '/conditions-generales-vente' },
            { label: 'Confidentialite', href: '/politique-de-confidentialite' },
            { label: 'Cookies', href: '/politique-cookies' },
        ],
    },
];

export const legalLinks: NavigationItem[] = [
    { label: 'Mentions legales', href: '/mentions-legales' },
    { label: 'CGV', href: '/conditions-generales-vente' },
    { label: 'Livraison et retours', href: '/livraison-retours' },
    { label: 'Confidentialite', href: '/politique-de-confidentialite' },
    { label: 'Cookies', href: '/politique-cookies' },
];
