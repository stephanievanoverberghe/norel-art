import type { CustomRequestStatus, CustomRequestType } from '@prisma/client';
import { CalendarDays, CheckCircle2, Mail, MapPin, Phone, UserRound } from 'lucide-react';

import type { AdminCustomRequest } from '@/server/requests/custom-requests';

import { AdminBadge, AdminPanel, adminInputClass, adminSecondaryButtonClass } from './AdminPrimitives';

interface RequestListProps {
    requests: AdminCustomRequest[];
    updateStatusAction: (requestId: string, formData: FormData) => Promise<void>;
}

const requestToneByStatus: Record<CustomRequestStatus, 'accent' | 'muted' | 'success' | 'warning'> = {
    ACCEPTED: 'success',
    CLOSED: 'muted',
    IN_REVIEW: 'warning',
    NEW: 'accent',
    QUOTE_SENT: 'success',
};

const requestLabelByStatus: Record<CustomRequestStatus, string> = {
    ACCEPTED: 'Acceptee',
    CLOSED: 'Fermee',
    IN_REVIEW: 'En qualification',
    NEW: 'Nouvelle',
    QUOTE_SENT: 'Devis envoye',
};

const requestLabelByType: Record<CustomRequestType, string> = {
    CONTACT: 'Contact',
    CUSTOM_ARTWORK: 'Commande',
    MURAL: 'Fresque',
};

const statusOptions: CustomRequestStatus[] = ['NEW', 'IN_REVIEW', 'QUOTE_SENT', 'ACCEPTED', 'CLOSED'];

function formatRequestDate(date: Date) {
    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(date);
}

function getMetadataEntries(metadata: unknown) {
    if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
        return [];
    }

    return Object.entries(metadata)
        .filter(([, value]) => ['boolean', 'number', 'string'].includes(typeof value) && String(value).trim().length > 0)
        .map(([key, value]) => [key, String(value)] as const);
}

export function RequestList({ requests, updateStatusAction }: RequestListProps) {
    if (requests.length === 0) {
        return (
            <AdminPanel className="p-8 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/44">
                    <Mail size={20} />
                </span>
                <h2 className="mt-5 text-xl font-semibold text-white">Aucune demande pour le moment</h2>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/48">Les messages du contact, des commandes personnalisees et des fresques arriveront ici des qu&apos;un visiteur enverra un formulaire.</p>
            </AdminPanel>
        );
    }

    return (
        <div className="grid gap-4">
            {requests.map((request) => {
                const statusAction = updateStatusAction.bind(null, request.id);
                const metadataEntries = getMetadataEntries(request.metadata);

                return (
                    <AdminPanel key={request.id} as="article" className="p-5 transition hover:border-white/18 hover:bg-[#0a1725]/86">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <AdminBadge tone={requestToneByStatus[request.status]}>{requestLabelByStatus[request.status]}</AdminBadge>
                                    {request.user ? <AdminBadge tone="neutral">Compte client</AdminBadge> : null}
                                </div>
                                <h2 className="mt-4 text-xl font-semibold text-white">{request.name}</h2>
                                <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/48">
                                    <span className="inline-flex items-center gap-2">
                                        <Mail size={14} />
                                        {request.email}
                                    </span>
                                    <span className="inline-flex items-center gap-2">
                                        <MapPin size={14} />
                                        {request.location ?? 'Lieu non precise'}
                                    </span>
                                    {request.phone ? (
                                        <span className="inline-flex items-center gap-2">
                                            <Phone size={14} />
                                            {request.phone}
                                        </span>
                                    ) : null}
                                    {request.user ? (
                                        <span className="inline-flex items-center gap-2">
                                            <UserRound size={14} />
                                            {request.user.name ?? request.user.email}
                                        </span>
                                    ) : null}
                                    <span className="inline-flex items-center gap-2">
                                        <CalendarDays size={14} />
                                        {formatRequestDate(request.createdAt)}
                                    </span>
                                </div>
                            </div>
                            <div className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-right">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/34">{requestLabelByType[request.type]}</p>
                                <p className="mt-1 text-sm font-semibold text-white">{request.budget ?? 'Budget a definir'}</p>
                            </div>
                        </div>
                        <p className="mt-5 max-w-3xl text-sm leading-6 text-white/64">{request.message}</p>
                        {metadataEntries.length > 0 ? (
                            <div className="mt-5 flex flex-wrap gap-2">
                                {metadataEntries.map(([key, value]) => (
                                    <span key={key} className="rounded-md border border-white/8 bg-white/4 px-3 py-2 text-xs text-white/52">
                                        <span className="font-semibold text-white/72">{key}</span> : {value}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                        <form action={statusAction} className="mt-5 grid gap-3 border-t border-white/8 pt-5 sm:grid-cols-[minmax(0,16rem)_auto] sm:items-center">
                            <label className="sr-only" htmlFor={`status-${request.id}`}>
                                Statut de la demande
                            </label>
                            <select id={`status-${request.id}`} name="status" defaultValue={request.status} className={adminInputClass}>
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {requestLabelByStatus[status]}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" className={adminSecondaryButtonClass}>
                                <CheckCircle2 size={16} />
                                Mettre a jour
                            </button>
                        </form>
                    </AdminPanel>
                );
            })}
        </div>
    );
}
