import Image from 'next/image';
import Link from 'next/link';

import { SectionIntro } from '@/components/shared/SectionIntro';
import type { HomeCategorySectionContent } from '@/domain/home/types';
import { artworkCategories } from '@/domain/artworks/categories';
import { cn } from '@/lib/utils/cn';
import { SnakeBorder } from '@/components/shared/SnakeBorder';
import { Container } from '@/ui/Container';

interface HomeCategoriesSectionProps {
    content: HomeCategorySectionContent;
    className?: string;
}

function getCategorySlug(category: string) {
    return category.toLocaleLowerCase('fr-FR').replace(/\s+/g, '-');
}

export function HomeCategoriesSection({ content, className }: HomeCategoriesSectionProps) {
    return (
        <section aria-label="Explorer par catégories" className={cn('relative bg-(--bg-primary) py-16 sm:py-20 lg:py-24', className)}>
            <Container>
                <SectionIntro className="mb-12" eyebrow={content.eyebrow} title={content.title} description={content.description} />

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                    {artworkCategories.map((category) => (
                        <Link key={category} href={{ pathname: '/oeuvres', query: { category } }} className="group relative overflow-hidden rounded-3xl">
                            <SnakeBorder />
                            <div className="relative aspect-4/5 overflow-hidden">
                                <Image
                                    src={`/images/categories/${getCategorySlug(category)}.jpg`}
                                    alt={category}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 20vw"
                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                                />

                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.02)_0%,rgba(4,10,18,0.75)_100%)]" />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <h3 className="text-xl text-white">{category}</h3>

                                <span className="mt-2 block text-xs text-white/60">{content.cardCtaLabel}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
