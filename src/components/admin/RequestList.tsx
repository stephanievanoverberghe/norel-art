import { clientRequests } from '@/content/admin/requests';

export function RequestList() {
    return (
        <div className="space-y-4">
            {clientRequests.map((request) => (
                <article key={request.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-lg font-semibold text-slate-900">{request.fullName}</h2>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{request.status}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                        {request.type} · {request.budget} · {request.location}
                    </p>
                    <p className="mt-3 text-sm text-slate-700">{request.message}</p>
                </article>
            ))}
        </div>
    );
}
