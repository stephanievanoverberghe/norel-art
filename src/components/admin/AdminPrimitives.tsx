import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type AdminPanelElement = 'article' | 'aside' | 'div' | 'section';
type AdminBadgeTone = 'accent' | 'danger' | 'muted' | 'neutral' | 'success' | 'warning';

interface AdminPanelProps {
    as?: AdminPanelElement;
    children: ReactNode;
    className?: string;
}

interface AdminBadgeProps {
    children: ReactNode;
    className?: string;
    tone?: AdminBadgeTone;
}

const badgeTones: Record<AdminBadgeTone, string> = {
    accent: 'border-(--accent)/35 bg-(--accent)/18 text-white',
    danger: 'border-rose-300/25 bg-rose-400/10 text-rose-50',
    muted: 'border-white/8 bg-white/4 text-white/44',
    neutral: 'border-white/10 bg-white/7 text-white/66',
    success: 'border-emerald-300/25 bg-emerald-400/10 text-emerald-50',
    warning: 'border-amber-300/25 bg-amber-300/10 text-amber-50',
};

export const adminInputClass =
    'min-h-11 w-full rounded-md border border-white/10 bg-[#060c15]/70 px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-(--accent)/55 focus:bg-[#060c15] focus:ring-2 focus:ring-(--accent)/18';

export const adminLabelClass = 'grid gap-2 text-sm font-medium text-white/72';

export const adminPrimaryButtonClass =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-(--accent) px-4 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(158,0,49,0.25)] transition hover:opacity-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)/45';

export const adminSecondaryButtonClass =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/12 bg-white/5 px-4 text-sm font-medium text-white/78 transition hover:border-white/22 hover:bg-white/9 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20';

export function AdminPanel({ as: Component = 'section', children, className }: AdminPanelProps) {
    return <Component className={cn('rounded-md border border-white/10 bg-[#08131f]/78 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-xl', className)}>{children}</Component>;
}

export function AdminBadge({ children, className, tone = 'neutral' }: AdminBadgeProps) {
    return <span className={cn('inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]', badgeTones[tone], className)}>{children}</span>;
}
