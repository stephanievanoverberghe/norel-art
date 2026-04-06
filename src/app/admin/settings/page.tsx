import { adminSettings } from '@/content/admin/settings';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/ui/Button';

export default function AdminSettingsPage() {
    return (
        <>
            <AdminPageHeader title="Paramètres" description="Contenus globaux, SEO, coordonnées et réseaux sociaux." />
            <form className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6" aria-label="Paramètres admin">
                <label className="text-sm text-slate-700">
                    Nom du site
                    <input defaultValue={adminSettings.siteTitle} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" />
                </label>
                <label className="text-sm text-slate-700">
                    Description SEO
                    <textarea defaultValue={adminSettings.seoDescription} rows={4} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" />
                </label>
                <label className="text-sm text-slate-700">
                    Email de contact
                    <input defaultValue={adminSettings.contactEmail} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" />
                </label>
                <label className="text-sm text-slate-700">
                    Téléphone
                    <input defaultValue={adminSettings.contactPhone} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" />
                </label>
                <div className="flex justify-end">
                    <Button type="submit" className="rounded-xl bg-slate-900">
                        Enregistrer
                    </Button>
                </div>
            </form>
        </>
    );
}
