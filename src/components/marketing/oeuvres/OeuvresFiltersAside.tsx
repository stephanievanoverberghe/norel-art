import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface OeuvresFiltersAsideProps {
    categories: readonly string[];
    collections: readonly string[];
}

function FilterPill({ label }: { label: string }) {
    return (
        <button
            type="button"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/76 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
        >
            {label}
        </button>
    );
}

export function OeuvresFiltersAside({ categories, collections }: OeuvresFiltersAsideProps) {
    return (
        <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03]">
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
                            <FilterPill label="Toutes" />
                            {categories.map((category) => (
                                <FilterPill key={category} label={category} />
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">Collections</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <FilterPill label="Toutes" />
                            {collections.map((collection) => (
                                <FilterPill key={collection} label={collection} />
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/42">Type</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <FilterPill label="Originaux" />
                            <FilterPill label="Impressions" />
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
