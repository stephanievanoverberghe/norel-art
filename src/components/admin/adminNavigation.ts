import type { LucideIcon } from 'lucide-react';
import { Inbox, LayoutDashboard, MessageSquareText, Palette, Settings, ShoppingBag } from 'lucide-react';

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
        href: '/admin/commandes',
        label: 'Commandes',
        description: 'Paiements et suivi',
        icon: ShoppingBag,
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
