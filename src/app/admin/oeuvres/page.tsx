import Link from 'next/link';
import { artworks } from '@/content/artworks/artworks';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminTable } from '@/components/admin/AdminTable';

export default function AdminOeuvresPage() {
    const rows = artworks.map((artwork) => ({
        title: artwork.title,
        type: artwork.type,
        price: `${artwork.priceEur.toLocaleString('fr-FR')} €`,
        status: artwork.availability,
    }));

    return (
        <>
            <AdminPageHeader
                title="Gestion des œuvres"
                description="Rechercher, filtrer et gérer le catalogue visuel."
                action={
                    <Link href="/admin/oeuvres/nouvelle" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                        Nouvelle œuvre
                    </Link>
                }
            />
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
                <input placeholder="Rechercher une œuvre" className="rounded-xl border border-slate-300 px-3 py-2" />
                <select className="rounded-xl border border-slate-300 px-3 py-2">
                    <option>Tous les statuts</option>
                    <option>available</option>
                    <option>reserved</option>
                    <option>sold</option>
                </select>
            </div>
            <AdminTable
                columns={[
                    { key: 'title', label: 'Titre' },
                    { key: 'type', label: 'Type' },
                    { key: 'price', label: 'Prix' },
                    { key: 'status', label: 'Statut' },
                ]}
                rows={rows}
            />
        </>
    );
}
