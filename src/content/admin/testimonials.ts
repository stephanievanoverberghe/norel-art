import type { Testimonial } from '@/domain/testimonials/types';

export const testimonials: Testimonial[] = [
    {
        id: 'tes-01',
        clientName: 'Mélanie P.',
        context: 'Commande portrait',
        quote: 'L’œuvre est intense et profondément fidèle à l’émotion recherchée.',
        status: 'published',
        createdAt: '2026-02-18',
    },
    {
        id: 'tes-02',
        clientName: 'Hôtel Rive Noire',
        context: 'Fresque murale',
        quote: 'La fresque transforme totalement l’atmosphère de notre espace.',
        status: 'draft',
        createdAt: '2026-03-10',
    },
];
