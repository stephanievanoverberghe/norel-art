import { CalendarDays, MapPin, Mail } from 'lucide-react';

import { clientRequests } from '@/content/admin/requests';

import { AdminBadge, AdminPanel } from './AdminPrimitives';

const requestToneByStatus: Record<string, 'accent' | 'neutral' | 'success' | 'warning'> = {
    new: 'accent',
    in_review: 'warning',
    quoted: 'success',
};

export function RequestList() {
    return (
        <div className="grid gap-4">
            {clientRequests.map((request) => (
                <AdminPanel key={request.id} as="article" className="p-5 transition hover:border-white/18 hover:bg-[#0a1725]/86">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <AdminBadge tone={requestToneByStatus[request.status] ?? 'neutral'}>{request.status}</AdminBadge>
                            <h2 className="mt-4 text-xl font-semibold text-white">{request.fullName}</h2>
                            <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/48">
                                <span className="inline-flex items-center gap-2">
                                    <Mail size={14} />
                                    {request.email}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <MapPin size={14} />
                                    {request.location}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <CalendarDays size={14} />
                                    {request.createdAt}
                                </span>
                            </div>
                        </div>
                        <div className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-right">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/34">{request.type}</p>
                            <p className="mt-1 text-sm font-semibold text-white">{request.budget}</p>
                        </div>
                    </div>
                    <p className="mt-5 max-w-3xl text-sm leading-6 text-white/64">{request.message}</p>
                </AdminPanel>
            ))}
        </div>
    );
}
