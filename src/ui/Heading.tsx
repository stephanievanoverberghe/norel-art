import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type HeadingLevel = 1 | 2 | 3;

interface HeadingProps {
    children: ReactNode;
    className?: string;
    level?: HeadingLevel;
}

const headingStyles: Record<HeadingLevel, string> = {
    1: '[font-family:var(--font-heading)] text-5xl leading-none sm:text-6xl lg:text-7xl',
    2: '[font-family:var(--font-heading)] text-3xl leading-tight sm:text-4xl lg:text-5xl',
    3: 'font-[var(--font-body)] text-2xl font-medium leading-tight sm:text-3xl',
};

export function Heading({ children, className, level = 2 }: HeadingProps) {
    const Tag = `h${level}` as const;

    return <Tag className={cn(headingStyles[level], className)}>{children}</Tag>;
}
