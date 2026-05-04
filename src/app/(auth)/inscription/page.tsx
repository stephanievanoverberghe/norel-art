import type { Metadata } from 'next';

import { AuthShell } from '@/components/auth/AuthShell';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
    title: 'Inscription',
    description: 'Creation de compte Norel Art.',
};

interface InscriptionPageProps {
    searchParams: Promise<{
        callbackUrl?: string;
    }>;
}

function getSafeCallbackUrl(callbackUrl: string | undefined): string {
    if (!callbackUrl || !callbackUrl.startsWith('/') || callbackUrl.startsWith('//')) {
        return '/mon-compte';
    }

    return callbackUrl;
}

export default async function InscriptionPage({ searchParams }: InscriptionPageProps) {
    const params = await searchParams;
    const callbackUrl = getSafeCallbackUrl(params.callbackUrl);

    return (
        <AuthShell
            eyebrow="Premier acces"
            title="Ouvrir votre espace collectionneur."
            description="Un compte simple, mais pret pour les favoris, les commandes, les certificats et les demandes sur mesure."
        >
            <RegisterForm callbackUrl={callbackUrl} />
        </AuthShell>
    );
}
