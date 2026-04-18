import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import type { UniverseContent } from '@/domain/home/types';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface UniverseSectionProps {
    content: UniverseContent;
    className?: string;
}

export function UniverseSection({ content, className }: UniverseSectionProps) {
    return (
        <section aria-label="Univers de l’artiste" className={cn('relative overflow-hidden bg-(--bg-primary) py-20 sm:py-24 lg:py-32', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-20 h-40 w-160 -translate-x-1/2 bg-(--accent)/10 blur-3xl" />

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

                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                </div>
                            </div>

                            <div className="pointer-events-none absolute inset-0 -z-10 blur-2xl">
                                <div className="h-full w-full bg-(--accent)/10" />
                            </div>
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
