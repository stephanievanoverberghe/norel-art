import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';
import type { ArtworkCategory } from '@/domain/artworks/categories';
import type { OeuvresCategoryFilter, OeuvresCollectionFilter, OeuvresFiltersContent, OeuvresTypeFilter } from '@/domain/oeuvres/types';
import { cn } from '@/lib/utils/cn';

interface OeuvresFiltersPanelProps {
    categories: readonly ArtworkCategory[];
    collections: readonly string[];
    content: OeuvresFiltersContent;
    selectedCategory: OeuvresCategoryFilter;
    selectedCollection: OeuvresCollectionFilter;
    selectedType: OeuvresTypeFilter;
    onCategoryChange: (category: OeuvresCategoryFilter) => void;
    onCollectionChange: (collection: OeuvresCollectionFilter) => void;
    onTypeChange: (type: OeuvresTypeFilter) => void;
    onReset: () => void;
}

interface OeuvresFilterPillProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

function OeuvresFilterPill({ label, isActive, onClick }: OeuvresFilterPillProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={isActive}
            className={cn(
                'inline-flex items-center rounded-full border px-4 py-2 text-sm transition-colors duration-300',
                isActive ? 'border-white/45 bg-white/18 text-white' : 'border-white/10 bg-white/3 text-white/76 hover:border-white/20 hover:bg-white/[0.07] hover:text-white',
            )}
        >
            {label}
        </button>
    );
}

export function OeuvresFiltersPanel({
    categories,
    collections,
    content,
    selectedCategory,
    selectedCollection,
    selectedType,
    onCategoryChange,
    onCollectionChange,
    onTypeChange,
    onReset,
}: OeuvresFiltersPanelProps) {
    const categoryFilters: ReadonlyArray<OeuvresCategoryFilter> = ['all', ...categories];
    const collectionFilters: ReadonlyArray<OeuvresCollectionFilter> = ['all', ...collections];

    return (
        <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/3">
                <div className="border-b border-white/10 px-5 py-5 sm:px-6">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/38">{content.eyebrow}</p>

                    <Heading level={3} className="mt-3 text-white">
                        {content.title}
                    </Heading>

                    <Text variant="muted" className="mt-3 text-sm text-white/66">
                        {content.description}
                    </Text>
                </div>

                <div className="space-y-6 px-5 py-5 sm:px-6">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">{content.categoriesLabel}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {categoryFilters.map((category) => (
                                <OeuvresFilterPill
                                    key={category}
                                    label={category === 'all' ? content.allLabel : category}
                                    isActive={selectedCategory === category}
                                    onClick={() => onCategoryChange(category)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">{content.collectionsLabel}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {collectionFilters.map((collection) => (
                                <OeuvresFilterPill
                                    key={collection}
                                    label={collection === 'all' ? content.allLabel : collection}
                                    isActive={selectedCollection === collection}
                                    onClick={() => onCollectionChange(collection)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">{content.typesLabel}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {content.typeOptions.map((typeOption) => (
                                <OeuvresFilterPill
                                    key={typeOption.value}
                                    label={typeOption.label}
                                    isActive={selectedType === typeOption.value}
                                    onClick={() => onTypeChange(typeOption.value)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                        <button type="button" onClick={onReset} className="text-sm text-white/62 transition-colors duration-300 hover:text-white">
                            {content.resetLabel}
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
