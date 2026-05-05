import type { ClientRequest } from '@/domain/requests/types';

export const clientRequests: ClientRequest[] = [
    {
        id: 'req-1001',
        fullName: 'Camille D.',
        email: 'camille@example.com',
        type: 'commande',
        status: 'new',
        budget: '900 - 1 300 €',
        location: 'Lyon',
        createdAt: '2026-03-30',
        message: 'Je souhaite un portrait grand format à partir de 2 photos.',
    },
    {
        id: 'req-1002',
        fullName: 'Studio 11',
        email: 'contact@studio11.fr',
        type: 'fresque',
        status: 'in_review',
        budget: '3 000 - 5 000 €',
        location: 'Bordeaux',
        createdAt: '2026-03-27',
        message: 'Fresque intérieure pour hall d’accueil, ambiance organique.',
    },
    {
        id: 'req-1003',
        fullName: 'Julie R.',
        email: 'julie@example.com',
        type: 'contact',
        status: 'quoted',
        budget: 'Non défini',
        location: 'Paris',
        createdAt: '2026-03-24',
        message: 'Question sur les délais de livraison des affiches.',
    },
];
