import type { OeuvresGridContent } from '@/domain/oeuvres/types';

interface OeuvresEmptyStateProps {
    content: OeuvresGridContent;
}

export function OeuvresEmptyState({ content }: OeuvresEmptyStateProps) {
    return (
        <div className="rounded-3xl border border-dashed border-white/20 bg-white/2 px-6 py-12 text-center text-white/75">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">{content.emptyEyebrow}</p>
            <p className="mt-3 text-sm sm:text-base">{content.emptyDescription}</p>
        </div>
    );
}
