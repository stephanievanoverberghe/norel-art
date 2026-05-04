import type { UserRole } from '@/domain/ecommerce';

declare module 'next-auth' {
    interface Session {
        user?: {
            id: string;
            role: UserRole;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }

    interface User {
        role: UserRole;
    }
}
