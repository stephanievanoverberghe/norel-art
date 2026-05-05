'use client';

import { type FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Loader2, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/ui/Button';
import { FormField } from '@/ui/form/FormField';
import { Input } from '@/ui/form/Input';

interface RegisterFormProps {
    callbackUrl: string;
}

export function RegisterForm({ callbackUrl }: RegisterFormProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsPending(true);

        const formData = new FormData(event.currentTarget);
        const name = String(formData.get('name') ?? '');
        const email = String(formData.get('email') ?? '');
        const password = String(formData.get('password') ?? '');

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            setError('Impossible de créer le compte pour l’instant.');
            setIsPending(false);
            return;
        }

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl,
        });

        if (!result?.ok) {
            router.push(`/connexion?registered=1&callbackUrl=${encodeURIComponent(callbackUrl)}`);
            router.refresh();
            return;
        }

        router.push(callbackUrl);
        router.refresh();
    }

    return (
        <form className="grid gap-5" onSubmit={handleSubmit}>
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/42">Inscription</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Créer votre espace</h2>
            </div>

            {error ? <p className="rounded-md border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}

            <FormField label="Nom" htmlFor="name" required>
                <Input id="name" name="name" autoComplete="name" minLength={2} required />
            </FormField>

            <FormField label="Email" htmlFor="email" required>
                <Input id="email" name="email" type="email" autoComplete="email" required />
            </FormField>

            <FormField label="Mot de passe" htmlFor="password" hint="8 caractères minimum." required>
                <Input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required />
            </FormField>

            <Button type="submit" className="w-full gap-2" disabled={isPending}>
                {isPending ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
                Créer le compte
            </Button>

            <p className="text-sm text-white/56">
                Déjà inscrit ?{' '}
                <Link href={`/connexion?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-white transition hover:text-white/72">
                    Se connecter
                </Link>
            </p>
        </form>
    );
}
