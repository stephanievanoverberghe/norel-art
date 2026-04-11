import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface CustomPathsSectionProps {
    className?: string;
}

const customPaths = [
    {
        title: 'Me confier un visage',
        eyebrow: 'Commande sur mesure',
        description: 'Un portrait, une présence, une histoire à faire émerger autrement.',
        href: '/commandes',
        image: '/images/home/commande.jpg',
        alt: 'Œuvre portrait sur mesure de Norel Art',
    },
    {
        title: 'Lui donner un mur',
        eyebrow: 'Fresques murales',
        description: 'Faire entrer le geste dans l’espace. Laisser une émotion prendre place à grande échelle.',
        href: '/fresques',
        image: '/images/home/fresque.jpg',
        alt: 'Fresque murale réalisée par Norel Art',
    },
];

function SnakeBorder() {
    return (
        <span className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="absolute left-0 top-0 h-px w-0 bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.45)] transition-all duration-500 group-hover:w-full" />
            <span className="absolute right-0 top-0 h-0 w-px bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.45)] transition-all delay-100 duration-500 group-hover:h-full" />
            <span className="absolute bottom-0 right-0 h-px w-0 bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.45)] transition-all delay-200 duration-500 group-hover:w-full" />
            <span className="absolute bottom-0 left-0 h-0 w-px bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.45)] transition-all delay-300 duration-500 group-hover:h-full" />
        </span>
    );
}

export function CustomPathsSection({ className }: CustomPathsSectionProps) {
    return (
        <section aria-label="Commandes et fresques" className={cn('relative overflow-hidden bg-(--bg-primary) py-20 sm:py-24 lg:py-28', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(6,12,21,0.72)_0%,rgba(6,12,21,0)_100%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-16 h-28 w-lg -translate-x-1/2 bg-(--accent)/8 blur-3xl" />

            <Container className="relative z-10">
                {/* HEADER */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">Prolonger le geste</p>

                    <Heading level={2} className="mt-4 text-white">
                        Deux chemins. Deux façons
                        <br />
                        d’ouvrir l’échange.
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-5 max-w-xl text-white/70">
                        Certaines présences se choisissent. D’autres se confient. D’autres encore prennent place directement dans l’espace.
                    </Text>
                </div>

                {/* CARDS */}
                <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:mt-16 lg:grid-cols-2">
                    {customPaths.map((path) => (
                        <article key={path.href} className="group relative">
                            <Link href={path.href} className="relative block overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/3">
                                <SnakeBorder />

                                {/* 🔥 IMAGE PLUS PETITE / PLUS DESIGN */}
                                <div className="relative aspect-4/3 overflow-hidden sm:aspect-16/10 lg:aspect-3/2">
                                    <Image
                                        src={path.image}
                                        alt={path.alt}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                    />

                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.05)_0%,rgba(4,10,18,0.25)_45%,rgba(4,10,18,0.9)_100%)]" />
                                </div>

                                {/* TEXTE */}
                                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/55">{path.eyebrow}</p>

                                    <Heading level={3} className="mt-2 max-w-md text-white sm:text-2xl">
                                        {path.title}
                                    </Heading>

                                    <Text variant="muted" className="mt-2 max-w-md text-sm text-white/72">
                                        {path.description}
                                    </Text>

                                    <div className="mt-4 inline-flex items-center gap-3 text-sm text-white/82">
                                        <span>Entrer</span>
                                        <span className="h-px w-6 bg-white/35 transition-all duration-300 group-hover:w-10 group-hover:bg-white/65" />
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}
