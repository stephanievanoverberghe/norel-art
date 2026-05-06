import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';

import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';
import type { ArtworkCategory } from '@/domain/artworks/categories';
import type { OeuvresAvailabilityFilter, OeuvresCategoryFilter, OeuvresCollectionFilter, OeuvresFiltersContent, OeuvresSortOption, OeuvresTypeFilter } from '@/domain/oeuvres/types';
import { cn } from '@/lib/utils/cn';

interface GalleryStats {
    available: number;
    originals: number;
    prints: number;
    total: number;
}

interface OeuvresFiltersPanelProps {
    categories: readonly ArtworkCategory[];
    collections: readonly string[];
    content: OeuvresFiltersContent;
    selectedCategory: OeuvresCategoryFilter;
    selectedCollection: OeuvresCollectionFilter;
    selectedType: OeuvresTypeFilter;
    selectedAvailability: OeuvresAvailabilityFilter;
    selectedSort: OeuvresSortOption;
    query: string;
    stats: GalleryStats;
    activeFiltersCount: number;
    onCategoryChange: (category: OeuvresCategoryFilter) => void;
    onCollectionChange: (collection: OeuvresCollectionFilter) => void;
    onTypeChange: (type: OeuvresTypeFilter) => void;
    onAvailabilityChange: (availability: OeuvresAvailabilityFilter) => void;
    onSortChange: (sort: OeuvresSortOption) => void;
    onQueryChange: (query: string) => void;
    onReset: () => void;
}

interface OeuvresFilterPillProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const statItems = [
    { key: 'available', label: 'Disponibles' },
    { key: 'originals', label: 'Peintures' },
    { key: 'prints', label: 'Affiches' },
] as const;

function OeuvresFilterPill({ label, isActive, onClick }: OeuvresFilterPillProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={isActive}
            className={cn(
                'inline-flex min-h-9 items-center rounded-full border px-3 text-xs font-medium transition-colors duration-200 sm:px-4 sm:text-sm',
                isActive ? 'border-(--accent)/70 bg-(--accent)/16 text-white' : 'border-white/10 bg-white/[0.035] text-white/68 hover:border-white/20 hover:bg-white/[0.07] hover:text-white',
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
    selectedAvailability,
    selectedSort,
    query,
    stats,
    activeFiltersCount,
    onCategoryChange,
    onCollectionChange,
    onTypeChange,
    onAvailabilityChange,
    onSortChange,
    onQueryChange,
    onReset,
}: OeuvresFiltersPanelProps) {
    const categoryFilters: ReadonlyArray<OeuvresCategoryFilter> = ['all', ...categories];
    const collectionFilters: ReadonlyArray<OeuvresCollectionFilter> = ['all', ...collections];
    const activeFiltersLabel = activeFiltersCount > 0 ? `${activeFiltersCount} actif${activeFiltersCount > 1 ? 's' : ''}` : 'Aucun filtre';

    return (
        <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-md border border-white/10 bg-[#07111d]/82 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                <div className="border-b border-white/10 px-5 py-5 sm:px-6">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/38">{content.eyebrow}</p>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/58">
                            <SlidersHorizontal size={13} className="text-(--accent)" />
                            {activeFiltersLabel}
                        </span>
                    </div>

                    <Heading level={3} className="mt-3 text-white">
                        {content.title}
                    </Heading>

                    <Text variant="muted" className="mt-3 text-sm text-white/66">
                        {content.description}
                    </Text>
                </div>

                <div className="grid grid-cols-3 border-b border-white/10">
                    {statItems.map((item) => (
                        <div key={item.key} className="border-r border-white/10 px-4 py-4 last:border-r-0">
                            <p className="text-lg font-semibold text-white">{stats[item.key]}</p>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/36">{item.label}</p>
                        </div>
                    ))}
                </div>

                <div className="space-y-6 px-5 py-5 sm:px-6">
                    <div>
                        <label htmlFor="artwork-search" className="text-[10px] uppercase tracking-[0.22em] text-white/42">
                            {content.searchLabel}
                        </label>
                        <div className="relative mt-3">
                            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/36" />
                            <input
                                id="artwork-search"
                                type="search"
                                value={query}
                                onChange={(event) => onQueryChange(event.target.value)}
                                placeholder={content.searchPlaceholder}
                                className="min-h-12 w-full rounded-md border border-white/10 bg-white/[0.045] pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-(--accent)/60 focus:bg-white/[0.065]"
                            />
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">{content.sortLabel}</p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            {content.sortOptions.map((sortOption) => (
                                <button
                                    key={sortOption.value}
                                    type="button"
                                    onClick={() => onSortChange(sortOption.value)}
                                    aria-pressed={selectedSort === sortOption.value}
                                    className={cn(
                                        'min-h-10 rounded-md border px-3 text-left text-xs font-medium transition-colors duration-200',
                                        selectedSort === sortOption.value
                                            ? 'border-(--accent)/70 bg-(--accent)/16 text-white'
                                            : 'border-white/10 bg-white/[0.035] text-white/62 hover:border-white/20 hover:text-white',
                                    )}
                                >
                                    {sortOption.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">{content.typesLabel}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {content.typeOptions.map((typeOption) => (
                                <OeuvresFilterPill key={typeOption.value} label={typeOption.label} isActive={selectedType === typeOption.value} onClick={() => onTypeChange(typeOption.value)} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">{content.availabilityLabel}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {content.availabilityOptions.map((availabilityOption) => (
                                <OeuvresFilterPill
                                    key={availabilityOption.value}
                                    label={availabilityOption.label}
                                    isActive={selectedAvailability === availabilityOption.value}
                                    onClick={() => onAvailabilityChange(availabilityOption.value)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">{content.categoriesLabel}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {categoryFilters.map((category) => (
                                <OeuvresFilterPill key={category} label={category === 'all' ? content.allLabel : category} isActive={selectedCategory === category} onClick={() => onCategoryChange(category)} />
                            ))}
                        </div>
                    </div>

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

                    <button type="button" onClick={onReset} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-medium text-white/62 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white">
                        <RotateCcw size={15} />
                        {content.resetLabel}
                    </button>
                </div>
            </div>
        </aside>
    );
}
