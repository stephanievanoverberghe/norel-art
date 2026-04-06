import { artworkCategories } from '@/content/artworks/artworks';
import { Container } from '@/ui/Container';

interface ArtworkFiltersProps {
    selectedCategory?: string;
    selectedType?: string;
}

const types = [
    { label: 'Toutes', value: '' },
    { label: 'Originaux', value: 'original' },
    { label: 'Impressions', value: 'print' },
] as const;

export function ArtworkFilters({ selectedCategory = '', selectedType = '' }: ArtworkFiltersProps) {
    return (
        <Container>
            <form className="grid gap-4 rounded-2xl border border-white/10 bg-white/3 p-4 sm:grid-cols-2" aria-label="Filtres des œuvres">
                <label className="flex flex-col gap-2 text-sm text-white/75">
                    Type
                    <select name="type" defaultValue={selectedType} className="rounded-xl border border-white/20 bg-transparent px-3 py-2 text-white">
                        {types.map((type) => (
                            <option key={type.value} value={type.value} className="bg-[var(--bg-primary)]">
                                {type.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-col gap-2 text-sm text-white/75">
                    Catégorie
                    <select name="category" defaultValue={selectedCategory} className="rounded-xl border border-white/20 bg-transparent px-3 py-2 text-white">
                        <option value="" className="bg-[var(--bg-primary)]">
                            Toutes
                        </option>
                        {artworkCategories.map((category) => (
                            <option key={category} value={category} className="bg-[var(--bg-primary)]">
                                {category}
                            </option>
                        ))}
                    </select>
                </label>
            </form>
        </Container>
    );
}
