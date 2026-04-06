import Link from 'next/link';
import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

export function Hero() {
    return (
        <section className="relative overflow-hidden py-20 sm:py-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(158,0,49,0.22),transparent_65%)]" />
            <Container className="relative space-y-8">
                <p className="text-xs uppercase tracking-[0.28em] text-white/60">Choc · Curiosité · Immersion</p>
                <Heading level={1} className="max-w-4xl text-5xl leading-tight sm:text-6xl lg:text-7xl">
                    Des œuvres qui captent le regard et transforment la pièce.
                </Heading>
                <Text className="max-w-2xl text-white/75">
                    Norel Art propose des originaux, des impressions signées et des créations sur mesure. Chaque pièce est pensée pour créer une présence sensible.
                </Text>
                <div className="flex flex-wrap gap-3">
                    <Link href="/oeuvres">
                        <Button className="rounded-full px-7">Explorer les œuvres</Button>
                    </Link>
                    <Link href="/commandes">
                        <Button variant="secondary" className="rounded-full px-7">
                            Commander une création
                        </Button>
                    </Link>
                    <Link href="/fresques">
                        <Button variant="ghost" className="rounded-full px-7">
                            Projet fresque
                        </Button>
                    </Link>
                </div>
            </Container>
        </section>
    );
}
