import type { AdminQuickAction, AdminStat } from '@/domain/admin/types';

export const adminStats: AdminStat[] = [
    { label: 'Oeuvres publiees', value: '24', trend: '+3 ce mois-ci' },
    { label: 'Demandes en attente', value: '7', trend: '+2 cette semaine' },
    { label: 'Temoignages actifs', value: '11', trend: '2 a valider' },
    { label: 'Taux de conversion contact', value: '18%', trend: '+4 pts sur 30 jours' },
];

export const adminQuickActions: AdminQuickAction[] = [
    {
        label: 'Ajouter une oeuvre',
        href: '/admin/oeuvres/nouvelle',
        description: 'Creer une nouvelle fiche avec visuel, prix et disponibilite.',
    },
    {
        label: 'Suivre les commandes',
        href: '/admin/commandes',
        description: 'Controler les paiements, preparations et expeditions.',
    },
    {
        label: 'Traiter les demandes',
        href: '/admin/demandes',
        description: 'Prioriser les nouvelles commandes et fresques.',
    },
    {
        label: 'Mettre a jour les parametres',
        href: '/admin/settings',
        description: 'Ajuster SEO, contact et liens sociaux.',
    },
];
