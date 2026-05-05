import type { LucideIcon } from 'lucide-react';
import { Activity, Inbox, Layers3, LayoutDashboard, MessageSquareText, Palette, Rocket, Settings, ShoppingBag, Tags, Users } from 'lucide-react';

export interface AdminNavigationItem {
    href: string;
    label: string;
    description: string;
    icon: LucideIcon;
}

export const adminNavigation: AdminNavigationItem[] = [
    {
        href: '/admin',
        label: 'Pilotage',
        description: 'Vue atelier',
        icon: LayoutDashboard,
    },
    {
        href: '/admin/oeuvres',
        label: 'Oeuvres',
        description: 'Catalogue',
        icon: Palette,
    },
    {
        href: '/admin/categories',
        label: 'Categories',
        description: 'Familles du catalogue',
        icon: Tags,
    },
    {
        href: '/admin/collections',
        label: 'Collections',
        description: 'Series et mises en avant',
        icon: Layers3,
    },
    {
        href: '/admin/drops',
        label: 'Drops',
        description: 'Lancements et waitlist',
        icon: Rocket,
    },
    {
        href: '/admin/commandes',
        label: 'Commandes',
        description: 'Paiements et suivi',
        icon: ShoppingBag,
    },
    {
        href: '/admin/utilisateurs',
        label: 'Utilisateurs',
        description: 'Clients et admins',
        icon: Users,
    },
    {
        href: '/admin/analytics',
        label: 'Analytics',
        description: 'Performance',
        icon: Activity,
    },
    {
        href: '/admin/demandes',
        label: 'Demandes',
        description: 'Contacts et projets',
        icon: Inbox,
    },
    {
        href: '/admin/temoignages',
        label: 'Temoignages',
        description: 'Retours clients',
        icon: MessageSquareText,
    },
    {
        href: '/admin/settings',
        label: 'Parametres',
        description: 'Site et SEO',
        icon: Settings,
    },
];

export function isAdminNavigationItemActive(pathname: string, item: AdminNavigationItem) {
    if (item.href === '/admin') {
        return pathname === '/admin';
    }

    return pathname.startsWith(item.href);
}

export function getActiveAdminNavigationItem(pathname: string) {
    return adminNavigation.find((item) => isAdminNavigationItemActive(pathname, item)) ?? adminNavigation[0];
}
