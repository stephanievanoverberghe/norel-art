import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminBadge, AdminPanel, adminSecondaryButtonClass } from '@/components/admin/AdminPrimitives';
import { DropForm } from '@/components/admin/DropForm';
import { getAdminDropArtworkOptions, getAdminDropById } from '@/server/drops/admin-drops';

import { updateDropAction } from '../actions';

interface AdminEditDropPageProps {
    params: Promise<{
        id: string;
    }>;
}

const statusLabel = {
    DRAFT: 'Brouillon',
    ENDED: 'Termine',
    LIVE: 'Live',
    SCHEDULED: 'Programme',
} as const;

const statusTone = {
    DRAFT: 'warning',
    ENDED: 'muted',
    LIVE: 'success',
    SCHEDULED: 'accent',
} as const;

export default async function AdminEditDropPage({ params }: AdminEditDropPageProps) {
    const { id } = await params;
    const [drop, artworks] = await Promise.all([getAdminDropById(id), getAdminDropArtworkOptions()]);

    if (!drop) {
        notFound();
    }

    const updateAction = updateDropAction.bind(null, drop.id, drop.slug);

    return (
        <>
            <AdminPageHeader
                title="Edition drop"
                description={`Ajuster "${drop.title}" : calendrier, statut, waitlist, visuel et selection d'oeuvres.`}
                action={
                    <Link href="/admin/drops" className={adminSecondaryButtonClass}>
                        Tous les drops
                        <ArrowUpRight size={16} />
                    </Link>
                }
            />

            <section className="mb-5 grid gap-4 md:grid-cols-4">
                <AdminPanel className="p-5">
                    <p className="text-sm text-white/46">Statut</p>
                    <div className="mt-3">
                        <AdminBadge tone={statusTone[drop.status]}>{statusLabel[drop.status]}</AdminBadge>
                    </div>
                </AdminPanel>
                <AdminPanel className="p-5">
                    <p className="text-sm text-white/46">Oeuvres</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{drop._count.artworks}</p>
                </AdminPanel>
                <AdminPanel className="p-5">
                    <p className="text-sm text-white/46">Waitlist</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{drop._count.waitlistEntries}</p>
                </AdminPanel>
                <AdminPanel className="p-5">
                    <p className="text-sm text-white/46">Mise en avant</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{drop.isFeatured ? 'Oui' : 'Non'}</p>
                </AdminPanel>
            </section>

            <DropForm mode="edit" drop={drop} artworks={artworks} action={updateAction} />
        </>
    );
}
