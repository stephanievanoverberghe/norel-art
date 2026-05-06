import type { ArtworkAvailability, ArtworkType } from '@/domain/artworks/types';

const availabilityLabelMap: Record<ArtworkAvailability, string> = {
    available: 'Disponible',
    reserved: 'Réservée',
    sold: 'Vendue',
};

const artworkTypeLabelMap: Record<ArtworkType, string> = {
    original: 'Peinture',
    print: 'Affiche',
};

export function getAvailabilityLabel(availability: ArtworkAvailability): string {
    return availabilityLabelMap[availability];
}

export function getArtworkTypeLabel(type: ArtworkType): string {
    return artworkTypeLabelMap[type];
}

export function formatArtworkPrice(priceEur: number): string {
    return new Intl.NumberFormat('fr-FR', {
        currency: 'EUR',
        maximumFractionDigits: 0,
        style: 'currency',
    }).format(priceEur);
}
