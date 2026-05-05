import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminBadge, AdminPanel } from '@/components/admin/AdminPrimitives';
import { CollectionForm } from '@/components/admin/CollectionForm';
import { getAdminCollectionById } from '@/server/collections/admin-collections';

import { updateCollectionAction } from '../actions';

interface AdminEditCollectionPageProps {
    params: Promise<{
        id: string;
    }>;
}

const statusLabel = {
    ARCHIVED: 'Archivee',
    DRAFT: 'Brouillon',
    PUBLISHED: 'Publiee',
} as const;

export default async function AdminEditCollectionPage({ params }: AdminEditCollectionPageProps) {
    const { id } = await params;
    const collection = await getAdminCollectionById(id);

    if (!collection) {
        notFound();
    }

    const updateAction = updateCollectionAction.bind(null, collection.id, collection.slug);

    return (
        <>
            <AdminPageHeader
                title="Edition collection"
                description={`Ajuster "${collection.name}" : statut, visuel, SEO, ordre et mise en avant.`}
                action={
                    collection.status === 'PUBLISHED' ? (
                        <Link href={`/oeuvres?collection=${encodeURIComponent(collection.name)}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/12 bg-white/5 px-4 text-sm font-medium text-white/78 transition hover:border-white/22 hover:bg-white/9 hover:text-white">
                            Voir cote public
                            <ArrowUpRight size={16} />
                        </Link>
                    ) : null
                }
            />

            <section className="mb-5 grid gap-4 md:grid-cols-3">
                <AdminPanel className="p-5">
                    <p className="text-sm text-white/46">Statut</p>
                    <div className="mt-3">
                        <AdminBadge tone={collection.status === 'PUBLISHED' ? 'accent' : collection.status === 'DRAFT' ? 'warning' : 'muted'}>{statusLabel[collection.status]}</AdminBadge>
                    </div>
                </AdminPanel>
                <AdminPanel className="p-5">
                    <p className="text-sm text-white/46">Oeuvres liees</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{collection._count.artworks}</p>
                </AdminPanel>
                <AdminPanel className="p-5">
                    <p className="text-sm text-white/46">Mise en avant</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{collection.isFeatured ? 'Oui' : 'Non'}</p>
                </AdminPanel>
            </section>

            <CollectionForm mode="edit" collection={collection} action={updateAction} />
        </>
    );
}
