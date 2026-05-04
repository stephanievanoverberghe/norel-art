export type UserRole = 'USER' | 'ADMIN';

export type ArtworkStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type ArtworkAvailability = 'AVAILABLE' | 'RESERVED' | 'SOLD';
export type VariantType = 'ORIGINAL' | 'PRINT';
export type ImageKind = 'MAIN' | 'DETAIL' | 'FRAME' | 'CONTEXT';
export type VideoProvider = 'YOUTUBE';

export type CartStatus = 'ACTIVE' | 'CONVERTED' | 'ABANDONED';
export type OrderStatus = 'PENDING' | 'PAID' | 'PREPARING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
export type PaymentStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED';

export type CustomRequestType = 'CUSTOM_ARTWORK' | 'MURAL' | 'CONTACT';
export type CustomRequestStatus = 'NEW' | 'IN_REVIEW' | 'QUOTE_SENT' | 'ACCEPTED' | 'CLOSED';

export type DropStatus = 'DRAFT' | 'SCHEDULED' | 'LIVE' | 'ENDED';
export type WaitlistReason = 'SOLD_ARTWORK' | 'OUT_OF_STOCK_PRINT' | 'DROP_ACCESS' | 'SIMILAR_WORK';
export type WaitlistStatus = 'ACTIVE' | 'NOTIFIED' | 'CONVERTED' | 'CANCELLED';
export type ArtworkEventType = 'VIEW' | 'FAVORITE' | 'ADD_TO_CART' | 'WAITLIST' | 'PURCHASE';

export interface ShopUser {
    id: string;
    email: string;
    name?: string | null;
    role: UserRole;
}

export interface ArtworkCategory {
    id: string;
    slug: string;
    name: string;
    description?: string | null;
}

export interface ArtworkCollection {
    id: string;
    slug: string;
    name: string;
    description?: string | null;
    heroImageUrl?: string | null;
}

export interface ArtworkImage {
    id: string;
    url: string;
    alt: string;
    position: number;
    kind: ImageKind;
}

export interface ArtworkVideo {
    id: string;
    provider: VideoProvider;
    videoId: string;
    title: string;
    thumbnailUrl?: string | null;
    position: number;
    isFeatured: boolean;
}

export interface ProductVariant {
    id: string;
    artworkId: string;
    type: VariantType;
    title: string;
    sku: string;
    priceCents: number;
    currency: 'EUR';
    stock: number;
    maxPerOrder?: number | null;
    editionSize?: number | null;
    editionLabel?: string | null;
    isActive: boolean;
}

export interface ShopArtwork {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    story: string;
    technique?: string | null;
    support?: string | null;
    dimensions?: string | null;
    tags: string[];
    status: ArtworkStatus;
    availability: ArtworkAvailability;
    category: ArtworkCategory;
    collection?: ArtworkCollection | null;
    images: ArtworkImage[];
    videos: ArtworkVideo[];
    variants: ProductVariant[];
}

export interface CartItem {
    id: string;
    variant: ProductVariant;
    quantity: number;
}

export interface Cart {
    id: string;
    status: CartStatus;
    currency: 'EUR';
    items: CartItem[];
}

export interface OrderSummary {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    totalCents: number;
    currency: 'EUR';
    createdAt: string;
}

export interface FavoriteArtwork {
    id: string;
    artwork: ShopArtwork;
    createdAt: string;
}

export interface CertificateSummary {
    id: string;
    artworkId: string;
    certificateNumber: string;
    editionNumber?: number | null;
    issuedAt: string;
    pdfUrl?: string | null;
}

export interface WaitlistEntrySummary {
    id: string;
    email: string;
    reason: WaitlistReason;
    status: WaitlistStatus;
    createdAt: string;
}
