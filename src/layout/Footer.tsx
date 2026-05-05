import { CreditCard, Heart, PackageCheck, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { footerNavigationGroups, legalLinks } from '@/content/site/navigation';
import { socialLinks } from '@/content/site/social-links';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

import { FooterNavGroup } from './footer/FooterNavGroup';
import { SocialLinks } from './footer/SocialLinks';

const reassuranceItems = [
    { label: 'Paiement securise', icon: CreditCard },
    { label: 'Pieces signees', icon: ShieldCheck },
    { label: 'Suivi de commande', icon: PackageCheck },
    { label: 'Favoris conserves', icon: Heart },
] as const;

export function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-(--bg-deep)">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(70%_90%_at_50%_0%,rgba(158,0,49,0.16),transparent_68%)]" />

            <Container className="relative py-14 sm:py-18 lg:py-20">
                <section className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)] lg:gap-14">
                    <div>
                        <Link href="/" aria-label="Norel Art - Retour a l'accueil" className="inline-flex items-center">
                            <Image src="/images/logo/logo-white.png" alt="Logo Norel Art" width={170} height={64} className="h-auto w-32 sm:w-37" />
                        </Link>

                        <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-white/48">L&apos;art du regard, le trait de l&apos;ame</p>
                        <Heading level={3} className="mt-4 max-w-xl text-white">
                            Une galerie a explorer, une boutique pour choisir, un espace pour revenir.
                        </Heading>
                        <Text variant="muted" className="mt-4 max-w-2xl text-white/66">
                            Originaux, impressions limitees, commandes sur mesure et fresques. Chaque achat reste relie a votre compte, vos favoris et vos pieces de collection.
                        </Text>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {reassuranceItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div key={item.label} className="rounded-md border border-white/10 bg-white/4 px-4 py-4">
                                    <Icon size={18} className="text-(--premium)" />
                                    <p className="mt-3 text-sm font-medium text-white/78">{item.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
                    {footerNavigationGroups.map((group) => (
                        <FooterNavGroup key={group.title} title={group.title} links={group.links} />
                    ))}

                    <div>
                        <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-white/50">Boutique</p>
                        <div className="space-y-3">
                            <Text variant="small" className="text-white/68">
                                Originaux et impressions signees.
                            </Text>
                            <Text variant="small" className="text-white/68">
                                Paiement Stripe, commandes retrouvees dans l&apos;espace client.
                            </Text>
                            <Text variant="small" className="text-white/68">
                                Demandes personnalisees et projets muraux via formulaire.
                            </Text>
                        </div>
                    </div>

                    <div>
                        <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-white/50">Suivre</p>
                        <SocialLinks links={socialLinks} />
                        <Text variant="small" className="mt-4 max-w-xs text-white/55">
                            Instagram, Facebook et TikTok pour les nouvelles pieces, les coulisses et les gestes d&apos;atelier.
                        </Text>
                    </div>
                </section>

                <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Norel Art. Tous droits reserves.</p>

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
