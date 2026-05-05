import Image from 'next/image';
import Link from 'next/link';

import type { UniverseContent } from '@/domain/home/types';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface HomeUniverseSectionProps {
    content: UniverseContent;
    className?: string;
}

export function HomeUniverseSection({ content, className }: HomeUniverseSectionProps) {
    return (
        <section aria-label="Univers de l’artiste" className={cn('marketing-section marketing-bg-atelier py-20 sm:py-24 lg:py-32', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.075]">
                <div className="h-[120%] w-[120%] bg-[url('/images/patterns/spirale.png')] bg-center bg-no-repeat" style={{ backgroundSize: '600px' }} />
            </div>

            <Container className="relative z-10">
                <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
                    <div className="relative order-2 lg:order-1 lg:col-span-5">
                        <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none lg:-translate-y-6">
                            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/2 p-2">
                                <div className="group relative overflow-hidden rounded-3xl">
                                    <div className="relative aspect-4/5 overflow-hidden">
                                        <Image
                                            src={content.image.src}
                                            alt={content.image.alt}
                                            fill
                                            sizes={content.image.sizes}
                                            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                        />

                                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.02)_0%,rgba(4,10,18,0.5)_100%)]" />
                                    </div>
                                </div>
                            </div>

                            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(140deg,rgba(158,0,49,0.12),rgba(91,30,51,0.12),transparent)] blur-2xl" />
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 lg:col-span-7">
                        <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">{content.eyebrow}</p>

                        <Heading level={2} className="mt-4 text-white">
                            {content.title}
                        </Heading>

                        {content.paragraphs.map((paragraph, index) => (
                            <Text key={paragraph} variant="muted" className={cn('max-w-xl text-white/70', index === 0 ? 'mt-6' : 'mt-4')}>
                                {paragraph}
                            </Text>
                        ))}

                        <div className="mt-8">
                            <Link href={content.ctaHref} className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-300 hover:text-white">
                                {content.ctaLabel}
                                <span className="h-px w-6 bg-white/40 transition-all duration-300 hover:w-10" />
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
