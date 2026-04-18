import { forwardRef, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ className, ...props }, ref) {
    return (
        <textarea
            ref={ref}
            className={cn(
                'min-h-40 w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-white outline-none transition-all duration-300 placeholder:text-white/28 focus:border-white/22 focus:bg-white/5.5 focus:ring-2 focus:ring-white/8 disabled:cursor-not-allowed disabled:opacity-50',
                className,
            )}
            {...props}
        />
    );
});
