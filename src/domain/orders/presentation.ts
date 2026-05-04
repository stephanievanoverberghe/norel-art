import type { OrderStatus, PaymentStatus } from '@/domain/ecommerce';

const orderStatusLabels: Record<OrderStatus, string> = {
    PENDING: 'En attente',
    PAID: 'Payee',
    PREPARING: 'En preparation',
    SHIPPED: 'Expediee',
    DELIVERED: 'Livree',
    CANCELLED: 'Annulee',
    REFUNDED: 'Remboursee',
};

const paymentStatusLabels: Record<PaymentStatus, string> = {
    PENDING: 'En attente',
    SUCCEEDED: 'Reussi',
    FAILED: 'Echoue',
    REFUNDED: 'Rembourse',
};

export function getOrderStatusLabel(status: OrderStatus): string {
    return orderStatusLabels[status];
}

export function getPaymentStatusLabel(status: PaymentStatus): string {
    return paymentStatusLabels[status];
}

export function formatOrderPrice(priceCents: number, currency = 'EUR'): string {
    return `${(priceCents / 100).toLocaleString('fr-FR')} ${currency}`;
}

export function formatOrderDate(value: Date): string {
    return value.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}
