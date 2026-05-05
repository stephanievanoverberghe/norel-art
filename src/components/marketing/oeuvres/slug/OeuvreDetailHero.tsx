import { ArrowLeft, CheckCircle2, PackageCheck, ShieldCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { FavoriteToggle } from '@/components/favorites/FavoriteToggle';
import { MarketingSecondaryLink } from '@/components/marketing/shared/MarketingSecondaryLink';
import { formatArtworkPrice, getAvailabilityLabel, getArtworkTypeLabel } from '@/domain/artworks/presentation';
import type { Artwork } from '@/domain/artworks/types';
import { marketingPageSpacing } from '@/layout/marketing/page-spacing';
import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface OeuvreDetailHeroProps {
    artwork: Artwork;
    isFavorite?: boolean;
    className?: string;
}

const availabilityTone: Record<Artwork['availability'], string> = {
    available: 'border-emerald-200/20 bg-emerald-300/12 text-emerald-50',
    reserved: 'border-(--premium)/24 bg-(--premium)/12 text-white',
    sold: 'border-white/10 bg-black/42 text-white/58',
};

const reassurance = [
    { label: 'Paiement sécurisé', icon: ShieldCheck },
    { label: 'Suivi dans le compte', icon: PackageCheck },
    { label: 'Pièce signée', icon: CheckCircle2 },
] as const;

export function OeuvreDetailHero({ artwork, isFavorite = false, className }: OeuvreDetailHeroProps) {
    const isAvailable = artwork.availability === 'available';

    return (
        <section
            aria-label={`Présentation de l’œuvre ${artwork.title}`}
            className={cn(`relative overflow-hidden bg-(--bg-deep) pb-12 sm:pb-14 lg:pb-18 ${marketingPageSpacing.immersiveOffset}`, className)}
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(5,10,18,0.82)_0%,rgba(5,10,18,0)_100%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(70%_90%_at_50%_100%,rgba(158,0,49,0.12),transparent_72%)]" />

            <Container className="relative z-10">
                <Link href="/oeuvres" className="mb-7 inline-flex items-center gap-2 text-sm text-white/62 transition hover:text-white">
                    <ArrowLeft size={16} />
                    Retour à la galerie
                </Link>

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(23rem,0.7fr)] lg:items-start lg:gap-10 xl:gap-14">
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-md border border-white/10 bg-white/[0.035] p-2 sm:p-3">
                            <div className="relative aspect-4/5 overflow-hidden rounded-[0.45rem] sm:aspect-[5/6]">
                                <Image src={artwork.image} alt={artwork.title} fill priority sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover object-center" />
                                {artwork.availability === 'sold' ? <div className="absolute inset-0 bg-black/18 grayscale-[0.16]" /> : null}
                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_68%,rgba(0,0,0,0.32)_100%)]" />
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            {reassurance.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div key={item.label} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/62">
                                        <Icon size={16} className="text-(--premium)" />
                                        {item.label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <aside className="lg:sticky lg:top-32">
                        <div className="rounded-md border border-white/10 bg-[#08131f]/84 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className={cn('rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.12em]', availabilityTone[artwork.availability])}>
                                    {getAvailabilityLabel(artwork.availability)}
                                </span>
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-white/54">
                                    {getArtworkTypeLabel(artwork.type)}
                                </span>
                            </div>

                            <div className="mt-5 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/42">
                                <span>{artwork.collection}</span>
                                <span className="h-1 w-1 rounded-full bg-white/24" />
                                <span>{artwork.category}</span>
                            </div>

                            <Heading level={1} className="mt-4 text-white sm:text-5xl lg:text-[3.25rem]">
                                {artwork.title}
                            </Heading>

                            <Text variant="muted" className="mt-4 text-white/72">
                                {artwork.excerpt}
                            </Text>

                            <div className="mt-6 border-y border-white/10 py-5">
                                <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">Prix</p>
                                <p className="mt-2 text-3xl font-semibold text-white">{formatArtworkPrice(artwork.priceEur)}</p>
                                <p className="mt-2 text-sm text-white/48">{artwork.dimensions} - {artwork.technique}</p>
                            </div>

                            <div className="mt-5 grid gap-3">
                                {isAvailable && artwork.purchasableVariant ? (
                                    <AddToCartButton variantId={artwork.purchasableVariant.id} />
                                ) : (
                                    <MarketingSecondaryLink href="/contact" className="w-full">
                                        Ce regard m&apos;appelle
                                    </MarketingSecondaryLink>
                                )}

                                <FavoriteToggle artworkId={artwork.id} initialIsFavorite={isFavorite} className="w-full" />

                                <MarketingSecondaryLink href="/commandes" className="w-full">
                                    Commander une pièce proche
                                </MarketingSecondaryLink>
                            </div>

                            <div className="mt-6 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/36">Support</p>
                                    <p className="mt-2 text-sm text-white/78">{artwork.support}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/36">Dimensions</p>
                                    <p className="mt-2 text-sm text-white/78">{artwork.dimensions}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/36">Technique</p>
                                    <p className="mt-2 text-sm text-white/78">{artwork.technique}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/36">Collection</p>
                                    <p className="mt-2 text-sm text-white/78">{artwork.collection}</p>
                                </div>
                            </div>

                            {artwork.videos?.length ? (
                                <div className="mt-5 flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/62">
                                    <Sparkles size={16} className="text-(--premium)" />
                                    Vidéo disponible plus bas dans la fiche.
                                </div>
                            ) : null}
                        </div>
                    </aside>
                </div>
            </Container>
        </section>
    );
}
