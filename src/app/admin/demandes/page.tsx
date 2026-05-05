import { Inbox, MessageSquareText, Paintbrush, ScrollText } from 'lucide-react';

import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminPanel } from '@/components/admin/AdminPrimitives';
import { RequestList } from '@/components/admin/RequestList';
import { getAdminCustomRequests, getAdminCustomRequestStats } from '@/server/requests/custom-requests';

import { updateCustomRequestStatusAction } from './actions';

const statCards = [
    { key: 'total', label: 'Demandes', icon: Inbox },
    { key: 'open', label: 'Ouvertes', icon: MessageSquareText },
    { key: 'customArtwork', label: 'Commandes', icon: ScrollText },
    { key: 'mural', label: 'Fresques', icon: Paintbrush },
] as const;

export default async function AdminDemandesPage() {
    const [requests, stats] = await Promise.all([getAdminCustomRequests(), getAdminCustomRequestStats()]);

    return (
        <>
            <AdminPageHeader title="Demandes" description="Qualifier les contacts entrants, commandes personnalisees et projets fresques avec une lecture claire des priorites." />

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

            <div className="mt-6">
                <RequestList requests={requests} updateStatusAction={updateCustomRequestStatusAction} />
            </div>
        </>
    );
}
