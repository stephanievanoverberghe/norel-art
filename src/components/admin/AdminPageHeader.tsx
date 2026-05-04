import type { ReactNode } from 'react';

interface AdminPageHeaderProps {
    title: string;
    description: string;
    action?: ReactNode;
    eyebrow?: string;
}

export function AdminPageHeader({ title, description, action, eyebrow = 'Norel Art Studio' }: AdminPageHeaderProps) {
    return (
        <div className="mb-6 border-b border-white/10 pb-6">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/38">{eyebrow}</p>
                    <h1 className="mt-3 font-(family-name:--font-heading) text-4xl leading-none text-white sm:text-5xl">{title}</h1>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-white/58 sm:text-base">{description}</p>
                </div>
                {action ? <div className="flex shrink-0 flex-wrap items-center gap-2">{action}</div> : null}
            </div>
        </div>
    );
}
