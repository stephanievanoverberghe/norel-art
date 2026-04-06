import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';
import { cn } from '@/lib/utils/cn';

const footerNavigation = [
    { label: 'Œuvres', href: '/oeuvres' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Commandes', href: '/commandes' },
    { label: 'Fresques', href: '/fresques' },
    { label: 'Contact', href: '/contact' },
];

const footerShopLinks = [
    { label: 'Originaux', href: '/oeuvres?type=originaux' },
    { label: 'Impressions', href: '/oeuvres?type=impressions' },
    { label: 'Commandes sur mesure', href: '/commandes' },
    { label: 'Fresques murales', href: '/fresques' },
];

const socialLinks = [
    {
        label: 'Facebook',
        href: 'https://facebook.com/',
        icon: Facebook,
    },
    {
        label: 'Instagram',
        href: 'https://instagram.com/',
        icon: Instagram,
    },
    {
        label: 'TikTok',
        href: 'https://tiktok.com/',
        icon: TikTokIcon,
    },
];

interface SocialLinkProps {
    href: string;
    label: string;
    children: React.ReactNode;
}

function SocialLink({ href, label, children }: SocialLinkProps) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/70 transition-all duration-300',
                'hover:border-white/20 hover:bg-white/[0.06] hover:text-white',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
            )}
        >
            {children}
        </Link>
    );
}

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cn('h-[18px] w-[18px] fill-current', className)}>
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.717h-3.004v12.467a2.896 2.896 0 1 1-2.896-2.896c.298 0 .586.045.857.127V8.61a5.9 5.9 0 0 0-.857-.063A5.9 5.9 0 1 0 15.82 14.45V8.126a7.768 7.768 0 0 0 4.53 1.454V6.686h-.761Z" />
        </svg>
    );
}

export function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-[var(--bg-primary)]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-40 w-[28rem] -translate-x-1/2 bg-[var(--accent)]/10 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[var(--surface)]/20 blur-3xl" />

            <Container className="relative py-16 sm:py-20 lg:py-24">
                <div className="grid gap-14 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
                    <div className="max-w-2xl">
                        <Link href="/" aria-label="Norel Art - Retour à l’accueil" className="inline-flex items-center">
                            <Image src="/images/logo/logo-white.png" alt="Logo Norel Art" width={170} height={64} className="h-auto w-[128px] sm:w-[148px]" />
                        </Link>

                        <div className="mt-8 space-y-5">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">L’art du regard, le trait de l’âme</p>

                            <Heading level={3} className="max-w-xl text-white">
                                Des regards à accueillir. Des traces à choisir. Des présences à faire entrer chez soi.
                            </Heading>

                            <Text variant="muted" className="max-w-xl text-white/68">
                                Originaux, impressions limitées, commandes sur mesure, fresques murales. Chaque pièce prolonge un geste, une tension, une présence.
                            </Text>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-8">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Une envie, une commande, un mur</p>

                        <Heading level={3} className="mt-4 text-white">
                            Entrer en lien avec l’artiste
                        </Heading>

                        <Text variant="muted" className="mt-4 text-white/68">
                            Tu veux accueillir une œuvre, confier un visage, parler d’une fresque ou poser une question&nbsp;? Le plus simple est d’ouvrir l’échange.
                        </Text>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/contact"
                                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
                            >
                                Me contacter
                            </Link>

                            <Link
                                href="/oeuvres"
                                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 text-sm font-medium text-white transition-all duration-300 hover:bg-white/[0.06]"
                            >
                                Voir les œuvres
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-white/35">Explorer</p>

                        <ul className="space-y-3">
                            {footerNavigation.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-sm text-white/70 transition-colors duration-300 hover:text-white">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-white/35">Collection</p>

                        <ul className="space-y-3">
                            {footerShopLinks.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-sm text-white/70 transition-colors duration-300 hover:text-white">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-white/35">Présence</p>

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
                        <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-white/35">Suivre le regard</p>

                        <div className="flex items-center gap-3">
                            {socialLinks.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <SocialLink key={item.label} href={item.href} label={item.label}>
                                        <Icon className="h-[18px] w-[18px]" />
                                    </SocialLink>
                                );
                            })}
                        </div>

                        <Text variant="small" className="mt-4 max-w-xs text-white/55">
                            Facebook, Instagram et TikTok pour prolonger l’univers, découvrir les nouvelles traces et suivre les coulisses.
                        </Text>
                    </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Norel Art. Tous droits réservés.</p>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link href="/mentions-legales" className="transition-colors duration-300 hover:text-white">
                            Mentions légales
                        </Link>
                        <Link href="/politique-de-confidentialite" className="transition-colors duration-300 hover:text-white">
                            Confidentialité
                        </Link>
                        <Link href="/contact" className="transition-colors duration-300 hover:text-white">
                            Contact
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
