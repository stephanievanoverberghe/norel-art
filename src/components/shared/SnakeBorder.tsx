import { cn } from '@/lib/utils/cn';

interface SnakeBorderProps {
    className?: string;
}

export function SnakeBorder({ className }: SnakeBorderProps) {
    return (
        <span className={cn('pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100', className)}>
            <span className="absolute left-0 top-0 h-px w-0 bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.45)] transition-all duration-500 group-hover:w-full" />
            <span className="absolute right-0 top-0 h-0 w-px bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.45)] transition-all delay-100 duration-500 group-hover:h-full" />
            <span className="absolute bottom-0 right-0 h-px w-0 bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.45)] transition-all delay-200 duration-500 group-hover:w-full" />
            <span className="absolute bottom-0 left-0 h-0 w-px bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.45)] transition-all delay-300 duration-500 group-hover:h-full" />
        </span>
    );
}
