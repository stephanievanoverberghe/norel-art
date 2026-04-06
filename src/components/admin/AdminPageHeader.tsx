import type { ReactNode } from 'react';

interface AdminPageHeaderProps {
    title: string;
    description: string;
    action?: ReactNode;
}

export function AdminPageHeader({ title, description, action }: AdminPageHeaderProps) {
    return (
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
                <p className="mt-1 text-sm text-slate-600">{description}</p>
            </div>
            {action}
        </div>
    );
}
