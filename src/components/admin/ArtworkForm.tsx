import { Button } from '@/ui/Button';

interface ArtworkFormProps {
    mode: 'create' | 'edit';
    defaultTitle?: string;
}

export function ArtworkForm({ mode, defaultTitle = '' }: ArtworkFormProps) {
    return (
        <form className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6" aria-label="Formulaire œuvre admin">
            <label className="text-sm text-slate-700">
                Titre
                <input defaultValue={defaultTitle} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" />
            </label>
            <label className="text-sm text-slate-700">
                Type
                <select className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2">
                    <option>Original</option>
                    <option>Impression</option>
                </select>
            </label>
            <label className="text-sm text-slate-700">
                Prix (€)
                <input type="number" className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" />
            </label>
            <label className="text-sm text-slate-700">
                Description
                <textarea rows={5} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" />
            </label>
            <div className="flex justify-end">
                <Button type="submit" className="rounded-xl bg-slate-900">
                    {mode === 'create' ? 'Créer l’œuvre' : 'Mettre à jour'}
                </Button>
            </div>
        </form>
    );
}
