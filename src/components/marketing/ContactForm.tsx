import { Button } from '@/ui/Button';

export function ContactForm() {
    return (
        <form className="grid gap-4 rounded-3xl border border-white/10 bg-white/3 p-6" aria-label="Formulaire de contact">
            <label className="text-sm text-white/75">
                Nom complet
                <input type="text" className="mt-2 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-white" />
            </label>
            <label className="text-sm text-white/75">
                Email
                <input type="email" className="mt-2 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-white" />
            </label>
            <label className="text-sm text-white/75">
                Type de demande
                <select className="mt-2 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-white">
                    <option className="bg-(--bg-primary)">Commande sur mesure</option>
                    <option className="bg-(--bg-primary)">Fresque murale</option>
                    <option className="bg-(--bg-primary)">Achat d’œuvre</option>
                    <option className="bg-(--bg-primary)">Autre question</option>
                </select>
            </label>
            <label className="text-sm text-white/75">
                Message
                <textarea rows={5} className="mt-2 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-white" />
            </label>
            <Button type="submit" className="rounded-full">
                Envoyer la demande
            </Button>
        </form>
    );
}
