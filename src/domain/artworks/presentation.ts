import type { ArtworkAvailability, ArtworkType } from '@/domain/artworks/types';

const availabilityLabelMap: Record<ArtworkAvailability, string> = {
    available: 'Disponible',
    reserved: 'Réservée',
    sold: 'Vendue',
};

const artworkTypeLabelMap: Record<ArtworkType, string> = {
    original: 'Original',
    print: 'Impression',
};

export function getAvailabilityLabel(availability: ArtworkAvailability): string {
    return availabilityLabelMap[availability];
}

export function getArtworkTypeLabel(type: ArtworkType): string {
    return artworkTypeLabelMap[type];
}

export function formatArtworkPrice(priceEur: number): string {
    return `${priceEur.toLocaleString('fr-FR')} €`;
}
