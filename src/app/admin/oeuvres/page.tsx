import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ImageIcon, Plus, Search, SlidersHorizontal } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminBadge, AdminPanel, adminInputClass, adminPrimaryButtonClass } from '@/components/admin/AdminPrimitives';
import { artworks } from '@/content/artworks/artworks';
import { formatArtworkPrice, getArtworkTypeLabel, getAvailabilityLabel } from '@/domain/artworks/presentation';

const availabilityTone = {
    available: 'success',
    reserved: 'warning',
    sold: 'muted',
} as const;

export default function AdminOeuvresPage() {
    return (
        <>
            <AdminPageHeader
                title="Oeuvres"
                description="Piloter le catalogue comme une galerie : statut, prix, collection, stock et qualite des visuels."
                action={
                    <Link href="/admin/oeuvres/nouvelle" className={adminPrimaryButtonClass}>
                        <Plus size={16} />
                        Nouvelle oeuvre
                    </Link>
                }
            />

            <AdminPanel className="mb-5 p-4">
                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_14rem_12rem]">
                    <label className="relative">
                        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/34" />
                        <input placeholder="Rechercher une oeuvre, une collection, une technique..." className={`${adminInputClass} pl-9`} />
                    </label>
                    <select className={adminInputClass} defaultValue="all">
                        <option value="all">Tous les statuts</option>
                        <option value="available">Disponible</option>
                        <option value="reserved">Reservee</option>
                        <option value="sold">Vendue</option>
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
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Collection</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Type</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Prix</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Statut</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/8">
                            {artworks.map((artwork) => (
                                <tr key={artwork.id} className="transition hover:bg-white/[0.035]">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-16 w-12 overflow-hidden rounded-md border border-white/10 bg-white/5">
                                                <Image src={artwork.image} alt={artwork.title} fill sizes="48px" className="object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">{artwork.title}</p>
                                                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/42">
                                                    <ImageIcon size={13} />
                                                    {(artwork.gallery?.length ?? 0) + 1} visuels
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-white/62">{artwork.collection}</td>
                                    <td className="px-4 py-4 text-white/62">{getArtworkTypeLabel(artwork.type)}</td>
                                    <td className="px-4 py-4 font-semibold text-white">{formatArtworkPrice(artwork.priceEur)}</td>
                                    <td className="px-4 py-4">
                                        <AdminBadge tone={availabilityTone[artwork.availability]}>{getAvailabilityLabel(artwork.availability)}</AdminBadge>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <Link href={`/admin/oeuvres/${artwork.id}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/4 px-3 text-sm font-medium text-white/62 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                                            Editer
                                            <ArrowUpRight size={15} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminPanel>
        </>
    );
}
