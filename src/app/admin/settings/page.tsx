import { AtSign, Globe2, Phone, Save, Search } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminPanel, adminInputClass, adminLabelClass, adminPrimaryButtonClass } from '@/components/admin/AdminPrimitives';
import { adminSettings } from '@/content/admin/settings';

export default function AdminSettingsPage() {
    return (
        <>
            <AdminPageHeader title="Parametres" description="Garder les informations globales du site propres : SEO, coordonnees, signature et reseaux sociaux." />
            <form className="grid gap-5" aria-label="Parametres admin">
                <AdminPanel className="p-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                            <Search size={18} />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Identite et SEO</h2>
                            <p className="mt-1 text-sm text-white/46">Ce qui apparait dans les pages publiques et les moteurs de recherche.</p>
                        </div>
                    </div>
                    <div className="mt-5 grid gap-4">
                        <label className={adminLabelClass}>
                            Nom du site
                            <input defaultValue={adminSettings.siteTitle} className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Description SEO
                            <textarea defaultValue={adminSettings.seoDescription} rows={4} className={adminInputClass} />
                        </label>
                    </div>
                </AdminPanel>

                <div className="grid gap-5 xl:grid-cols-2">
                    <AdminPanel className="p-5">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                                <AtSign size={18} />
                            </span>
                            <div>
                                <h2 className="text-lg font-semibold text-white">Contact atelier</h2>
                                <p className="mt-1 text-sm text-white/46">Coordonnees visibles et emails de gestion.</p>
                            </div>
                        </div>
                        <div className="mt-5 grid gap-4">
                            <label className={adminLabelClass}>
                                Email de contact
                                <input defaultValue={adminSettings.contactEmail} className={adminInputClass} />
                            </label>
                            <label className={adminLabelClass}>
                                Telephone
                                <span className="relative">
                                    <Phone size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/34" />
                                    <input defaultValue={adminSettings.contactPhone} className={`${adminInputClass} pl-9`} />
                                </span>
                            </label>
                        </div>
                    </AdminPanel>

                    <AdminPanel className="p-5">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                                <Globe2 size={18} />
                            </span>
                            <div>
                                <h2 className="text-lg font-semibold text-white">Reseaux</h2>
                                <p className="mt-1 text-sm text-white/46">Liens sociaux et points de presence.</p>
                            </div>
                        </div>
                        <div className="mt-5 grid gap-4">
                            <label className={adminLabelClass}>
                                Instagram
                                <input defaultValue={adminSettings.socialInstagram} className={adminInputClass} />
                            </label>
                            <label className={adminLabelClass}>
                                Facebook
                                <input defaultValue={adminSettings.socialFacebook} className={adminInputClass} />
                            </label>
                            <label className={adminLabelClass}>
                                TikTok
                                <input defaultValue={adminSettings.socialTikTok} className={adminInputClass} />
                            </label>
                        </div>
                    </AdminPanel>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className={adminPrimaryButtonClass}>
                        <Save size={16} />
                        Enregistrer
                    </button>
                </div>
            </form>
        </>
    );
}
