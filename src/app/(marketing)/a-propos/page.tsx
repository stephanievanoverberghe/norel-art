import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro } from '@/components/marketing/PageIntro';
import { Container } from '@/ui/Container';

export const metadata: Metadata = {
    title: 'À propos',
    description: 'Le parcours et la démarche artistique de Norel Art.',
};

export default function AProposPage() {
    return (
        <>
            <PageIntro
                eyebrow="Immersion"
                title="Une pratique née du regard et du vivant"
                description="Après un parcours personnel marqué par la photographie et le dessin, la peinture est devenue un espace de présence, d’écoute et de transformation."
            />
            <section className="pb-16">
                <Container className="space-y-6 text-white/75">
                    <p>Chaque œuvre commence par une sensation précise : une tension, une douceur, un silence. Le geste cherche moins la démonstration que la résonance.</p>
                    <p>
                        Le travail mêle matières brutes, contrastes profonds et zones de respiration. L’objectif est de proposer des pièces qui habitent un espace et accompagnent
                        les personnes.
                    </p>
                    <Link href="/contact" className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white">
                        Discuter d’un projet
                    </Link>
                </Container>
            </section>
        </>
    );
}
