import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, type = 'text', ...props }, ref) {
    return (
        <input
            ref={ref}
            type={type}
            className={cn(
                'min-h-12 w-full rounded-2xl border border-white/10 bg-white/4 px-4 text-white outline-none transition-all duration-300 placeholder:text-white/28 focus:border-white/22 focus:bg-white/5.5 focus:ring-2 focus:ring-white/8 disabled:cursor-not-allowed disabled:opacity-50',
                className,
            )}
            {...props}
        />
    );
});
