import { cn } from '@/lib/utils/cn';

interface HeaderMobileToggleProps {
    isOpen: boolean;
    onClick: () => void;
}

export function HeaderMobileToggle({ isOpen, onClick }: HeaderMobileToggleProps) {
    return (
        <button
            type="button"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            onClick={onClick}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/3 text-white transition duration-300 hover:bg-white/8 lg:hidden"
        >
            <span className="relative block h-4 w-5">
                <span className={cn('absolute left-0 top-0 block h-px w-5 bg-current transition-all duration-300', isOpen && 'top-1.75 rotate-45')} />
                <span className={cn('absolute left-0 top-1.75 block h-px w-5 bg-current transition-all duration-300', isOpen && 'opacity-0')} />
                <span className={cn('absolute left-0 top-3.5 block h-px w-5 bg-current transition-all duration-300', isOpen && 'top-1.75 -rotate-45')} />
            </span>
        </button>
    );
}
