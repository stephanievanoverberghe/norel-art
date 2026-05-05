import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Film, ImageIcon, Layers3, Plus, Search, SlidersHorizontal, Tags } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminBadge, AdminPanel, adminInputClass, adminPrimaryButtonClass, adminSecondaryButtonClass } from '@/components/admin/AdminPrimitives';
import { formatOrderPrice } from '@/domain/orders/presentation';
import { getAdminArtworks } from '@/server/artworks/admin-artworks';
import { getAdminCategories } from '@/server/categories/admin-categories';
import { getAdminCollectionOptions } from '@/server/collections/admin-collections';

const availabilityLabel = {
    AVAILABLE: 'Disponible',
    RESERVED: 'Reservee',
    SOLD: 'Vendue',
} as const;

const availabilityTone = {
    AVAILABLE: 'success',
    RESERVED: 'warning',
    SOLD: 'muted',
} as const;

const statusLabel = {
    ARCHIVED: 'Archivee',
    DRAFT: 'Brouillon',
    PUBLISHED: 'Publiee',
} as const;

const statusTone = {
    ARCHIVED: 'muted',
    DRAFT: 'warning',
    PUBLISHED: 'accent',
} as const;

export default async function AdminOeuvresPage() {
    const [artworks, categories, collections] = await Promise.all([getAdminArtworks(), getAdminCategories(), getAdminCollectionOptions()]);

    return (
        <>
            <AdminPageHeader
                title="Oeuvres"
                description="Piloter le catalogue comme une galerie : statut, prix, stock, categorie, medias et publication."
                action={
                    <>
                        <Link href="/admin/categories" className={adminSecondaryButtonClass}>
                            <Tags size={16} />
                            Categories
                        </Link>
                        <Link href="/admin/collections" className={adminSecondaryButtonClass}>
                            <Layers3 size={16} />
                            Collections
                        </Link>
                        <Link href="/admin/oeuvres/nouvelle" className={adminPrimaryButtonClass}>
                            <Plus size={16} />
                            Nouvelle oeuvre
                        </Link>
                    </>
                }
            />

            <AdminPanel className="mb-5 p-4">
                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_14rem_14rem_14rem_12rem]">
                    <label className="relative">
                        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/34" />
                        <input placeholder="Rechercher une oeuvre, une collection, une technique..." className={`${adminInputClass} pl-9`} />
                    </label>
                    <select className={adminInputClass} defaultValue="all">
                        <option value="all">Toutes les categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <select className={adminInputClass} defaultValue="all">
                        <option value="all">Toutes les collections</option>
                        {collections.map((collection) => (
                            <option key={collection.id} value={collection.id}>
                                {collection.name}
                            </option>
                        ))}
                    </select>
                    <select className={adminInputClass} defaultValue="all">
                        <option value="all">Tous les statuts</option>
                        <option value="PUBLISHED">Publiee</option>
                        <option value="DRAFT">Brouillon</option>
                        <option value="ARCHIVED">Archivee</option>
                    </select>
                    <button type="button" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 text-sm font-medium text-white/62 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                        <SlidersHorizontal size={16} />
                        Filtres
                    </button>
                </div>
            </AdminPanel>

            <AdminPanel className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Piece</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Categorie</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Prix / stock</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Publication</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Disponibilite</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Signaux</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/8">
                            {artworks.map((artwork) => {
                                const mainImage = artwork.images.find((image) => image.kind === 'MAIN') ?? artwork.images[0];
                                const variant = artwork.variants[0];

                                return (
                                    <tr key={artwork.id} className="transition hover:bg-white/[0.035]">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-16 w-12 overflow-hidden rounded-md border border-white/10 bg-white/5">
                                                    {mainImage ? <Image src={mainImage.url} alt={mainImage.alt} fill sizes="48px" className="object-cover" /> : null}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white">{artwork.title}</p>
                                                    <p className="mt-1 flex items-center gap-1.5 text-xs text-white/42">
                                                        <ImageIcon size={13} />
                                                        {artwork.images.length} visuels
                                                        {artwork.videos.length > 0 ? (
                                                            <>
                                                                <Film size={13} />
                                                                video
                                                            </>
                                                        ) : null}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-white/72">{artwork.category.name}</p>
                                            <p className="mt-1 text-xs text-white/38">{artwork.collection?.name ?? 'Collection libre'}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="font-semibold text-white">{variant ? formatOrderPrice(variant.priceCents, variant.currency) : 'Non defini'}</p>
                                            <p className="mt-1 text-xs text-white/42">{variant ? `${variant.stock} en stock` : 'Aucune variante'}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <AdminBadge tone={statusTone[artwork.status]}>{statusLabel[artwork.status]}</AdminBadge>
                                        </td>
                                        <td className="px-4 py-4">
                                            <AdminBadge tone={availabilityTone[artwork.availability]}>{availabilityLabel[artwork.availability]}</AdminBadge>
                                        </td>
                                        <td className="px-4 py-4 text-white/58">
                                            {artwork._count.favorites} favoris / {artwork._count.orderItems} achats
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <Link href={`/admin/oeuvres/${artwork.id}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/4 px-3 text-sm font-medium text-white/62 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                                                Editer
                                                <ArrowUpRight size={15} />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}

                            {artworks.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center text-white/44">
                                        Aucune oeuvre pour le moment.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </AdminPanel>
        </>
    );
}
