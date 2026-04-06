import type { AdminQuickAction, AdminStat } from '@/domain/admin/types';

export const adminStats: AdminStat[] = [
    { label: 'Œuvres publiées', value: '24', trend: '+3 ce mois-ci' },
    { label: 'Demandes en attente', value: '7', trend: '+2 cette semaine' },
    { label: 'Témoignages actifs', value: '11', trend: '2 à valider' },
    { label: 'Taux de conversion contact', value: '18%', trend: '+4 pts sur 30 jours' },
];

export const adminQuickActions: AdminQuickAction[] = [
    {
        label: 'Ajouter une œuvre',
        href: '/admin/oeuvres/nouvelle',
        description: 'Créer une nouvelle fiche avec visuel, prix et disponibilité.',
    },
    {
        label: 'Traiter les demandes',
        href: '/admin/demandes',
        description: 'Prioriser les nouvelles commandes et fresques.',
    },
    {
        label: 'Mettre à jour les paramètres',
        href: '/admin/settings',
        description: 'Ajuster SEO, contact et liens sociaux.',
    },
];
