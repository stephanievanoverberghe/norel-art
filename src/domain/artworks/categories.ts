export const artworkCategories = ['Portrait', 'Pop Art', 'Manga', 'Graphisme', 'Street Art'] as const;

export type ArtworkCategory = (typeof artworkCategories)[number];
