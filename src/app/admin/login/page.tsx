import { Button } from '@/ui/Button';

export default function AdminLoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <form className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6" aria-label="Connexion admin">
                <h1 className="text-2xl font-semibold text-slate-900">Connexion admin</h1>
                <label className="block text-sm text-slate-700">
                    Email
                    <input type="email" className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" />
                </label>
                <label className="block text-sm text-slate-700">
                    Mot de passe
                    <input type="password" className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" />
                </label>
                <Button type="submit" className="w-full rounded-xl bg-slate-900">
                    Se connecter
                </Button>
            </form>
        </div>
    );
}
