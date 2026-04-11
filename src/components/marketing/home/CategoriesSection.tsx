import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface Category {
    name: string;
    slug: string;
    image: string;
}

const categories: Category[] = [
    {
        name: 'Portrait',
        slug: 'portrait',
        image: '/images/categories/portrait.jpg',
    },
    {
        name: 'Pop Art',
        slug: 'pop-art',
        image: '/images/categories/pop-art.jpg',
    },
    {
        name: 'Manga',
        slug: 'manga',
        image: '/images/categories/manga.jpg',
    },
    {
        name: 'Graphisme',
        slug: 'graphisme',
        image: '/images/categories/graphisme.jpg',
    },
    {
        name: 'Street Art',
        slug: 'street-art',
        image: '/images/categories/street-art.jpg',
    },
];

function SnakeBorder() {
    return (
        <span className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="absolute left-0 top-0 h-px w-0 bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.45)] transition-all duration-500 group-hover:w-full" />
            <span className="absolute right-0 top-0 h-0 w-px bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.45)] transition-all delay-100 duration-500 group-hover:h-full" />
            <span className="absolute bottom-0 right-0 h-px w-0 bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.45)] transition-all delay-200 duration-500 group-hover:w-full" />
            <span className="absolute bottom-0 left-0 h-0 w-px bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.45)] transition-all delay-300 duration-500 group-hover:h-full" />
        </span>
    );
}

export function CategoriesSection({ className }: { className?: string }) {
    return (
        <section aria-label="Explorer par catégories" className={cn('relative bg-(--bg-primary) py-16 sm:py-20 lg:py-24', className)}>
            <Container>
                <div className="mb-12 max-w-2xl">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">Explorer autrement</p>

                    <Heading level={2} className="mt-4 text-white">
                        Chaque regard ouvre un passage différent.
                    </Heading>

                    <Text variant="muted" className="mt-5 text-white/70">
                        Approcher les œuvres par leur nature, leur tension, ou leur matière.
                    </Text>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/oeuvres?categorie=${category.slug}`} className="group relative overflow-hidden rounded-3xl">
                            <SnakeBorder />
                            <div className="relative aspect-4/5 overflow-hidden">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 20vw"
                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                                />

                                {/* overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.02)_0%,rgba(4,10,18,0.75)_100%)]" />
                            </div>

                            {/* texte */}
                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <h3 className="text-xl text-white">{category.name}</h3>

                                <span className="mt-2 block text-xs text-white/60">Explorer</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
