import type { AdminQuickAction, AdminStat } from '@/domain/admin/types';

export const adminStats: AdminStat[] = [
    { label: 'Oeuvres publiees', value: '24', trend: '+3 ce mois-ci' },
    { label: 'Demandes en attente', value: '7', trend: '+2 cette semaine' },
    { label: 'Temoignages actifs', value: '11', trend: '2 a valider' },
    { label: 'Conversion contact', value: '18%', trend: '+4 pts sur 30 jours' },
];

export const adminQuickActions: AdminQuickAction[] = [
    {
        label: 'Ajouter une oeuvre',
        href: '/admin/oeuvres/nouvelle',
        description: 'Composer une fiche premium avec visuels, prix, stock et media.',
    },
    {
        label: 'Structurer les categories',
        href: '/admin/categories',
        description: 'Creer et organiser les familles qui pilotent le catalogue.',
    },
    {
        label: 'Suivre les commandes',
        href: '/admin/commandes',
        description: 'Controler paiements, preparation atelier et expedition.',
    },
    {
        label: 'Traiter les demandes',
        href: '/admin/demandes',
        description: 'Qualifier les projets sur mesure, fresques et contacts entrants.',
    },
    {
        label: 'Regler le site',
        href: '/admin/settings',
        description: 'Ajuster SEO, coordonnees, reseaux et informations atelier.',
    },
];
