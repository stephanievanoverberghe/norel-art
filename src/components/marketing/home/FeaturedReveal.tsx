import Image from 'next/image';
import Link from 'next/link';

import type { Artwork } from '@/domain/artworks/types';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface FeaturedRevealProps {
    artworks: Artwork[];
}

const availabilityLabel: Record<Artwork['availability'], string> = {
    available: 'Disponible',
    reserved: 'Réservée',
    sold: 'Vendue',
};

export function FeaturedReveal({ artworks }: FeaturedRevealProps) {
    return (
        <section id="selection-oeuvres" aria-label="Première révélation des œuvres" className="relative -mt-20 pb-20">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-[linear-gradient(180deg,rgba(6,12,21,0)_0%,rgba(6,12,21,0.9)_72%,#060C15_100%)]" />

            <Container className="relative z-10">
                <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(155deg,rgba(14,24,35,0.88)_2%,rgba(9,15,25,0.95)_100%)] p-6 shadow-[0_26px_56px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-9 lg:p-12">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.3em] text-white/52">Première révélation</p>
                            <Heading level={2} className="mt-4 text-white">
                                Le rideau s&apos;ouvre sur les premières présences.
                            </Heading>
                            <Text variant="muted" className="mt-5 max-w-md text-white/72 sm:text-base">
                                Originaux puissants et impressions signées, choisis pour commencer l&apos;exploration sans rompre la tension du seuil.
                            </Text>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Link href="/oeuvres" className="inline-flex">
                                    <Button className="min-h-12 w-full rounded-full px-7 sm:w-auto">Explorer toutes les œuvres</Button>
                                </Link>
                                <Link
                                    href="/commandes"
                                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/10"
                                >
                                    Commander une pièce
                                </Link>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {artworks.map((artwork, index) => (
                                <article
                                    key={artwork.id}
                                    className={[
                                        'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:border-white/25',
                                        index === 0 ? 'sm:col-span-2' : '',
                                    ].join(' ')}
                                >
                                    <div className={index === 0 ? 'relative h-64 sm:h-72' : 'relative h-56'}>
                                        <Image
                                            src={artwork.image}
                                            alt={artwork.title}
                                            fill
                                            className="object-cover transition duration-500 group-hover:scale-[1.03]"
                                            sizes="(max-width: 640px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.14)_0%,rgba(4,10,18,0.86)_92%)]" />
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 p-5">
                                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/65">{artwork.collection}</p>
                                        <h3 className="mt-2 text-xl text-white">{artwork.title}</h3>
                                        <div className="mt-3 flex items-center justify-between text-xs text-white/70">
                                            <span>{artwork.priceEur.toLocaleString('fr-FR')} €</span>
                                            <span>{availabilityLabel[artwork.availability]}</span>
                                        </div>
                                    </div>
                                    <Link href={`/oeuvres/${artwork.slug}`} className="absolute inset-0" aria-label={`Voir le détail de ${artwork.title}`} />
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
