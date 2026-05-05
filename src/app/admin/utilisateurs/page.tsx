import Link from 'next/link';
import { ArrowUpRight, Heart, ShieldCheck, ShoppingBag, UserRound, Users } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminBadge, AdminPanel } from '@/components/admin/AdminPrimitives';
import { getAdminUsers, getAdminUserStats } from '@/server/users/admin-users';

const statCards = [
    { key: 'total', label: 'Utilisateurs', icon: Users },
    { key: 'customers', label: 'Clients', icon: UserRound },
    { key: 'admins', label: 'Admins', icon: ShieldCheck },
    { key: 'buyers', label: 'Acheteurs', icon: ShoppingBag },
] as const;

export default async function AdminUsersPage() {
    const [users, stats] = await Promise.all([getAdminUsers(), getAdminUserStats()]);

    return (
        <>
            <AdminPageHeader title="Utilisateurs" description="Piloter les comptes clients et admins : achats, favoris, demandes et niveau d'acces." />

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
                    <h2 className="text-lg font-semibold text-white">Base utilisateurs</h2>
                    <p className="mt-1 text-sm text-white/44">{stats.withFavorites} utilisateurs ont deja enregistre des favoris.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Utilisateur</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Role</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Achats</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Favoris</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Demandes</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Inscription</th>
                                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/8">
                            {users.map((user) => (
                                <tr key={user.id} className="transition hover:bg-white/[0.035]">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/52">
                                                <UserRound size={17} />
                                            </span>
                                            <div>
                                                <p className="font-semibold text-white">{user.name ?? 'Utilisateur'}</p>
                                                <p className="mt-1 text-xs text-white/38">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <AdminBadge tone={user.role === 'ADMIN' ? 'accent' : 'neutral'}>{user.role}</AdminBadge>
                                    </td>
                                    <td className="px-4 py-4 text-white/62">{user._count.orders}</td>
                                    <td className="px-4 py-4">
                                        <span className="inline-flex items-center gap-2 text-white/62">
                                            <Heart size={14} />
                                            {user._count.favorites}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-white/62">{user._count.requests}</td>
                                    <td className="px-4 py-4 text-white/52">{user.createdAt.toLocaleDateString('fr-FR')}</td>
                                    <td className="px-4 py-4 text-right">
                                        <Link href={`/admin/utilisateurs/${user.id}`} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/4 px-3 text-sm font-medium text-white/62 transition hover:border-white/20 hover:bg-white/8 hover:text-white">
                                            Ouvrir
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
