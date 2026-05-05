import { FileText, GalleryVerticalEnd, Link2, Save, Sparkles } from 'lucide-react';

import type { AdminCollection } from '@/server/collections/admin-collections';

import { AdminMediaUploadField } from './AdminMediaUploadField';
import { AdminPanel, adminInputClass, adminLabelClass, adminPrimaryButtonClass } from './AdminPrimitives';

interface CollectionFormProps {
    action: (formData: FormData) => void | Promise<void>;
    collection?: AdminCollection;
    mode: 'create' | 'edit';
}

export function CollectionForm({ action, collection, mode }: CollectionFormProps) {
    return (
        <form action={action} className="grid gap-5" aria-label="Formulaire collection admin">
            <AdminPanel className="p-5">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                        <GalleryVerticalEnd size={18} />
                    </span>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Identite de la collection</h2>
                        <p className="mt-1 text-sm text-white/46">Nom public, slug, intention editoriale et ordre d&apos;apparition.</p>
                    </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <label className={adminLabelClass}>
                        Nom
                        <input name="name" required defaultValue={collection?.name ?? ''} placeholder="Fragments interieurs" className={adminInputClass} />
                    </label>
                    <label className={adminLabelClass}>
                        Slug
                        <span className="relative">
                            <Link2 size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/34" />
                            <input name="slug" defaultValue={collection?.slug ?? ''} placeholder="genere automatiquement si vide" className={`${adminInputClass} pl-9`} />
                        </span>
                    </label>
                    <label className={adminLabelClass}>
                        Eyebrow
                        <input name="eyebrow" defaultValue={collection?.eyebrow ?? ''} placeholder="Serie intime, drop limite..." className={adminInputClass} />
                    </label>
                    <label className={adminLabelClass}>
                        Position
                        <input name="position" type="number" min="0" step="1" defaultValue={collection?.position ?? 0} className={adminInputClass} />
                    </label>
                    <label className={adminLabelClass}>
                        Statut
                        <select name="status" className={adminInputClass} defaultValue={collection?.status ?? 'DRAFT'}>
                            <option value="DRAFT">Brouillon</option>
                            <option value="PUBLISHED">Publiee</option>
                            <option value="ARCHIVED">Archivee</option>
                        </select>
                    </label>
                    <label className="flex min-h-11 items-center gap-3 rounded-md border border-white/10 bg-white/4 px-3 text-sm font-medium text-white/72">
                        <input name="isFeatured" type="checkbox" defaultChecked={collection?.isFeatured ?? false} className="h-4 w-4 accent-(--accent)" />
                        Mettre en avant dans les selections fortes
                    </label>
                    <label className={`${adminLabelClass} lg:col-span-2`}>
                        Description
                        <textarea name="description" rows={5} defaultValue={collection?.description ?? ''} placeholder="Texte court pour raconter l'intention de la collection." className={adminInputClass} />
                    </label>
                </div>
            </AdminPanel>

            <div className="grid gap-5 xl:grid-cols-[minmax(18rem,0.48fr)_minmax(0,0.52fr)]">
                <AdminPanel className="p-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                            <Sparkles size={18} />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Visuel hero</h2>
                            <p className="mt-1 text-sm text-white/46">Image d&apos;ambiance ou piece signature pour incarner la collection.</p>
                        </div>
                    </div>
                    <AdminMediaUploadField
                        altName="heroImageAlt"
                        className="mt-5"
                        description="Image utilisee pour les pages collection et les blocs de mise en avant."
                        folder="collections"
                        initialAlt={collection?.heroImageAlt ?? collection?.name ?? ''}
                        initialPublicId={collection?.heroImagePublicId ?? ''}
                        initialUrl={collection?.heroImageUrl ?? ''}
                        label="Image collection"
                        publicIdName="heroImagePublicId"
                        urlName="heroImageUrl"
                    />
                </AdminPanel>

                <AdminPanel className="p-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                            <FileText size={18} />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold text-white">SEO et lecture publique</h2>
                            <p className="mt-1 text-sm text-white/46">Titre et resume courts pour preparer les pages collection.</p>
                        </div>
                    </div>
                    <div className="mt-5 grid gap-4">
                        <label className={adminLabelClass}>
                            Titre SEO
                            <input name="seoTitle" defaultValue={collection?.seoTitle ?? ''} placeholder="Collection Fragments interieurs - Norel Art" className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Description SEO
                            <textarea name="seoDescription" rows={4} defaultValue={collection?.seoDescription ?? ''} placeholder="Resume public court pour Google et les partages." className={adminInputClass} />
                        </label>
                        <div className="rounded-md border border-white/10 bg-white/4 p-4">
                            <p className="text-sm font-semibold text-white">Pieces rattachees</p>
                            <p className="mt-2 text-sm leading-6 text-white/50">
                                {collection ? `${collection._count.artworks} oeuvre${collection._count.artworks > 1 ? 's' : ''} liee${collection._count.artworks > 1 ? 's' : ''} a cette collection.` : 'Les oeuvres pourront etre rattachees apres creation.'}
                            </p>
                        </div>
                    </div>
                </AdminPanel>
            </div>

            <div className="flex justify-end">
                <button type="submit" className={adminPrimaryButtonClass}>
                    {mode === 'create' ? (
                        <>
                            <GalleryVerticalEnd size={16} />
                            Creer la collection
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
