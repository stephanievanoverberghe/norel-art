import Image from 'next/image';
import Link from 'next/link';

import { footerNavigationGroups, legalLinks } from '@/content/site/navigation';
import { socialLinks } from '@/content/site/social-links';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';
import { FooterNavGroup } from './footer/FooterNavGroup';
import { SocialLinks } from './footer/SocialLinks';

export function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-(--bg-primary)">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-40 w-md -translate-x-1/2 bg-(--accent)/10 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-(--surface)/20 blur-3xl" />

            <Container className="relative py-16 sm:py-20 lg:py-24">
                <div className="grid gap-14 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
                    <div className="max-w-2xl">
                        <Link href="/" aria-label="Norel Art - Retour à l’accueil" className="inline-flex items-center">
                            <Image src="/images/logo/logo-white.png" alt="Logo Norel Art" width={170} height={64} className="h-auto w-32 sm:w-37" />
                        </Link>

                        <div className="mt-8 space-y-5">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">L’art du regard, le trait de l’âme</p>

                            <Heading level={3} className="max-w-xl text-white">
                                Des regards à accueillir. Des traces à choisir. Des présences à faire entrer chez soi.
                            </Heading>

                            <Text variant="muted" className="max-w-xl text-white/68">
                                Originaux, impressions limitées, commandes sur mesure, fresques murales. Chaque pièce prolonge un geste, une tension, une présence.
                            </Text>
                        </div>
                    </div>

                    <div className="rounded-4xl border border-white/10 bg-white/3 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-8">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">Une envie, une commande, un mur</p>

                        <Heading level={3} className="mt-4 text-white">
                            Entrer en lien avec l&apos;artiste
                        </Heading>

                        <Text variant="muted" className="mt-4 text-white/68">
                            Tu veux accueillir une œuvre, confier un visage, parler d’une fresque ou poser une question&nbsp;? Le plus simple est d’ouvrir l’échange.
                        </Text>

                        <div className="mt-8 flex flex-col md:flex-row lg:flex-col gap-3 xl:flex-row">
                            <Link
                                href="/contact"
                                className="inline-flex min-h-12 items-center justify-center rounded-full bg-(--accent) px-6 text-sm font-medium text-white transition-all duration-300 hover:opacity-90 hover:scale-[0.98]"
                            >
                                Me contacter
                            </Link>

                            <Link
                                href="/oeuvres"
                                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/3 px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-white/6 hover:scale-[0.98]"
                            >
                                Voir les œuvres
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-4">
                    {footerNavigationGroups.map((group) => (
                        <FooterNavGroup key={group.title} title={group.title} links={group.links} />
                    ))}

                    <div>
                        <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-white/50">Présence</p>

                        <div className="space-y-3">
                            <Text variant="small" className="text-white/68">
                                France
                            </Text>
                            <Text variant="small" className="text-white/68">
                                Œuvres originales, impressions signées, commandes personnalisées
                            </Text>
                            <Text variant="small" className="text-white/68">
                                Réponse via formulaire de contact
                            </Text>
                        </div>
                    </div>

                    <div>
                        <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-white/50">Suivre le regard</p>

                        <SocialLinks links={socialLinks} />

                        <Text variant="small" className="mt-4 max-w-xs text-white/55">
                            Facebook, Instagram et TikTok pour prolonger l’univers, découvrir les nouvelles traces et suivre les coulisses.
                        </Text>
                    </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Norel Art. Tous droits réservés.</p>

                    <div className="flex flex-wrap items-center gap-4">
                        {legalLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="transition-colors duration-300 hover:text-white">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    );
}
