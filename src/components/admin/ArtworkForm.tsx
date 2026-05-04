import { Euro, ImagePlus, Layers, Palette, Save, Video } from 'lucide-react';

import { AdminPanel, adminInputClass, adminLabelClass, adminPrimaryButtonClass } from './AdminPrimitives';

interface ArtworkFormProps {
    mode: 'create' | 'edit';
    defaultTitle?: string;
}

export function ArtworkForm({ mode, defaultTitle = '' }: ArtworkFormProps) {
    return (
        <form className="grid gap-5" aria-label="Formulaire oeuvre admin">
            <AdminPanel className="p-5">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                        <Palette size={18} />
                    </span>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Identite de la piece</h2>
                        <p className="mt-1 text-sm text-white/46">Titre, famille artistique et description publique.</p>
                    </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <label className={adminLabelClass}>
                        Titre
                        <input defaultValue={defaultTitle} className={adminInputClass} />
                    </label>
                    <label className={adminLabelClass}>
                        Type
                        <select className={adminInputClass} defaultValue="Original">
                            <option>Original</option>
                            <option>Impression</option>
                            <option>Commande sur mesure</option>
                        </select>
                    </label>
                    <label className={adminLabelClass}>
                        Collection
                        <input placeholder="Ex: Regards intimes" className={adminInputClass} />
                    </label>
                    <label className={adminLabelClass}>
                        Statut
                        <select className={adminInputClass} defaultValue="available">
                            <option value="available">Disponible</option>
                            <option value="reserved">Reservee</option>
                            <option value="sold">Vendue</option>
                            <option value="draft">Brouillon</option>
                        </select>
                    </label>
                    <label className={`${adminLabelClass} lg:col-span-2`}>
                        Description
                        <textarea rows={5} className={adminInputClass} />
                    </label>
                </div>
            </AdminPanel>

            <div className="grid gap-5 xl:grid-cols-2">
                <AdminPanel className="p-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                            <Euro size={18} />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Commerce</h2>
                            <p className="mt-1 text-sm text-white/46">Prix, stock et variantes.</p>
                        </div>
                    </div>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <label className={adminLabelClass}>
                            Prix
                            <input type="number" min="0" step="1" placeholder="850" className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Stock
                            <input type="number" min="0" step="1" placeholder="1" className={adminInputClass} />
                        </label>
                        <label className={`${adminLabelClass} sm:col-span-2`}>
                            Variante principale
                            <input placeholder="Original signe, impression A3..." className={adminInputClass} />
                        </label>
                    </div>
                </AdminPanel>

                <AdminPanel className="p-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                            <ImagePlus size={18} />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Media</h2>
                            <p className="mt-1 text-sm text-white/46">Galerie, cadrage et video de presentation.</p>
                        </div>
                    </div>
                    <div className="mt-5 grid gap-4">
                        <label className={adminLabelClass}>
                            Images
                            <div className="flex min-h-28 items-center justify-center rounded-md border border-dashed border-white/14 bg-white/4 px-4 text-center text-sm text-white/42">
                                Glisser les visuels ici
                            </div>
                        </label>
                        <label className={adminLabelClass}>
                            Video YouTube
                            <span className="relative">
                                <Video size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/34" />
                                <input placeholder="https://youtube.com/watch?v=..." className={`${adminInputClass} pl-9`} />
                            </span>
                        </label>
                    </div>
                </AdminPanel>
            </div>

            <div className="flex justify-end">
                <button type="submit" className={adminPrimaryButtonClass}>
                    {mode === 'create' ? (
                        <>
                            <Layers size={16} />
                            Creer la fiche
                        </>
                    ) : (
                        <>
                            <Save size={16} />
                            Enregistrer
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
