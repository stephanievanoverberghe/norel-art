'use client';

import { type FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Loader2, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/ui/Button';
import { FormField } from '@/ui/form/FormField';
import { Input } from '@/ui/form/Input';

interface LoginFormProps {
    callbackUrl: string;
    registered?: boolean;
}

export function LoginForm({ callbackUrl, registered = false }: LoginFormProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsPending(true);

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get('email') ?? '');
        const password = String(formData.get('password') ?? '');

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl,
        });

        if (!result?.ok) {
            setError('Email ou mot de passe incorrect.');
            setIsPending(false);
            return;
        }

        router.push(callbackUrl);
        router.refresh();
    }

    return (
        <form className="grid gap-5" onSubmit={handleSubmit}>
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/42">Connexion</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Entrer dans votre espace</h2>
            </div>

            {registered ? (
                <p className="rounded-md border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
                    Votre compte est pret. Vous pouvez vous connecter.
                </p>
            ) : null}

            {error ? <p className="rounded-md border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}

            <FormField label="Email" htmlFor="email" required>
                <Input id="email" name="email" type="email" autoComplete="email" required />
            </FormField>

            <FormField label="Mot de passe" htmlFor="password" required>
                <Input id="password" name="password" type="password" autoComplete="current-password" required />
            </FormField>

            <Button type="submit" className="w-full gap-2" disabled={isPending}>
                {isPending ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
                Se connecter
            </Button>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/56">
                <Link href={`/inscription?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="transition hover:text-white">
                    Creer un compte
                </Link>
            </div>
        </form>
    );
}
