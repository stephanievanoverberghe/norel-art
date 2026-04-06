import { getFeaturedArtworks } from '@/application/artworks';
import { ArtworkGrid } from '@/components/marketing/ArtworkGrid';
import { Hero } from '@/components/marketing/Hero';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Container } from '@/ui/Container';

export default function HomePage() {
    const featured = getFeaturedArtworks();

    return (
        <>
            <Hero />
            <PageIntro
                eyebrow="Exploration"
                title="Une sélection d’œuvres pour entrer dans l’univers Norel Art"
                description="Des originaux puissants et des impressions signées pour créer un dialogue visuel dans vos espaces de vie."
            />
            <ArtworkGrid artworks={featured} />
            <section className="py-16">
                <Container className="grid gap-5 rounded-3xl border border-white/10 bg-white/3 p-8 md:grid-cols-3">
                    <div>
                        <h2 className="text-xl font-semibold">Commandes sur mesure</h2>
                        <p className="mt-2 text-sm text-white/70">Transformer une histoire intime en œuvre originale.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Fresques murales</h2>
                        <p className="mt-2 text-sm text-white/70">Créer un geste artistique à l’échelle d’un lieu.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Impressions signées</h2>
                        <p className="mt-2 text-sm text-white/70">Accéder à l’univers visuel avec des formats plus accessibles.</p>
                    </div>
                </Container>
            </section>
        </>
    );
}
