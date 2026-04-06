import { getHomeRevealArtworks } from '@/application/artworks';
import { FeaturedReveal } from '@/components/marketing/home/FeaturedReveal';
import { Hero } from '@/components/marketing/home/Hero';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Container } from '@/ui/Container';

export default function HomePage() {
    const revealArtworks = getHomeRevealArtworks();

    return (
        <>
            <Hero />
            <FeaturedReveal artworks={revealArtworks} />
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
