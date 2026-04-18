import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type TextVariant = 'body' | 'muted' | 'small';

interface TextProps {
    children: ReactNode;
    className?: string;
    variant?: TextVariant;
    as?: 'p' | 'span' | 'div';
}

const textStyles: Record<TextVariant, string> = {
    body: 'font-[var(--font-body)] text-base leading-7 text-(--text-primary) sm:text-lg',
    muted: 'font-[var(--font-body)] text-base leading-7 text-(--text-muted) sm:text-lg',
    small: 'font-[var(--font-body)] text-sm leading-6 text-(--text-muted)'
};

export function Text({ children, className, variant = 'body', as: Tag = 'p' }: TextProps) {
    return <Tag className={cn(textStyles[variant], className)}>{children}</Tag>;
}
