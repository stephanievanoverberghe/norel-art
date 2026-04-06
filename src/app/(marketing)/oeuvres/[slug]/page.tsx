import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArtworkBySlug, getRelatedArtworks } from '@/application/artworks';
import { RelatedArtworks } from '@/components/marketing/RelatedArtworks';
import { Container } from '@/ui/Container';

interface ArtworkDetailPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArtworkDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const artwork = getArtworkBySlug(slug);

    if (!artwork) {
        return { title: 'Œuvre introuvable' };
    }

    return {
        title: artwork.title,
        description: artwork.excerpt,
    };
}

export default async function ArtworkDetailPage({ params }: ArtworkDetailPageProps) {
    const { slug } = await params;
    const artwork = getArtworkBySlug(slug);

    if (!artwork) {
        notFound();
    }

    const related = getRelatedArtworks(artwork, 3);

    return (
        <>
            <section className="py-10">
                <Container className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="h-[480px] rounded-3xl bg-[linear-gradient(140deg,var(--surface),var(--bg-primary))]" aria-hidden="true" />
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/55">{artwork.collection}</p>
                        <h1 className="mt-3 text-4xl text-white">{artwork.title}</h1>
                        <p className="mt-4 text-white/75">{artwork.story}</p>
                        <dl className="mt-6 space-y-2 text-sm text-white/70">
                            <div className="flex justify-between gap-2">
                                <dt>Technique</dt>
                                <dd>{artwork.technique}</dd>
                            </div>
                            <div className="flex justify-between gap-2">
                                <dt>Support</dt>
                                <dd>{artwork.support}</dd>
                            </div>
                            <div className="flex justify-between gap-2">
                                <dt>Dimensions</dt>
                                <dd>{artwork.dimensions}</dd>
                            </div>
                            <div className="flex justify-between gap-2">
                                <dt>Prix</dt>
                                <dd>{artwork.priceEur.toLocaleString('fr-FR')} €</dd>
                            </div>
                            <div className="flex justify-between gap-2">
                                <dt>Disponibilité</dt>
                                <dd>{artwork.availability}</dd>
                            </div>
                        </dl>
                        <a href="/contact" className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white">
                            Je souhaite cette œuvre
                        </a>
                    </div>
                </Container>
            </section>
            <RelatedArtworks artworks={related} />
        </>
    );
}
