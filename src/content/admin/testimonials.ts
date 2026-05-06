import type { Testimonial } from '@/domain/testimonials/types';

export const testimonials: Testimonial[] = [
    {
        id: 'tes-01',
        clientName: 'Mélanie P.',
        context: 'Commande portrait',
        quote: 'Le portrait correspondait à la demande et les échanges ont été clairs du début à la livraison.',
        status: 'published',
        createdAt: '2026-02-18',
    },
    {
        id: 'tes-02',
        clientName: 'Hôtel Rive Noire',
        context: 'Fresque murale',
        quote: 'La fresque a rendu l’accueil plus identifiable et mieux adapté à notre lieu.',
        status: 'draft',
        createdAt: '2026-03-10',
    },
];
