import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Heart, Home, Mail, Package, Save, ShieldCheck, UserRound } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminBadge, AdminPanel, adminInputClass, adminPrimaryButtonClass, adminSecondaryButtonClass } from '@/components/admin/AdminPrimitives';
import { formatOrderDate, formatOrderPrice, getOrderStatusLabel } from '@/domain/orders/presentation';
import { getCurrentSession } from '@/server/auth/session';
import { getAdminUserById } from '@/server/users/admin-users';

import { updateUserRoleAction } from '../actions';

interface AdminUserDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function AdminUserDetailPage({ params }: AdminUserDetailPageProps) {
    const { id } = await params;
    const [user, session] = await Promise.all([getAdminUserById(id), getCurrentSession()]);

    if (!user) {
        notFound();
    }

    const updateRole = updateUserRoleAction.bind(null, user.id);
    const isCurrentUser = session?.user?.id === user.id;

    return (
        <>
            <AdminPageHeader
                title={user.name ?? 'Utilisateur'}
                description={`Compte ${user.email} cree le ${formatOrderDate(user.createdAt)}.`}
                eyebrow="Profil utilisateur"
                action={
                    <Link href="/admin/utilisateurs" className={adminSecondaryButtonClass}>
                        <ArrowLeft size={16} />
                        Retour
                    </Link>
                }
            />

            <section className="grid gap-4 md:grid-cols-4">
                <AdminPanel className="p-5">
                    <p className="text-sm text-white/46">Commandes</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{user._count.orders}</p>
                </AdminPanel>
                <AdminPanel className="p-5">
                    <p className="text-sm text-white/46">Favoris</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{user._count.favorites}</p>
                </AdminPanel>
                <AdminPanel className="p-5">
                    <p className="text-sm text-white/46">Adresses</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{user._count.addresses}</p>
                </AdminPanel>
                <AdminPanel className="p-5">
                    <p className="text-sm text-white/46">Demandes</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{user._count.requests}</p>
                </AdminPanel>
            </section>

            <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_24rem]">
                <div className="space-y-5">
                    <AdminPanel className="overflow-hidden">
                        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                            <div>
                                <h2 className="text-lg font-semibold text-white">Commandes recentes</h2>
                                <p className="mt-1 text-sm text-white/44">Historique commercial du compte.</p>
                            </div>
                            <Package size={18} className="text-white/42" />
                        </div>
                        <div className="divide-y divide-white/8">
                            {user.orders.map((order) => (
                                <Link key={order.id} href={`/admin/commandes/${order.orderNumber}`} className="grid gap-3 px-5 py-4 transition hover:bg-white/[0.035] sm:grid-cols-[minmax(0,1fr)_auto]">
                                    <div>
                                        <p className="font-semibold text-white">{order.orderNumber}</p>
                                        <p className="mt-1 text-sm text-white/44">{formatOrderDate(order.createdAt)}</p>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <AdminBadge>{getOrderStatusLabel(order.status)}</AdminBadge>
                                        <p className="mt-2 font-semibold text-white">{formatOrderPrice(order.totalCents, order.currency)}</p>
                                    </div>
                                </Link>
                            ))}
                            {user.orders.length === 0 ? <p className="px-5 py-8 text-sm text-white/44">Aucune commande.</p> : null}
                        </div>
                    </AdminPanel>

                    <AdminPanel className="p-5">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-white">Favoris</h2>
                                <p className="mt-1 text-sm text-white/44">Intentions artistiques visibles dans son espace client.</p>
                            </div>
                            <Heart size={18} className="text-white/42" />
                        </div>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {user.favorites.map((favorite) => {
                                const image = favorite.artwork.images[0]?.url;

                                return (
                                    <Link key={favorite.id} href={`/admin/oeuvres/${favorite.artwork.id}`} className="grid grid-cols-[4rem_minmax(0,1fr)] gap-3 rounded-md border border-white/8 bg-white/4 p-3 transition hover:border-white/16 hover:bg-white/7">
                                        <div className="relative aspect-4/5 overflow-hidden rounded-md border border-white/10 bg-white/5">
                                            {image ? <Image src={image} alt={favorite.artwork.title} fill sizes="4rem" className="object-cover" /> : null}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{favorite.artwork.title}</p>
                                            <p className="mt-1 text-xs text-white/38">{formatOrderDate(favorite.createdAt)}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                            {user.favorites.length === 0 ? <p className="text-sm text-white/44">Aucun favori.</p> : null}
                        </div>
                    </AdminPanel>
                </div>

                <aside className="space-y-5">
                    <AdminPanel className="p-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/62">
                                <UserRound size={18} />
                            </span>
                            <div>
                                <h2 className="text-lg font-semibold text-white">Identite</h2>
                                <p className="mt-1 text-sm text-white/44">Profil et contact.</p>
                            </div>
                        </div>
                        <div className="mt-5 space-y-3 text-sm text-white/58">
                            <p className="flex items-center gap-2">
                                <Mail size={15} />
                                {user.email}
                            </p>
                            <p>{user.profile?.firstName ?? ''} {user.profile?.lastName ?? ''}</p>
                            {user.profile?.phone ? <p>{user.profile.phone}</p> : null}
                            <AdminBadge tone={user.profile?.marketingOptIn ? 'success' : 'muted'}>{user.profile?.marketingOptIn ? 'Newsletter OK' : 'Newsletter non'}</AdminBadge>
                        </div>
                    </AdminPanel>

                    <AdminPanel className="p-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/62">
                                <ShieldCheck size={18} />
                            </span>
                            <div>
                                <h2 className="text-lg font-semibold text-white">Acces</h2>
                                <p className="mt-1 text-sm text-white/44">Role du compte.</p>
                            </div>
                        </div>
                        <form action={updateRole} className="mt-5 grid gap-3">
                            <select name="role" defaultValue={user.role} className={adminInputClass} disabled={isCurrentUser}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                            <button type="submit" className={adminPrimaryButtonClass} disabled={isCurrentUser}>
                                <Save size={16} />
                                Mettre a jour
                            </button>
                            {isCurrentUser ? <p className="text-xs leading-5 text-white/38">Ton propre role admin est protege pour eviter de verrouiller l&apos;acces.</p> : null}
                        </form>
                    </AdminPanel>

                    <AdminPanel className="p-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/62">
                                <Home size={18} />
                            </span>
                            <div>
                                <h2 className="text-lg font-semibold text-white">Adresses</h2>
                                <p className="mt-1 text-sm text-white/44">Livraison et facturation.</p>
                            </div>
                        </div>
                        <div className="mt-5 space-y-3">
                            {user.addresses.map((address) => (
                                <div key={address.id} className="rounded-md border border-white/8 bg-white/4 p-4 text-sm leading-6 text-white/58">
                                    <p className="font-medium text-white">{address.fullName}</p>
                                    <p>{address.line1}</p>
                                    {address.line2 ? <p>{address.line2}</p> : null}
                                    <p>{address.postalCode} {address.city}, {address.country}</p>
                                </div>
                            ))}
                            {user.addresses.length === 0 ? <p className="text-sm text-white/44">Aucune adresse.</p> : null}
                        </div>
                    </AdminPanel>
                </aside>
            </section>
        </>
    );
}
