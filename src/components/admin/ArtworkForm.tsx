import Image from 'next/image';
import { Euro, ImagePlus, Layers, Link2, Palette, Save, Video } from 'lucide-react';

import type { AdminArtwork } from '@/server/artworks/admin-artworks';
import type { AdminCategory } from '@/server/categories/admin-categories';

import { AdminPanel, adminInputClass, adminLabelClass, adminPrimaryButtonClass } from './AdminPrimitives';

interface ArtworkFormProps {
    action: (formData: FormData) => void | Promise<void>;
    artwork?: AdminArtwork;
    categories: Pick<AdminCategory, 'id' | 'name' | 'slug'>[];
    mode: 'create' | 'edit';
}

function getImageUrl(artwork: AdminArtwork | undefined, kind: 'CONTEXT' | 'DETAIL' | 'FRAME' | 'MAIN') {
    return artwork?.images.find((image) => image.kind === kind)?.url ?? '';
}

function getMainImageAlt(artwork: AdminArtwork | undefined) {
    return artwork?.images.find((image) => image.kind === 'MAIN')?.alt ?? artwork?.title ?? '';
}

export function ArtworkForm({ action, artwork, categories, mode }: ArtworkFormProps) {
    const variant = artwork?.variants[0];
    const video = artwork?.videos[0];
    const selectedCategoryId = artwork?.categoryId ?? categories[0]?.id ?? '';
    const tags = artwork?.tags.join(', ') ?? '';
    const priceEur = variant ? variant.priceCents / 100 : '';
    const videoUrl = video ? `https://www.youtube.com/watch?v=${video.videoId}` : '';

    return (
        <form action={action} className="grid gap-5" aria-label="Formulaire oeuvre admin">
            <AdminPanel className="p-5">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                        <Palette size={18} />
                    </span>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Identite de la piece</h2>
                        <p className="mt-1 text-sm text-white/46">Titre, categorie, collection, texte public et publication.</p>
                    </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <label className={adminLabelClass}>
                        Titre
                        <input name="title" required defaultValue={artwork?.title ?? ''} className={adminInputClass} />
                    </label>
                    <label className={adminLabelClass}>
                        Slug
                        <span className="relative">
                            <Link2 size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/34" />
                            <input name="slug" defaultValue={artwork?.slug ?? ''} placeholder="genere automatiquement si vide" className={`${adminInputClass} pl-9`} />
                        </span>
                    </label>
                    <label className={adminLabelClass}>
                        Categorie
                        <select name="categoryId" required className={adminInputClass} defaultValue={selectedCategoryId}>
                            {categories.length === 0 ? <option value="">Creer une categorie d&apos;abord</option> : null}
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className={adminLabelClass}>
                        Collection
                        <input name="collectionName" defaultValue={artwork?.collection?.name ?? ''} placeholder="Ex: Regards intimes" className={adminInputClass} />
                    </label>
                    <label className={adminLabelClass}>
                        Statut publication
                        <select name="status" className={adminInputClass} defaultValue={artwork?.status ?? 'DRAFT'}>
                            <option value="DRAFT">Brouillon</option>
                            <option value="PUBLISHED">Publiee</option>
                            <option value="ARCHIVED">Archivee</option>
                        </select>
                    </label>
                    <label className={adminLabelClass}>
                        Disponibilite
                        <select name="availability" className={adminInputClass} defaultValue={artwork?.availability ?? 'AVAILABLE'}>
                            <option value="AVAILABLE">Disponible</option>
                            <option value="RESERVED">Reservee</option>
                            <option value="SOLD">Vendue</option>
                        </select>
                    </label>
                    <label className={`${adminLabelClass} lg:col-span-2`}>
                        Accroche courte
                        <textarea name="excerpt" required rows={3} defaultValue={artwork?.excerpt ?? ''} className={adminInputClass} />
                    </label>
                    <label className={`${adminLabelClass} lg:col-span-2`}>
                        Histoire de l&apos;oeuvre
                        <textarea name="story" required rows={6} defaultValue={artwork?.story ?? ''} className={adminInputClass} />
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
                            <p className="mt-1 text-sm text-white/46">Prix, stock, SKU et edition.</p>
                        </div>
                    </div>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <label className={adminLabelClass}>
                            Type de variante
                            <select name="variantType" className={adminInputClass} defaultValue={variant?.type ?? 'ORIGINAL'}>
                                <option value="ORIGINAL">Original</option>
                                <option value="PRINT">Impression</option>
                            </select>
                        </label>
                        <label className={adminLabelClass}>
                            Variante principale
                            <input name="variantTitle" required defaultValue={variant?.title ?? 'Original'} placeholder="Original signe, impression A3..." className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Prix EUR
                            <input name="priceEur" type="number" min="0" step="0.01" defaultValue={priceEur} placeholder="850" className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Stock
                            <input name="stock" type="number" min="0" step="1" defaultValue={variant?.stock ?? 1} className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            SKU
                            <input name="sku" defaultValue={variant?.sku ?? ''} placeholder="NOREL-..." className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Max par commande
                            <input name="maxPerOrder" type="number" min="1" step="1" defaultValue={variant?.maxPerOrder ?? ''} className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Taille edition
                            <input name="editionSize" type="number" min="1" step="1" defaultValue={variant?.editionSize ?? ''} className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Label edition
                            <input name="editionLabel" defaultValue={variant?.editionLabel ?? ''} placeholder="Edition limitee" className={adminInputClass} />
                        </label>
                    </div>
                </AdminPanel>

                <AdminPanel className="p-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                            <Layers size={18} />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Caracteristiques</h2>
                            <p className="mt-1 text-sm text-white/46">Technique, support, dimensions et mots-cles.</p>
                        </div>
                    </div>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <label className={adminLabelClass}>
                            Technique
                            <input name="technique" defaultValue={artwork?.technique ?? ''} placeholder="Acrylique et fusain" className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Support
                            <input name="support" defaultValue={artwork?.support ?? ''} placeholder="Toile coton" className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Dimensions
                            <input name="dimensions" defaultValue={artwork?.dimensions ?? ''} placeholder="80 x 100 cm" className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Tags
                            <input name="tags" defaultValue={tags} placeholder="portrait, intime, contraste" className={adminInputClass} />
                        </label>
                    </div>
                </AdminPanel>
            </div>

            <AdminPanel className="p-5">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                        <ImagePlus size={18} />
                    </span>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Medias</h2>
                        <p className="mt-1 text-sm text-white/46">Image principale, galerie et video YouTube optionnelle.</p>
                    </div>
                </div>

                <div className="mt-5 grid gap-5 xl:grid-cols-[18rem_minmax(0,1fr)]">
                    <div className="relative aspect-4/5 overflow-hidden rounded-md border border-white/10 bg-white/5">
                        {getImageUrl(artwork, 'MAIN') ? (
                            <Image src={getImageUrl(artwork, 'MAIN')} alt={getMainImageAlt(artwork)} fill sizes="18rem" className="object-cover" />
                        ) : (
                            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-white/38">Apercu apres enregistrement</div>
                        )}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className={adminLabelClass}>
                            Image principale
                            <input name="mainImageUrl" defaultValue={getImageUrl(artwork, 'MAIN')} placeholder="/images/oeuvres/oeuvre.jpg" className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Alt image principale
                            <input name="mainImageAlt" defaultValue={getMainImageAlt(artwork)} placeholder={artwork?.title ?? 'Titre de l oeuvre'} className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Image detail
                            <input name="detailImageUrl" defaultValue={getImageUrl(artwork, 'DETAIL')} className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Image encadree
                            <input name="frameImageUrl" defaultValue={getImageUrl(artwork, 'FRAME')} className={adminInputClass} />
                        </label>
                        <label className={`${adminLabelClass} sm:col-span-2`}>
                            Image contexte
                            <input name="contextImageUrl" defaultValue={getImageUrl(artwork, 'CONTEXT')} className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Video YouTube
                            <span className="relative">
                                <Video size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/34" />
                                <input name="videoUrl" defaultValue={videoUrl} placeholder="https://youtube.com/watch?v=..." className={`${adminInputClass} pl-9`} />
                            </span>
                        </label>
                        <label className={adminLabelClass}>
                            Titre video
                            <input name="videoTitle" defaultValue={video?.title ?? ''} placeholder="Dans l atelier" className={adminInputClass} />
                        </label>
                        <label className={`${adminLabelClass} sm:col-span-2`}>
                            Miniature video
                            <input name="videoThumbnailUrl" defaultValue={video?.thumbnailUrl ?? ''} placeholder="Optionnel" className={adminInputClass} />
                        </label>
                    </div>
                </div>
            </AdminPanel>

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
