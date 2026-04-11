import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';
import type { ArtworkCategory } from '@/domain/artworks/categories';
import type { ArtworkType } from '@/domain/artworks/types';
import { cn } from '@/lib/utils/cn';

interface OeuvresFiltersAsideProps {
    categories: readonly ArtworkCategory[];
    collections: readonly string[];
    selectedCategory: ArtworkCategory | 'all';
    selectedCollection: string | 'all';
    selectedType: ArtworkType | 'all';
    onCategoryChange: (category: ArtworkCategory | 'all') => void;
    onCollectionChange: (collection: string | 'all') => void;
    onTypeChange: (type: ArtworkType | 'all') => void;
    onReset: () => void;
}

interface FilterPillProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

function FilterPill({ label, isActive, onClick }: FilterPillProps) {
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

const TYPE_FILTERS: ReadonlyArray<{ label: string; value: ArtworkType | 'all' }> = [
    { label: 'Toutes', value: 'all' },
    { label: 'Originaux', value: 'original' },
    { label: 'Impressions', value: 'print' },
];

export function OeuvresFiltersAside({
    categories,
    collections,
    selectedCategory,
    selectedCollection,
    selectedType,
    onCategoryChange,
    onCollectionChange,
    onTypeChange,
    onReset,
}: OeuvresFiltersAsideProps) {
    const categoryFilters: ReadonlyArray<ArtworkCategory | 'all'> = ['all', ...categories];
    const collectionFilters: ReadonlyArray<string | 'all'> = ['all', ...collections];

    return (
        <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/3">
                <div className="border-b border-white/10 px-5 py-5 sm:px-6">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/38">Explorer</p>

                    <Heading level={3} className="mt-3 text-white">
                        La galerie
                    </Heading>

                    <Text variant="muted" className="mt-3 text-sm text-white/66">
                        Approcher les œuvres par leur nature, leur série ou leur présence.
                    </Text>
                </div>

                <div className="space-y-6 px-5 py-5 sm:px-6">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">Catégories</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {categoryFilters.map((category) => (
                                <FilterPill
                                    key={category}
                                    label={category === 'all' ? 'Toutes' : category}
                                    isActive={selectedCategory === category}
                                    onClick={() => onCategoryChange(category)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">Collections</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {collectionFilters.map((collection) => (
                                <FilterPill
                                    key={collection}
                                    label={collection === 'all' ? 'Toutes' : collection}
                                    isActive={selectedCollection === collection}
                                    onClick={() => onCollectionChange(collection)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">Type</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {TYPE_FILTERS.map((typeFilter) => (
                                <FilterPill
                                    key={typeFilter.value}
                                    label={typeFilter.label}
                                    isActive={selectedType === typeFilter.value}
                                    onClick={() => onTypeChange(typeFilter.value)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                        <button type="button" onClick={onReset} className="text-sm text-white/62 transition-colors duration-300 hover:text-white">
                            Réinitialiser les filtres
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
