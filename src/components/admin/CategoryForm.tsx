import { FileText, ImagePlus, Link2, Plus, Save, Tags } from 'lucide-react';

import type { AdminCategory } from '@/server/categories/admin-categories';

import { AdminMediaUploadField } from './AdminMediaUploadField';
import { AdminPanel, adminInputClass, adminLabelClass, adminPrimaryButtonClass } from './AdminPrimitives';

interface CategoryFormProps {
    action: (formData: FormData) => void | Promise<void>;
    category?: AdminCategory;
    mode: 'create' | 'edit';
}

export function CategoryForm({ action, category, mode }: CategoryFormProps) {
    return (
        <form action={action} className="grid gap-5" aria-label="Formulaire categorie admin">
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
                <AdminPanel className="p-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                            <Tags size={18} />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Identite de categorie</h2>
                            <p className="mt-1 text-sm text-white/46">Nom public, adresse SEO et intention de classement.</p>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-4 lg:grid-cols-2">
                        <label className={adminLabelClass}>
                            Nom
                            <span className="relative">
                                <Tags size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/34" />
                                <input name="name" required defaultValue={category?.name} placeholder="Portrait, Street Art..." className={`${adminInputClass} pl-9`} />
                            </span>
                        </label>
                        <label className={adminLabelClass}>
                            Slug
                            <span className="relative">
                                <Link2 size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/34" />
                                <input name="slug" defaultValue={category?.slug} placeholder="portrait" className={`${adminInputClass} pl-9`} />
                            </span>
                        </label>
                        <label className={`${adminLabelClass} lg:col-span-2`}>
                            Description
                            <span className="relative">
                                <FileText size={16} className="pointer-events-none absolute left-3 top-3.5 text-white/34" />
                                <textarea name="description" defaultValue={category?.description ?? ''} rows={5} placeholder="Ce qui definit cette famille d'oeuvres..." className={`${adminInputClass} pl-9`} />
                            </span>
                        </label>
                    </div>
                </AdminPanel>

                <AdminPanel as="aside" className="p-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                            <ImagePlus size={18} />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Image representative</h2>
                            <p className="mt-1 text-sm text-white/46">Visuel de filtre, page categorie et mise en avant.</p>
                        </div>
                    </div>

                    <AdminMediaUploadField
                        altName="imageAlt"
                        className="mt-5"
                        description="Utilisee dans les filtres, les mises en avant et les futures pages categories."
                        folder="categories"
                        initialAlt={category?.imageAlt}
                        initialPublicId={category?.imagePublicId}
                        initialUrl={category?.imageUrl}
                        label="Image categorie"
                        publicIdName="imagePublicId"
                        urlName="imageUrl"
                    />
                </AdminPanel>
            </div>

            <div className="flex justify-end">
                <button type="submit" className={adminPrimaryButtonClass}>
                    {mode === 'create' ? (
                        <>
                            <Plus size={16} />
                            Creer la categorie
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
