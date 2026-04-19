import { forwardRef, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

import { formControlClassName } from './form-styles';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ className, ...props }, ref) {
    return <textarea ref={ref} className={cn(formControlClassName, 'min-h-40 rounded-2xl py-3', className)} {...props} />;
});
