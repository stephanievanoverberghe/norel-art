import type { UserRole } from '@/domain/ecommerce';

export function isAdminRole(role: UserRole | null | undefined): boolean {
    return role === 'ADMIN';
}

export function assertAdminRole(role: UserRole | null | undefined): void {
    if (!isAdminRole(role)) {
        throw new Error('Admin access required');
    }
}
