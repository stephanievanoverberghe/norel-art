import Image from 'next/image';
import { BellRing, CalendarClock, FileText, Link2, ListChecks, Rocket, Save, Sparkles } from 'lucide-react';

import { formatOrderPrice } from '@/domain/orders/presentation';
import type { AdminDrop, AdminDropArtworkOption } from '@/server/drops/admin-drops';

import { AdminMediaUploadField } from './AdminMediaUploadField';
import { AdminBadge, AdminPanel, adminInputClass, adminLabelClass, adminPrimaryButtonClass } from './AdminPrimitives';

interface DropFormProps {
    action: (formData: FormData) => void | Promise<void>;
    artworks: AdminDropArtworkOption[];
    drop?: AdminDrop;
    mode: 'create' | 'edit';
}

const statusLabel = {
    DRAFT: 'Brouillon',
    ENDED: 'Termine',
    LIVE: 'Live',
    SCHEDULED: 'Programme',
} as const;

const artworkStatusLabel = {
    ARCHIVED: 'Archivee',
    DRAFT: 'Brouillon',
    PUBLISHED: 'Publiee',
} as const;

const artworkStatusTone = {
    ARCHIVED: 'muted',
    DRAFT: 'warning',
    PUBLISHED: 'accent',
} as const;

function toDateTimeLocal(value?: Date | null) {
    if (!value) return '';

    const date = new Date(value);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 16);
}

function getDefaultStartsAt() {
    const date = new Date();
    date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15, 0, 0);
    return toDateTimeLocal(date);
}

export function DropForm({ action, artworks, drop, mode }: DropFormProps) {
    const selectedPositions = new Map(drop?.artworks.map((link) => [link.artworkId, link.position]) ?? []);
    const startsAt = toDateTimeLocal(drop?.startsAt) || getDefaultStartsAt();
    const endsAt = toDateTimeLocal(drop?.endsAt);

    return (
        <form action={action} className="grid gap-5" aria-label="Formulaire drop admin">
            <AdminPanel className="p-5">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                        <Rocket size={18} />
                    </span>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Identite du lancement</h2>
                        <p className="mt-1 text-sm text-white/46">Titre, statut, slug, message public et promesse du drop.</p>
                    </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <label className={adminLabelClass}>
                        Titre
                        <input name="title" required defaultValue={drop?.title ?? ''} placeholder="Drop atelier printemps" className={adminInputClass} />
                    </label>
                    <label className={adminLabelClass}>
                        Slug
                        <span className="relative">
                            <Link2 size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/34" />
                            <input name="slug" defaultValue={drop?.slug ?? ''} placeholder="genere automatiquement si vide" className={`${adminInputClass} pl-9`} />
                        </span>
                    </label>
                    <label className={adminLabelClass}>
                        Eyebrow
                        <input name="eyebrow" defaultValue={drop?.eyebrow ?? ''} placeholder="Édition limitée, ouverture privée..." className={adminInputClass} />
                    </label>
                    <label className={adminLabelClass}>
                        Libelle d&apos;acces
                        <input name="accessLabel" defaultValue={drop?.accessLabel ?? ''} placeholder="Acces prioritaire, liste VIP..." className={adminInputClass} />
                    </label>
                    <label className={adminLabelClass}>
                        Statut
                        <select name="status" className={adminInputClass} defaultValue={drop?.status ?? 'DRAFT'}>
                            <option value="DRAFT">{statusLabel.DRAFT}</option>
                            <option value="SCHEDULED">{statusLabel.SCHEDULED}</option>
                            <option value="LIVE">{statusLabel.LIVE}</option>
                            <option value="ENDED">{statusLabel.ENDED}</option>
                        </select>
                    </label>
                    <div className="grid gap-2 sm:grid-cols-2">
                        <label className="flex min-h-11 items-center gap-3 rounded-md border border-white/10 bg-white/4 px-3 text-sm font-medium text-white/72">
                            <input name="isFeatured" type="checkbox" defaultChecked={drop?.isFeatured ?? false} className="h-4 w-4 accent-(--accent)" />
                            Mise en avant
                        </label>
                        <label className="flex min-h-11 items-center gap-3 rounded-md border border-white/10 bg-white/4 px-3 text-sm font-medium text-white/72">
                            <input name="waitlistEnabled" type="checkbox" defaultChecked={drop?.waitlistEnabled ?? true} className="h-4 w-4 accent-(--accent)" />
                            Waitlist active
                        </label>
                    </div>
                    <label className={`${adminLabelClass} lg:col-span-2`}>
                        Description
                        <textarea name="description" required rows={5} defaultValue={drop?.description ?? ''} placeholder="Raconter ce lancement, son intention, les pieces incluses et le niveau d'acces." className={adminInputClass} />
                    </label>
                </div>
            </AdminPanel>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)]">
                <AdminPanel className="p-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                            <CalendarClock size={18} />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Fenetre de lancement</h2>
                            <p className="mt-1 text-sm text-white/46">Dates de debut, de fin et activation de la waitlist.</p>
                        </div>
                    </div>
                    <div className="mt-5 grid gap-4">
                        <label className={adminLabelClass}>
                            Debut
                            <input name="startsAt" required type="datetime-local" defaultValue={startsAt} className={adminInputClass} />
                        </label>
                        <label className={adminLabelClass}>
                            Fin optionnelle
                            <input name="endsAt" type="datetime-local" defaultValue={endsAt} className={adminInputClass} />
                        </label>
                        <div className="rounded-md border border-white/10 bg-white/4 p-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                <BellRing size={16} />
                                Waitlist
                            </div>
                            <p className="mt-2 text-sm leading-6 text-white/50">Les inscriptions seront rattachees au drop pour pouvoir notifier les collectionneurs avant ou pendant le lancement.</p>
                        </div>
                    </div>
                </AdminPanel>

                <AdminPanel className="p-5">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                            <Sparkles size={18} />
                        </span>
                        <div>
                            <h2 className="text-lg font-semibold text-white">Image hero</h2>
                            <p className="mt-1 text-sm text-white/46">Visuel fort pour la page du drop et les futures mises en avant.</p>
                        </div>
                    </div>
                    <AdminMediaUploadField
                        altName="heroImageAlt"
                        className="mt-5"
                        description="Image de campagne ou piece signature du lancement."
                        folder="drops"
                        initialAlt={drop?.heroImageAlt ?? drop?.title ?? ''}
                        initialPublicId={drop?.heroImagePublicId ?? ''}
                        initialUrl={drop?.heroImageUrl ?? ''}
                        label="Image drop"
                        publicIdName="heroImagePublicId"
                        urlName="heroImageUrl"
                    />
                </AdminPanel>
            </div>

            <AdminPanel className="p-5">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                        <ListChecks size={18} />
                    </span>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Oeuvres du drop</h2>
                        <p className="mt-1 text-sm text-white/46">Selectionner les pieces incluses et definir leur ordre dans le lancement.</p>
                    </div>
                </div>

                <div className="mt-5 overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Inclure</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Piece</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Categorie</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Prix</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Position</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/8">
                            {artworks.map((artwork, index) => {
                                const mainImage = artwork.images[0];
                                const variant = artwork.variants[0];
                                const selectedPosition = selectedPositions.get(artwork.id);

                                return (
                                    <tr key={artwork.id} className="transition hover:bg-white/[0.035]">
                                        <td className="px-4 py-4">
                                            <input name="artworkIds" type="checkbox" value={artwork.id} defaultChecked={selectedPosition !== undefined} className="h-4 w-4 accent-(--accent)" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-16 w-12 overflow-hidden rounded-md border border-white/10 bg-white/5">
                                                    {mainImage ? <Image src={mainImage.url} alt={mainImage.alt} fill sizes="48px" className="object-cover" /> : null}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white">{artwork.title}</p>
                                                    <p className="mt-1 text-xs text-white/38">{artwork.collection?.name ?? 'Collection libre'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-white/66">{artwork.category.name}</p>
                                            <div className="mt-2">
                                                <AdminBadge tone={artworkStatusTone[artwork.status]}>{artworkStatusLabel[artwork.status]}</AdminBadge>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-white/62">{variant ? formatOrderPrice(variant.priceCents, variant.currency) : 'Non defini'}</td>
                                        <td className="px-4 py-4">
                                            <input name={`position-${artwork.id}`} type="number" min="0" step="1" defaultValue={selectedPosition ?? index} className={`${adminInputClass} max-w-24`} />
                                        </td>
                                    </tr>
                                );
                            })}

                            {artworks.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-12 text-center text-white/44">
                                        Aucune oeuvre disponible pour composer un drop.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </AdminPanel>

            <AdminPanel className="p-5">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70">
                        <FileText size={18} />
                    </span>
                    <div>
                        <h2 className="text-lg font-semibold text-white">SEO</h2>
                        <p className="mt-1 text-sm text-white/46">Donnees pretes pour une future page publique du drop.</p>
                    </div>
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <label className={adminLabelClass}>
                        Titre SEO
                        <input name="seoTitle" defaultValue={drop?.seoTitle ?? ''} placeholder="Drop atelier - Norel Art" className={adminInputClass} />
                    </label>
                    <label className={adminLabelClass}>
                        Description SEO
                        <textarea name="seoDescription" rows={3} defaultValue={drop?.seoDescription ?? ''} placeholder="Resume court du lancement pour Google et les partages." className={adminInputClass} />
                    </label>
                </div>
            </AdminPanel>

            <div className="flex justify-end">
                <button type="submit" className={adminPrimaryButtonClass}>
                    {mode === 'create' ? (
                        <>
                            <Rocket size={16} />
                            Creer le drop
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
