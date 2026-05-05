'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import { SnakeBorder } from '@/components/shared/SnakeBorder';
import type { Artwork } from '@/domain/artworks/types';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface OeuvreGallerySectionProps {
    artwork: Artwork;
    className?: string;
}

interface OeuvreLightboxProps {
    activeIndex: number;
    images: string[];
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    title: string;
}

function OeuvreLightbox({ activeIndex, images, isOpen, onClose, onNext, onPrev, title }: OeuvreLightboxProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 bg-[rgba(3,8,16,0.94)] backdrop-blur-md" role="dialog" aria-modal="true" aria-label={`Agrandissement de ${title}`}>
            <div className="absolute right-4 top-4 z-10">
                <button type="button" onClick={onClose} className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition-colors duration-300 hover:bg-white/12" aria-label="Fermer">
                    <X size={18} />
                </button>
            </div>

            <div className="flex min-h-screen items-center justify-center px-4 py-16 sm:px-6">
                <div className="relative w-full max-w-6xl">
                    <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-white/10 bg-white/3 sm:aspect-16/10">
                        <Image src={images[activeIndex]} alt={`${title} vue ${activeIndex + 1}`} fill sizes="100vw" className="object-contain" />
                    </div>

                    {images.length > 1 ? (
                        <>
                            <button
                                type="button"
                                onClick={onPrev}
                                className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[rgba(6,12,21,0.7)] text-white transition-colors duration-300 hover:bg-[rgba(6,12,21,0.9)]"
                                aria-label="Image precedente"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <button
                                type="button"
                                onClick={onNext}
                                className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-[rgba(6,12,21,0.7)] text-white transition-colors duration-300 hover:bg-[rgba(6,12,21,0.9)]"
                                aria-label="Image suivante"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </>
                    ) : null}

                    <div className="mt-4 text-center text-sm text-white/60">
                        {activeIndex + 1} / {images.length}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function OeuvreGallerySection({ artwork, className }: OeuvreGallerySectionProps) {
    const images = useMemo(() => {
        const extra = artwork.gallery ?? [];
        return [artwork.image, ...extra].filter((value, index, array) => array.indexOf(value) === index);
    }, [artwork]);
    const videos = artwork.videos ?? [];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    if (images.length <= 1 && videos.length === 0) return null;

    const openLightbox = (index: number) => {
        setActiveIndex(index);
        setIsLightboxOpen(true);
    };

    const goPrev = () => {
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goNext = () => {
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <section aria-label={`Autres vues de ${artwork.title}`} className={cn('marketing-section marketing-bg-gallery py-16 sm:py-20 lg:py-24', className)}>
                <Container>
                    <div className="mb-10 max-w-2xl">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">S&apos;approcher</p>

                        <Heading level={2} className="mt-4 text-white">
                            Details, matiere, autres presences.
                        </Heading>

                        <Text variant="muted" className="mt-4 text-white/70">
                            Quelques vues et contenus atelier pour approcher le geste de plus pres.
                        </Text>
                    </div>

                    {images.length > 1 ? (
                        <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
                            {images.map((image, index) => (
                                <button
                                    key={`${image}-${index}`}
                                    type="button"
                                    onClick={() => openLightbox(index)}
                                    className="group relative cursor-pointer overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/3 text-left"
                                    aria-label={`Ouvrir la vue ${index + 1} de ${artwork.title}`}
                                >
                                    <div className="relative aspect-4/5 overflow-hidden">
                                        <SnakeBorder />
                                        <Image src={image} alt={`${artwork.title} vue ${index + 1}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_55%,rgba(0,0,0,0.32)_100%)]" />
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0 p-4">
                                        <span className="text-sm text-white/82">Vue {index + 1}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : null}

                    {videos.length > 0 ? (
                        <div className="mt-6 grid gap-4 lg:grid-cols-2">
                            {videos.map((video) => (
                                <article key={video.id} className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/3">
                                    <div className="relative aspect-video">
                                        <iframe
                                            src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                                            title={video.title}
                                            className="absolute inset-0 h-full w-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    </div>
                                    <div className="px-4 py-4">
                                        <p className="text-sm text-white/72">{video.title}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : null}
                </Container>
            </section>

            <OeuvreLightbox images={images} title={artwork.title} activeIndex={activeIndex} isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} onPrev={goPrev} onNext={goNext} />
        </>
    );
}
