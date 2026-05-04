import type { Metadata } from 'next';

import { AuthShell } from '@/components/auth/AuthShell';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
    title: 'Connexion',
    description: 'Connexion a votre espace Norel Art.',
};

interface ConnexionPageProps {
    searchParams: Promise<{
        callbackUrl?: string;
        registered?: string;
    }>;
}

function getSafeCallbackUrl(callbackUrl: string | undefined): string {
    if (!callbackUrl || !callbackUrl.startsWith('/') || callbackUrl.startsWith('//')) {
        return '/mon-compte';
    }

    return callbackUrl;
}

export default async function ConnexionPage({ searchParams }: ConnexionPageProps) {
    const params = await searchParams;
    const callbackUrl = getSafeCallbackUrl(params.callbackUrl);

    return (
        <AuthShell
            eyebrow="Espace prive"
            title="Retrouver les pieces qui vous suivent."
            description="Connexion client, suivi des achats, favoris et certificats : le socle de l'experience collectionneur commence ici."
        >
            <LoginForm callbackUrl={callbackUrl} registered={params.registered === '1'} />
        </AuthShell>
    );
}
