import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, FolderOpen, Layers3, Plus, Tags } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminBadge, AdminPanel, adminPrimaryButtonClass } from '@/components/admin/AdminPrimitives';
import { getAdminCategories, getAdminCategoryStats } from '@/server/categories/admin-categories';

const statCards = [
    { key: 'total', label: 'Categories', icon: Tags },
    { key: 'used', label: 'Utilisees', icon: FolderOpen },
    { key: 'empty', label: 'A completer', icon: Layers3 },
    { key: 'linkedArtworks', label: 'Oeuvres liees', icon: Tags },
] as const;

export default async function AdminCategoriesPage() {
    const [categories, stats] = await Promise.all([getAdminCategories(), getAdminCategoryStats()]);

    return (
        <>
            <AdminPageHeader
                title="Categories"
                description="Organiser les familles d'oeuvres qui structurent la galerie, les filtres publics et les futures fiches catalogue."
                action={
                    <Link href="/admin/categories/nouvelle" className={adminPrimaryButtonClass}>
                        <Plus size={16} />
                        Nouvelle categorie
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
                    <h2 className="text-lg font-semibold text-white">Structure du catalogue</h2>
                    <p className="mt-1 text-sm text-white/44">Une categorie peut exister avant d&apos;avoir des oeuvres associees.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Categorie</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Image</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Slug</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Description</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Oeuvres</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/8">
                            {categories.map((category) => (
                                <tr key={category.id} className="transition hover:bg-white/[0.035]">
                                    <td className="px-4 py-4">
                                        <p className="font-semibold text-white">{category.name}</p>
                                        <p className="mt-1 text-xs text-white/38">Creee le {category.createdAt.toLocaleDateString('fr-FR')}</p>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="relative h-16 w-12 overflow-hidden rounded-md border border-white/10 bg-white/5">
                                            {category.imageUrl ? <Image src={category.imageUrl} alt={category.imageAlt ?? category.name} fill sizes="48px" className="object-cover" /> : null}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-white/62">/{category.slug}</td>
                                    <td className="max-w-md px-4 py-4 text-white/52">{category.description || 'Aucune description.'}</td>
                                    <td className="px-4 py-4">
                                        <AdminBadge tone={category._count.artworks > 0 ? 'success' : 'muted'}>{category._count.artworks} oeuvre{category._count.artworks > 1 ? 's' : ''}</AdminBadge>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <Link href={`/admin/categories/${category.id}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/4 px-3 text-sm font-medium text-white/62 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                                            Editer
                                            <ArrowUpRight size={15} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-12 text-center text-white/44">
                                        Aucune categorie pour le moment.
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
