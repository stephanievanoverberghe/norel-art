import { getServerSession } from 'next-auth';

import { authOptions } from './auth-config';

export function getCurrentSession() {
    return getServerSession(authOptions);
}
