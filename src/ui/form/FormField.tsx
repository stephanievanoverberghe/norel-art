import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

interface FormFieldProps {
    label: string;
    htmlFor?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    className?: string;
    children: ReactNode;
}

export function FormField({ label, htmlFor, hint, error, required = false, className, children }: FormFieldProps) {
    return (
        <div className={cn('grid gap-2.5', className)}>
            <label htmlFor={htmlFor} className="text-sm font-medium text-white/74">
                {label}
                {required ? <span className="ml-1 text-white/42">*</span> : null}
            </label>

            {children}

            {error ? <p className="text-sm text-red-300/90">{error}</p> : hint ? <p className="text-sm leading-6 text-white/46">{hint}</p> : null}
        </div>
    );
}
