import Image from 'next/image';
import Link from 'next/link';

import { artworkCategories } from '@/domain/artworks/categories';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { SectionIntro } from '@/components/shared/SectionIntro';
import { SnakeBorder } from '@/components/shared/SnakeBorder';

function getCategorySlug(category: string) {
    return category.toLocaleLowerCase('fr-FR').replace(/\s+/g, '-');
}

export function CategoriesSection({ className }: { className?: string }) {
    return (
        <section aria-label="Explorer par catégories" className={cn('relative bg-(--bg-primary) py-16 sm:py-20 lg:py-24', className)}>
            <Container>
                <SectionIntro
                    className="mb-12"
                    eyebrow="Explorer autrement"
                    title="Chaque regard ouvre un passage différent."
                    description="Approcher les œuvres par leur nature, leur tension, ou leur matière."
                />

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                    {artworkCategories.map((category) => (
                        <Link key={category} href={`/oeuvres?categorie=${getCategorySlug(category)}`} className="group relative overflow-hidden rounded-3xl">
                            <SnakeBorder />
                            <div className="relative aspect-4/5 overflow-hidden">
                                <Image
                                    src={`/images/categories/${getCategorySlug(category)}.jpg`}
                                    alt={category}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 20vw"
                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                                />

                                {/* overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.02)_0%,rgba(4,10,18,0.75)_100%)]" />
                            </div>

                            {/* texte */}
                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <h3 className="text-xl text-white">{category}</h3>

                                <span className="mt-2 block text-xs text-white/60">Explorer</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
