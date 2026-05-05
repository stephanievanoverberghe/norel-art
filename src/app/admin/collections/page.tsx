import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, GalleryVerticalEnd, Layers3, Plus, Sparkles, Tags } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminBadge, AdminPanel, adminPrimaryButtonClass } from '@/components/admin/AdminPrimitives';
import { getAdminCollections, getAdminCollectionStats } from '@/server/collections/admin-collections';

const statCards = [
    { key: 'total', label: 'Collections', icon: GalleryVerticalEnd },
    { key: 'published', label: 'Publiees', icon: Tags },
    { key: 'featured', label: 'Mises en avant', icon: Sparkles },
    { key: 'linkedArtworks', label: 'Oeuvres liees', icon: Layers3 },
] as const;

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

export default async function AdminCollectionsPage() {
    const [collections, stats] = await Promise.all([getAdminCollections(), getAdminCollectionStats()]);

    return (
        <>
            <AdminPageHeader
                title="Collections"
                description="Piloter les series fortes : ordre, statut public, image hero, SEO, rattachement des oeuvres et mises en avant."
                action={
                    <Link href="/admin/collections/nouvelle" className={adminPrimaryButtonClass}>
                        <Plus size={16} />
                        Nouvelle collection
                    </Link>
                }
            />

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <AdminPanel key={stat.key} as="article" className="p-5">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm text-white/46">{stat.label}</p>
                                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/52">
                                    <Icon size={17} />
                                </span>
                            </div>
                            <p className="mt-3 text-3xl font-semibold text-white">{stats[stat.key]}</p>
                        </AdminPanel>
                    );
                })}
            </section>

            <AdminPanel className="mt-6 overflow-hidden">
                <div className="border-b border-white/10 px-5 py-4">
                    <h2 className="text-lg font-semibold text-white">Architecture editoriale</h2>
                    <p className="mt-1 text-sm text-white/44">Une collection peut etre preparee en brouillon avant d&apos;apparaitre dans les selections publiques.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Collection</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Image</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Statut</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Ordre</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Oeuvres</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Mise en avant</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/8">
                            {collections.map((collection) => (
                                <tr key={collection.id} className="transition hover:bg-white/[0.035]">
                                    <td className="px-4 py-4">
                                        <p className="font-semibold text-white">{collection.name}</p>
                                        <p className="mt-1 text-xs text-white/38">/{collection.slug}</p>
                                        {collection.eyebrow ? <p className="mt-1 text-xs text-white/46">{collection.eyebrow}</p> : null}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="relative h-16 w-12 overflow-hidden rounded-md border border-white/10 bg-white/5">
                                            {collection.heroImageUrl ? <Image src={collection.heroImageUrl} alt={collection.heroImageAlt ?? collection.name} fill sizes="48px" className="object-cover" /> : null}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <AdminBadge tone={statusTone[collection.status]}>{statusLabel[collection.status]}</AdminBadge>
                                    </td>
                                    <td className="px-4 py-4 text-white/62">{collection.position}</td>
                                    <td className="px-4 py-4">
                                        <AdminBadge tone={collection._count.artworks > 0 ? 'success' : 'muted'}>{collection._count.artworks} oeuvre{collection._count.artworks > 1 ? 's' : ''}</AdminBadge>
                                    </td>
                                    <td className="px-4 py-4">
                                        <AdminBadge tone={collection.isFeatured ? 'accent' : 'muted'}>{collection.isFeatured ? 'Oui' : 'Non'}</AdminBadge>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <Link href={`/admin/collections/${collection.id}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/4 px-3 text-sm font-medium text-white/62 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                                            Editer
                                            <ArrowUpRight size={15} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {collections.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center text-white/44">
                                        Aucune collection pour le moment.
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
