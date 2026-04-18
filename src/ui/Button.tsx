import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
    primary: 'bg-(--accent) text-white hover:opacity-95 shadow-[0_8px_30px_rgba(0,0,0,0.25)]',
    secondary: 'border border-white/20 text-white hover:bg-white/10 backdrop-blur-md',
    ghost: 'text-white/70 hover:text-white',
};

export function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center cursor-pointer rounded-md px-6 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) hover:scale-[0.98]',
                variants[variant],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}
