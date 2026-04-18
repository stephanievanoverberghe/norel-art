import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

interface MarketingSecondaryLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
}

export function MarketingSecondaryLink({ href, children, className }: MarketingSecondaryLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                'inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/3 px-6 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/10',
                className,
            )}
        >
            {children}
        </Link>
    );
}
